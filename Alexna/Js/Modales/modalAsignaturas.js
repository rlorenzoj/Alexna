const modalAsignaturas = (function () {
    let AceptarCallback = undefined;
    const Original = {
        Id: undefined,
        Nombre: undefined,
        Activo: undefined,
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
            $('#modalAsignaturas_Aceptar').off();
            $('#modalAsignaturas_Aceptar').on('click', function (e) {
                const id = $('#modalAsignaturas_id').val();
                const nombre = $('#modalAsignaturas_nombre').val();
                const activo = document.getElementById('modalAsignaturas_activo').checked;
                const fechaInicio = $("#modalAsignaturas_fechaInicio").datepicker('getDate');
                const fechaFin = $("#modalAsignaturas_fechaFin").datepicker('getDate');
                const observaciones = $('#modalAsignaturas_observaciones').html();

                if (!nombre) {
                    Dolf.Ventana.WarningModal('Asignaturas', 'Por favor, introduzca el nomhre de la Asignatura.');
                } else if (!fechaInicio) {
                    Dolf.Ventana.WarningModal('Asignaturas', 'Por favor, seleccione la fecha de inicio de la Asignatura.');
                } else if (!fechaFin) {
                    Dolf.Ventana.WarningModal('Asignaturas', 'Por favor, seleccione la fecha de finalización de la Asignatura.');
                } else {
                    if (!Original.Id) {
                        // Es un nuevo registro.
                        pNuevoRegistro(id, nombre, activo, fechaInicio, fechaFin, observaciones);
                    } else {
                        // Es una modificación.
                        pEditarRegistro(id, nombre, activo, fechaInicio, fechaFin, observaciones);
                    }
                }
            });

            if (typeof callbakOK === 'function') {
                callbakOK();
            }
            $('#modalAsignaturas').modal('show');
        }).fail(function () {
            if (typeof callbackKO === 'function') {
                callbackKO();
            }
        });
    }

    function pCargarRegistro(id) {
        Original.Activo = undefined;
        Original.FechaFin = undefined;
        Original.FechaInicio = undefined;
        Original.Id = undefined;
        Original.Nombre = undefined;
        Original.Observaciones = undefined;

        $('#modalAsignaturas_id').val('');
        $('#modalAsignaturas_nombre').val('');
        document.getElementById('modalAsignaturas_activo').checked = true;
        $("#modalAsignaturas_fechaInicio").datepicker({
            dateFormat: "dd-mm-yy"
        });
        $("#modalAsignaturas_fechaInicio").val('');
        $("#modalAsignaturas_fechaFin").datepicker({
            dateFormat: "dd-mm-yy"
        });
        $("#modalAsignaturas_fechaFin").val('');
        $("#modalAsignaturas_observaciones").html('');

        if (typeof id !== 'undefined') {
            const url = '/Services/SvcAsignaturas.svc/ObtenerAsignatura';
            const type = 'POST';
            const params = {
                id: id
            };
            const async = true;
            const ok = function (datos, textStatus, jqXHR) {
                if (datos) {
                    $('#modalAsignaturas_id').val(datos.Asignatura_Id);
                    $('#modalAsignaturas_nombre').val(datos.Asignatura_Nombre);
                    document.getElementById('modalAsignaturas_activo').checked = datos.Asignatura_Activa;
                    $("#modalAsignaturas_fechaInicio").datepicker('setDate', datos.Asignatura_Fecha_Inicio.JsonToDate());
                    $("#modalAsignaturas_fechaFin").datepicker('setDate', datos.Asignatura_Fecha_Fin.JsonToDate());
                    $("#modalAsignaturas_observaciones").html(datos.Asignatura_Observaciones);

                    Original.Activo = datos.Asignatura_Activa;
                    Original.FechaFin = datos.Asignatura_Fecha_Inicio.JsonToDate();
                    Original.FechaInicio = datos.Asignatura_Fecha_Fin.JsonToDate();;
                    Original.Id = datos.Asignatura_Id;
                    Original.Nombre = datos.Asignatura_Nombre;
                    Original.Observaciones = datos.Asignatura_Observaciones;
                }
            }
            const ko = function (jqXHR, textStatus, errorThrown) {
                Dolf.Ventana.WarningModal('Asignaturas', jqXHR.responseJSON.Message);
            }

            Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
        } else {
            return;
        }
    }

    function pEditarRegistro(id, nombre, activo, fechaInicio, fechaFin, observaciones) {
        const url = '/Services/SvcAsignaturas.svc/EditarAsignatura'
        const type = 'POST';
        const params = {
            asignatura: {
                Asignatura_Id: id,
                Asignatura_Nombre: nombre,
                Asignatura_Activa: activo,
                Asignatura_Fecha_Inicio: fechaInicio.toFechaDate(),
                Asignatura_Fecha_Fin: fechaFin.toFechaDate(),
                Asignatura_Observaciones: observaciones
            }
        }
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            $('#modalAsignaturas').modal('hide');
            if (typeof AceptarCallback !== 'undefined') {
                AceptarCallback();
            }
        };
        const ko = function (jqXHR, textStatus, errorThrown) {
            Dolf.Ventana.WarningModal('Asignaturas', jqXHR.responseJSON.Message);
        };

        Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    function pNuevoRegistro(id, nombre, activo, fechaInicio, fechaFin, observaciones) {
        const url = '/Services/SvcAsignaturas.svc/NuevaAsignatura'
        const type = 'POST';
        const params = {
            asignatura: {
                Asignatura_Id: id ? id : 0,
                Asignatura_Nombre: nombre,
                Asignatura_Activa: activo,
                Asignatura_Fecha_Inicio: fechaInicio.toFechaDate(),
                Asignatura_Fecha_Fin: fechaFin.toFechaDate(),
                Asignatura_Observaciones: observaciones
            }
        }
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            $('#modalAsignaturas').modal('hide');
            if (typeof AceptarCallback !== 'undefined') {
                AceptarCallback();
            }
        };
        const ko = function (jqXHR, textStatus, errorThrown) {
            Dolf.Ventana.WarningModal('Asignaturas', jqXHR.responseJSON.Message);
        };

        Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    return {
        EstablecerAceptar: EstablecerAceptar,
        Mostrar: Mostrar
    }
})();