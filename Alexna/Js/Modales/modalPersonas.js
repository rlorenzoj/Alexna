const modalPersonas = (function () {
    let AceptarCallback = undefined;
    const Original = {
        Id: undefined,
        DNI: undefined,
        Foto: undefined,
        Nombre: undefined,
        Apellido1: undefined,
        Apellido2: undefined,
        Alias: undefined,
        Sexo: undefined,
        FechaNacimiento: undefined,
        FechaMuerte: undefined,
        Observaciones: undefined
    }

    function EstablecerAceptar(callback) {
        if (typeof callback === 'undefined') {
            AceptarCallback = undefined;
        } else if (typeof callback === 'function') {
            AceptarCallback = callback;
        } else {
            AceptarCallback = Function(callback);
        }
    }

    function Mostrar(id, callbakOK, callbackKO) {
        $.when(pCargarRegistro(id)).done(function () {
            // Establecemos los eventos
            $('#modalPersonas_Aceptar').off();
            $('#modalPersonas_Aceptar').on('click', function (e) {
                const id = $('#modalPersonas_id').val();
                const dni = $('#modalPersonas_dni').val();
                let foto = $('#modalPersonas_foto').prop("files")[0];
                const nombre = $('#modalPersonas_nombre').val();
                const apellido1 = $('#modalPersonas_apellido1').val();
                const apellido2 = $('#modalPersonas_apellido2').val();
                const alias = $('#modalPersonas_alias').val();
                const sexo = $('#modalPersonas_sexo').val();
                const fechaNacimiento = $("#modalPersonas_fechaNacimiento").datepicker('getDate');
                const fechaMuerte = $("#modalPersonas_fechaMuerte").datepicker('getDate');
                const observaciones = $('#modalPersonas_observaciones').html();

                if (!nombre) {
                    Dolf.Ventana.WarningModal('Personas', 'Por favor, introduzca el nombre.');
                } else if (!apellido1) {
                    Dolf.Ventana.WarningModal('Personas', 'Por favor, introduzca el primer apellido.');
                } else if (!sexo) {
                    Dolf.Ventana.WarningModal('Personas', 'Por favor, introduzca el sexo.');
                } else {
                    const callback = function () {
                        if (!Original.Id) {
                            // Es un nuevo registro.
                            pNuevoRegistro(id, dni, foto, nombre, apellido1, apellido2, alias, sexo, fechaNacimiento, fechaMuerte, observaciones);
                        } else {
                            // Es una modificación.
                            pEditarRegistro(id, dni, foto, nombre, apellido1, apellido2, alias, sexo, fechaNacimiento, fechaMuerte, observaciones);
                        }
                    }
                    const $fotoCheck = $('#modalPersonas_mantenerFoto');
                    let mantener = false;
                    if ($fotoCheck.is(":visible")) {
                        mantener = $fotoCheck[0].checked;
                    }
                    if (mantener) {
                        foto = 'mantener';
                        callback();
                    } else {
                        if (foto) {
                            // Si han seleccionado una foto, la pasamos a base64.
                            Dolf.Carga.DameBase64(foto).done(function (datos) {
                                foto = datos;
                            }).fail(function (error) {
                                foto = null;
                            }).always(function () {
                                callback();
                            });
                        } else {
                            callback();
                        }
                    }
                }
            });

            if (typeof callbakOK === 'function') {
                callbakOK();
            }
            $('#modalPersonas').modal('show');
        }).fail(function () {
            if (typeof callbackKO === 'function') {
                callbackKO();
            }
        });
    }

    function pCargarRegistro(id) {
        Original.Id = undefined;
        Original.DNI = undefined;
        Original.Foto = undefined;
        Original.Nombre = undefined;
        Original.Apellido1 = undefined;
        Original.Apellido2 = undefined;
        Original.Alias = undefined;
        Original.Sexo = undefined;
        Original.FechaNacimiento = undefined;
        Original.FechaMuerte = undefined;
        Original.Observaciones = undefined;

        $('#modalPersonas_id').val('');
        $('#modalPersonas_dni').val('');
        $('#modalPersonas_foto').val('');
        $('#modalPersonas_nombre').val('');
        $('#modalPersonas_apellido1').val('');
        $('#modalPersonas_apellido2').val('');
        $('#modalPersonas_alias').val('');
        $('#modalPersonas_sexo').val('');
        $("#modalPersonas_fechaNacimiento").datepicker({
            dateFormat: "dd-mm-yy"
        });
        $("#modalPersonas_fechaNacimiento").val('');
        $("#modalPersonas_fechaMuerte").datepicker({
            dateFormat: "dd-mm-yy"
        });
        $("#modalPersonas_fechaMuerte").val('');
        $("#modalPersonas_observaciones").html('');

        $('#modalPersonas_mantenerFotoGrupo').hide();

        if (typeof id !== 'undefined') {
            const url = '/Services/SvcPersonas.svc/ObtenerPersona';
            const type = 'POST';
            const params = {
                id: id
            };
            const async = true;
            const ok = function (datos, textStatus, jqXHR) {
                if (datos) {
                    $('#modalPersonas_id').val(datos.Persona_Id);
                    $('#modalPersonas_dni').val(datos.Persona_Identificacion_Legal);
                    $('#modalPersonas_foto').val('');
                    $('#modalPersonas_nombre').val(datos.Persona_Nombre);
                    $('#modalPersonas_apellido1').val(datos.Persona_Apellido_1);
                    $('#modalPersonas_apellido2').val(datos.Persona_Apellido_2);
                    $('#modalPersonas_alias').val(datos.Persona_Alias);
                    $('#modalPersonas_sexo').val(datos.Persona_Sexo);
                    if (datos.Persona_Fecha_Nacimiento) {
                        $("#modalPersonas_fechaNacimiento").datepicker('setDate', datos.Persona_Fecha_Nacimiento.JsonToDate());
                    }
                    if (datos.Persona_Fecha_Muerte) {
                        $("#modalPersonas_fechaMuerte").datepicker('setDate', datos.Persona_Fecha_Muerte.JsonToDate());
                    }
                    $("#modalPersonas_observaciones").html(datos.Persona_Observaciones);

                    if (datos.Persona_Foto) {
                        $('#modalPersonas_mantenerFotoGrupo').show();
                        const $fotoCheck = $('#modalPersonas_mantenerFoto');
                        if ($fotoCheck && $fotoCheck.length > 0) {
                            $fotoCheck[0].checked = true;
                        }
                    }

                    Original.Id = datos.Persona_Id;
                    Original.DNI = datos.Persona_Identificacion_Legal;
                    Original.Foto = datos.Persona_Foto;
                    Original.Nombre = datos.Persona_Nombre;
                    Original.Apellido1 = datos.Persona_Apellido_1;
                    Original.Apellido2 = datos.Persona_Apellido_2;
                    Original.Alias = datos.Persona_Alias;
                    Original.Sexo = datos.Persona_Sexo;
                    Original.FechaNacimiento = datos.Persona_Fecha_Nacimiento ? datos.Persona_Fecha_Nacimiento.JsonToDate() : undefined;
                    Original.FechaMuerte = datos.Persona_Fecha_Muerte ? datos.Persona_Fecha_Muerte.JsonToDate() : undefined;
                    Original.Observaciones = datos.Persona_Observaciones;
                }
            }
            const ko = function (jqXHR, textStatus, errorThrown) {
                Dolf.Ventana.WarningModal('Personas', jqXHR.responseJSON.Message);
            }

            Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
        } else {
            return;
        }
    }

    function pEditarRegistro(id, dni, foto, nombre, apellido1, apellido2, alias, sexo, fechaNacimiento, fechaMuerte, observaciones) {
        const url = '/Services/SvcPersonas.svc/EditarPersona'
        const type = 'POST';
        const params = {
            persona: {
                Persona_Id: id,
                Persona_Identificacion_Legal: dni,
                Persona_Foto: foto,
                Persona_Nombre: nombre,
                Persona_Apellido_1: apellido1,
                Persona_Apellido_2: apellido2,
                Persona_Alias: alias,
                Persona_Sexo: sexo,
                Persona_Fecha_Nacimiento: fechaNacimiento ? fechaNacimiento.toFechaDate() : null,
                Persona_Fecha_Muerte: fechaMuerte ? fechaMuerte.toFechaDate() : null,
                Persona_Observaciones: observaciones
            }
        }
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            $('#modalPersonas').modal('hide');
            if (typeof AceptarCallback !== 'undefined') {
                AceptarCallback();
            }
        };
        const ko = function (jqXHR, textStatus, errorThrown) {
            let message = "Error";
            if (jqXHR && jqXHR.responseJSON) {
                message = jqXHR.responseJSON.Message;
            } else if (errorThrown) {
                message = errorThrown;
            }
            Dolf.Ventana.WarningModal('Personas', message);
        };

        Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    function pNuevoRegistro(id, dni, foto, nombre, apellido1, apellido2, alias, sexo, fechaNacimiento, fechaMuerte, observaciones) {
        const url = '/Services/SvcPersonas.svc/NuevaPersona'
        const type = 'POST';
        const params = {
            persona: {
                Persona_Id: id || 0,
                Persona_Identificacion_Legal: dni,
                Persona_Foto: foto,
                Persona_Nombre: nombre,
                Persona_Apellido_1: apellido1,
                Persona_Apellido_2: apellido2,
                Persona_Alias: alias,
                Persona_Sexo: sexo,
                Persona_Fecha_Nacimiento: fechaNacimiento ? fechaNacimiento.toFechaDate() : null,
                Persona_Fecha_Muerte: fechaMuerte ? fechaMuerte.toFechaDate() : null,
                Persona_Observaciones: observaciones
            }
        }
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            $('#modalPersonas').modal('hide');
            if (typeof AceptarCallback !== 'undefined') {
                AceptarCallback();
            }
        };
        const ko = function (jqXHR, textStatus, errorThrown) {
            Dolf.Ventana.WarningModal('Personas', jqXHR.responseJSON.Message);
        };

        Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    return {
        EstablecerAceptar: EstablecerAceptar,
        Mostrar: Mostrar
    }
})();