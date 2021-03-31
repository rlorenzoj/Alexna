const modalPaises = (function () {
    let AceptarCallback = undefined;
    const Original = {
        Id: undefined,
        Nombre: undefined,
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
            $('#modalPaises_Aceptar').off();
            $('#modalPaises_Aceptar').on('click', function (e) {
                const id = $('#modalPaises_id').val();
                const nombre = $('#modalPaises_nombre').val();
                const observaciones = $('#modalPaises_observaciones').html();

                if (!nombre) {
                    Dolf.Ventana.WarningModal('Países', 'Por favor, introduzca el nombre del país.');
                } else {
                    if (!Original.Id) {
                        // Es un nuevo registro.
                        pNuevoRegistro(id, nombre, observaciones);
                    } else {
                        // Es una modificación.
                        pEditarRegistro(id, nombre, observaciones);
                    }
                }
            });

            if (typeof callbakOK === 'function') {
                callbakOK();
            }
            $('#modalPaises').modal('show');
        }).fail(function () {
            if (typeof callbackKO === 'function') {
                callbackKO();
            }
        });
    }

    function pCargarRegistro(id) {
        Original.Id = undefined;
        Original.Nombre = undefined;
        Original.Observaciones = undefined;

        $('#modalPaises_id').val('');
        $('#modalPaises_nombre').val('');
        $("#modalPaises_observaciones").html('');

        if (typeof id !== 'undefined') {
            const url = '/Services/SvcPaises.svc/ObtenerPais';
            const type = 'POST';
            const params = {
                id: id
            };
            const async = true;
            const ok = function (datos, textStatus, jqXHR) {
                if (datos) {
                    $('#modalPaises_id').val(datos.Pais_Id);
                    $('#modalPaises_nombre').val(datos.Pais_Nombre);
                    $("#modalPaises_observaciones").html(datos.Pais_Observaciones);

                    Original.Id = datos.Pais_Id;
                    Original.Nombre = datos.Pais_Nombre;
                    Original.Observaciones = datos.Pais_Observaciones;
                }
            }
            const ko = function (jqXHR, textStatus, errorThrown) {
                Dolf.Ventana.WarningModal('Países', jqXHR.responseJSON.Message);
            }

            return Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
        } else {
            return $.Deferred().resolve().promise();
        }
    }

    function pEditarRegistro(id, nombre, observaciones) {
        const url = '/Services/SvcPaises.svc/EditarPais'
        const type = 'POST';
        const params = {
            pais: {
                Pais_Id: id,
                Pais_Nombre: nombre,
                Pais_Observaciones: observaciones
            }
        }
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            $('#modalPaises').modal('hide');
            if (typeof AceptarCallback !== 'undefined') {
                AceptarCallback();
            }
        };
        const ko = function (jqXHR, textStatus, errorThrown) {
            Dolf.Ventana.WarningModal('Países', jqXHR.responseJSON.Message);
        };

        Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    function pNuevoRegistro(id, nombre, observaciones) {
        const url = '/Services/SvcPaises.svc/NuevoPais'
        const type = 'POST';
        const params = {
            pais: {
                Pais_Id: id ? id : 0,
                Pais_Nombre: nombre,
                Pais_Observaciones: observaciones
            }
        }
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            $('#modalPaises').modal('hide');
            if (typeof AceptarCallback !== 'undefined') {
                AceptarCallback();
            }
        };
        const ko = function (jqXHR, textStatus, errorThrown) {
            Dolf.Ventana.WarningModal('Países', jqXHR.responseJSON.Message);
        };

        Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    return {
        EstablecerAceptar: EstablecerAceptar,
        Mostrar: Mostrar
    }
})();