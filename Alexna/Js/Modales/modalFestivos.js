const modalFestivos = (function () {
    let AceptarCallback = undefined;
    const Original = {
        Fecha: undefined,
        Descripcion: undefined
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

    function Mostrar(fecha, callbakOK, callbackKO) {
        $.when(pCargarRegistro(fecha)).done(function () {
            // Establecemos los eventos
            $('#modalFestivos_Aceptar').off();
            $('#modalFestivos_Aceptar').on('click', function (e) {
                const fecha = $("#modalFestivos_fecha").datepicker('getDate');
                const descripcion = $('#modalFestivos_descripcion').val();

                if (!Original.Fecha) {
                    // Es un nuevo registro.
                    pNuevoRegistro(fecha, descripcion);
                } else {
                    // Es una modificación.
                    pEditarRegistro(fecha, descripcion);
                }
            });


            if (typeof callbakOK === 'function') {
                callbakOK();
            }
            $('#modalFestivos').modal('show');
        }).fail(function () {
            if (typeof callbackKO === 'function') {
                callbackKO();
            }
        });
    }

    function pCargarRegistro(fecha) {
        Original.Fecha = undefined;
        Original.Descripcion = undefined;

        $("#modalFestivos_fecha").datepicker({
            dateFormat: "dd-mm-yy"
        });
        $("#modalFestivos_fecha").val('');
        $("#modalFestivos_fecha").datepicker("option", "disabled", false);
        $("#modalFestivos_descripcion").val('');

        if (typeof fecha !== 'undefined') {
            const url = '/Services/SvcFestivos.svc/GetFestivo';
            const type = 'POST';
            const params = {
                fecha: fecha
            };
            const async = true;
            const ok = function (datos, textStatus, jqXHR) {
                if (datos) {
                    $("#modalFestivos_fecha").datepicker('setDate', datos.Festivo_Fecha.JsonToDate());
                    $("#modalFestivos_fecha").datepicker("option", "disabled", true);
                    $("#modalFestivos_descripcion").val(datos.Festivo_Descripcion);

                    Original.Fecha = datos.Festivo_Fecha.JsonToDate();
                    Original.Descripcion = datos.Festivo_Descripcion;
                }
            }
            const ko = function (jqXHR, textStatus, errorThrown) {
                Dolf.Ventana.WarningModal('Festivos', jqXHR.responseJSON.Message);
            }

            Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
        } else {
            return;
        }
    }

    function pEditarRegistro(fecha, descripcion) {
        const url = '/Services/SvcFestivos.svc/EditarFestivo'
        const type = 'POST';
        const params = {
            festivo: {
                Festivo_Fecha: fecha.toFechaDate(),
                Festivo_Descripcion: descripcion
            }
        }
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            $('#modalFestivos').modal('hide');
            if (typeof AceptarCallback !== 'undefined') {
                AceptarCallback();
            }
        };
        const ko = function (jqXHR, textStatus, errorThrown) {
            Dolf.Ventana.WarningModal('Festivos', jqXHR.responseJSON.Message);
        };

        Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    function pNuevoRegistro(fecha, descripcion) {
        const url = '/Services/SvcFestivos.svc/NuevoFestivo'
        const type = 'POST';
        const params = {
            festivo: {
                Festivo_Fecha: fecha.toFechaDate(),
                Festivo_Descripcion: descripcion
            }
        }
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            $('#modalFestivos').modal('hide');
            if (typeof AceptarCallback !== 'undefined') {
                AceptarCallback();
            }
        };
        const ko = function (jqXHR, textStatus, errorThrown) {
            Dolf.Ventana.WarningModal('Festivos', jqXHR.responseJSON.Message);
        };

        Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    return {
        EstablecerAceptar: EstablecerAceptar,
        Mostrar: Mostrar
    }
})();