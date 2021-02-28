const modalVacaciones = (function () {
    let AceptarCallback = undefined;
    const Original = {
        Id: undefined,
        Nombre: undefined,
        FechaInicio: undefined,
        FechaFin: undefined,
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
            $('#modalVacaciones_Aceptar').off();
            $('#modalVacaciones_Aceptar').on('click', function (e) {
                const id = $('#modalVacaciones_id').val();
                const nombre = $('#modalVacaciones_nombre').val();
                const fechaInicio = $("#modalVacaciones_fechaInicio").datepicker('getDate');
                const fechaFin = $("#modalVacaciones_fechaFin").datepicker('getDate');
                const observaciones = $('#modalVacaciones_observaciones').html();

                if (!nombre) {
                    Dolf.Ventana.WarningModal('Vacaciones', 'Por favor, introduzca el nombre de las vacaciones.');
                } else if (!fechaInicio) {
                    Dolf.Ventana.WarningModal('Vacaciones', 'Por favor, seleccione la fecha de inicio de las vacaciones.');
                } else if (!fechaFin) {
                    Dolf.Ventana.WarningModal('Vacaciones', 'Por favor, seleccione la fecha de finalización de las vacaciones.');
                } else {
                    if (!Original.Id) {
                        // Es un nuevo registro.
                        pNuevoRegistro(id, nombre, fechaInicio, fechaFin, observaciones);
                    } else {
                        // Es una modificación.
                        pEditarRegistro(id, nombre, fechaInicio, fechaFin, observaciones);
                    }
                }
            });

            if (typeof callbakOK === 'function') {
                callbakOK();
            }
            $('#modalVacaciones').modal('show');
        }).fail(function () {
            if (typeof callbackKO === 'function') {
                callbackKO();
            }
        });
    }

    function pCargarRegistro(id) {
        Original.FechaFin = undefined;
        Original.FechaInicio = undefined;
        Original.Id = undefined;
        Original.Nombre = undefined;
        Original.Observaciones = undefined;

        $('#modalVacaciones_id').val('');
        $('#modalVacaciones_nombre').val('');
        $("#modalVacaciones_fechaInicio").datepicker({
            dateFormat: "dd-mm-yy"
        });
        $("#modalVacaciones_fechaInicio").val('');
        $("#modalVacaciones_fechaFin").datepicker({
            dateFormat: "dd-mm-yy"
        });
        $("#modalVacaciones_fechaFin").val('');
        $("#modalVacaciones_observaciones").html('');

        if (typeof id !== 'undefined') {
            const url = '/Services/SvcVacaciones.svc/ObtenerVacacion';
            const type = 'POST';
            const params = {
                id: id
            };
            const async = true;
            const ok = function (datos, textStatus, jqXHR) {
                if (datos) {
                    $('#modalVacaciones_id').val(datos.Vacacion_Id);
                    $('#modalVacaciones_nombre').val(datos.Vacacion_Nombre);
                    $("#modalVacaciones_fechaInicio").datepicker('setDate', datos.Vacacion_Fecha_Inicio.JsonToDate());
                    $("#modalVacaciones_fechaFin").datepicker('setDate', datos.Vacacion_Fecha_Fin.JsonToDate());
                    $("#modalVacaciones_observaciones").html(datos.Vacacion_Observaciones);

                    Original.FechaFin = datos.Vacacion_Fecha_Inicio.JsonToDate();
                    Original.FechaInicio = datos.Vacacion_Fecha_Fin.JsonToDate();;
                    Original.Id = datos.Vacacion_Id;
                    Original.Nombre = datos.Vacacion_Nombre;
                    Original.Observaciones = datos.Vacacion_Observaciones;
                }
            }
            const ko = function (jqXHR, textStatus, errorThrown) {
                Dolf.Ventana.WarningModal('Vacaciones', jqXHR.responseJSON.Message);
            }

            Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
        } else {
            return;
        }
    }

    function pEditarRegistro(id, nombre, fechaInicio, fechaFin, observaciones) {
        const url = '/Services/SvcVacaciones.svc/EditarVacacion'
        const type = 'POST';
        const params = {
            vacacion: {
                Vacacion_Id: id,
                Vacacion_Nombre: nombre,
                Vacacion_Fecha_Inicio: fechaInicio.toFechaDate(),
                Vacacion_Fecha_Fin: fechaFin.toFechaDate(),
                Vacacion_Observaciones: observaciones
            }
        }
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            $('#modalVacaciones').modal('hide');
            if (typeof AceptarCallback !== 'undefined') {
                AceptarCallback();
            }
        };
        const ko = function (jqXHR, textStatus, errorThrown) {
            Dolf.Ventana.WarningModal('Vacaciones', jqXHR.responseJSON.Message);
        };

        Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    function pNuevoRegistro(id, nombre, fechaInicio, fechaFin, observaciones) {
        const url = '/Services/SvcVacaciones.svc/NuevaVacacion'
        const type = 'POST';
        const params = {
            vacacion: {
                Vacacion_Id: id ? id : 0,
                Vacacion_Nombre: nombre,
                Vacacion_Fecha_Inicio: fechaInicio.toFechaDate(),
                Vacacion_Fecha_Fin: fechaFin.toFechaDate(),
                Vacacion_Observaciones: observaciones
            }
        }
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            $('#modalVacaciones').modal('hide');
            if (typeof AceptarCallback !== 'undefined') {
                AceptarCallback();
            }
        };
        const ko = function (jqXHR, textStatus, errorThrown) {
            Dolf.Ventana.WarningModal('Vacaciones', jqXHR.responseJSON.Message);
        };

        Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    return {
        EstablecerAceptar: EstablecerAceptar,
        Mostrar: Mostrar
    }
})();