const modalAulas = (function () {
    let AceptarCallback = undefined;
    const Original = {
        Id: undefined,
        Nombre: undefined,
        Activa: undefined,
        Observaciones: undefined
    }

    // Eventos
    {
        $('#modalAulas_Aceptar').on('click', function (e) {
            const id = $('#modalAulas_id').val();
            const nombre = $('#modalAulas_nombre').val();
            const activa = document.getElementById('modalAulas_activa').checked;
            const observaciones = $('#modalAulas_observaciones').html();

            if (!nombre) {
                Dolf.Ventana.WarningModal('Aulas', 'Por favor, introduzca el nomhre del aula.');
            } else {
                if (!Original.Id) {
                    // Es un nuevo registro.
                    pNuevoRegistro(id, nombre, activa, observaciones);
                } else {
                    // Es una modificación.
                    pEditarRegistro(id, nombre, activa, observaciones);
                }
            }
        });

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
            if (typeof callbakOK === 'function') {
                callbakOK();
            }
            $('#modalAulas').modal('show');
        }).fail(function () {
            if (typeof callbackKO === 'function') {
                callbackKO();
            }
        });
    }

    function pCargarRegistro(id) {
        Original.Activa = undefined;
        Original.Id = undefined;
        Original.Nombre = undefined;
        Original.Observaciones = undefined;

        $('#modalAulas_id').val('');
        $('#modalAulas_nombre').val('');
        document.getElementById('modalAulas_activa').checked = true;
        $("#modalAulas_observaciones").html('');

        if (typeof id !== 'undefined') {
            const url = '/Services/SvcAulas.svc/ObtenerAula';
            const type = 'POST';
            const params = {
                id: id
            };
            const async = true;
            const ok = function (datos, textStatus, jqXHR) {
                if (datos) {
                    $('#modalAulas_id').val(datos.Aula_Id);
                    $('#modalAulas_nombre').val(datos.Aula_Nombre);
                    document.getElementById('modalAulas_activa').checked = datos.Aula_Activa;
                    $("#modalAulas_observaciones").html(datos.Aula_Observaciones);

                    Original.Activa = datos.Aula_Activa;
                    Original.Id = datos.Aula_Id;
                    Original.Nombre = datos.Aula_Nombre;
                    Original.Observaciones = datos.Aula_Observaciones;
                }
            }
            const ko = function (jqXHR, textStatus, errorThrown) {
                Dolf.Ventana.WarningModal('Aulas', jqXHR.responseJSON.Message);
            }

            return Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
        } else {
            return $.Deferred().resolve().promise();
        }
    }

    function pEditarRegistro(id, nombre, activa, observaciones) {
        const url = '/Services/SvcAulas.svc/EditarAula'
        const type = 'POST';
        const params = {
            aula: {
                Aula_Id: id,
                Aula_Nombre: nombre,
                Aula_Activa: activa,
                Aula_Observaciones: observaciones
            }
        }
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            $('#modalAulas').modal('hide');
            if (typeof AceptarCallback !== 'undefined') {
                AceptarCallback();
            }
        };
        const ko = function (jqXHR, textStatus, errorThrown) {
            Dolf.Ventana.WarningModal('Aulas', jqXHR.responseJSON.Message);
        };

        Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    function pNuevoRegistro(id, nombre, activa, observaciones) {
        const url = '/Services/SvcAulas.svc/NuevaAula'
        const type = 'POST';
        const params = {
            aula: {
                Aula_Id: id ? id : 0,
                Aula_Nombre: nombre,
                Aula_Activa: activa,
                Aula_Observaciones: observaciones
            }
        }
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            $('#modalAulas').modal('hide');
            if (typeof AceptarCallback !== 'undefined') {
                AceptarCallback();
            }
        };
        const ko = function (jqXHR, textStatus, errorThrown) {
            Dolf.Ventana.WarningModal('Aulas', jqXHR.responseJSON.Message);
        };

        Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    return {
        EstablecerAceptar: EstablecerAceptar,
        Mostrar: Mostrar
    }
})();