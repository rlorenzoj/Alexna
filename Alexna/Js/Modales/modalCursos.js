const modalCursos = (function () {
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
            $('#modalCursos_Aceptar').off();
            $('#modalCursos_Aceptar').on('click', function (e) {
                const id = $('#modalCursos_id').val();
                const nombre = $('#modalCursos_nombre').val();
                const activo = document.getElementById('modalCursos_activo').checked;
                const fechaInicio = $("#modalCursos_fechaInicio").datepicker('getDate');
                const fechaFin = $("#modalCursos_fechaFin").datepicker('getDate');
                const observaciones = $('#modalCursos_observaciones').html();

                if (!nombre) {
                    Dolf.Ventana.WarningModal('Cursos', 'Por favor, introduzca el nomhre del curso.');
                } else if (!fechaInicio) {
                    Dolf.Ventana.WarningModal('Cursos', 'Por favor, seleccione la fecha de inicio del curso.');
                } else if (!fechaFin) {
                    Dolf.Ventana.WarningModal('Cursos', 'Por favor, seleccione la fecha de finalización del curso.');
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
            $('#modalCursos').modal('show');
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

        $('#modalCursos_id').val('');
        $('#modalCursos_nombre').val('');
        document.getElementById('modalCursos_activo').checked = true;
        $("#modalCursos_fechaInicio").datepicker({
            dateFormat: "dd-mm-yy"
        });
        $("#modalCursos_fechaInicio").val('');
        $("#modalCursos_fechaFin").datepicker({
            dateFormat: "dd-mm-yy"
        });
        $("#modalCursos_fechaFin").val('');
        $("#modalCursos_observaciones").html('');

        if (typeof id !== 'undefined') {
            const url = '/Services/SvcCursos.svc/ObtenerCurso';
            const type = 'POST';
            const params = {
                id: id
            };
            const async = true;
            const ok = function (datos, textStatus, jqXHR) {
                if (datos) {
                    $('#modalCursos_id').val(datos.Curso_Id);
                    $('#modalCursos_nombre').val(datos.Curso_Nombre);
                    document.getElementById('modalCursos_activo').checked = datos.Curso_Activo;
                    $("#modalCursos_fechaInicio").datepicker('setDate', datos.Curso_Fecha_Inicio.JsonToDate());
                    $("#modalCursos_fechaFin").datepicker('setDate', datos.Curso_Fecha_Fin.JsonToDate());
                    $("#modalCursos_observaciones").html(datos.Curso_Observaciones);

                    Original.Activo = datos.Curso_Activo;
                    Original.FechaFin = datos.Curso_Fecha_Inicio.JsonToDate();
                    Original.FechaInicio = datos.Curso_Fecha_Fin.JsonToDate();;
                    Original.Id = datos.Curso_Id;
                    Original.Nombre = datos.Curso_Nombre;
                    Original.Observaciones = datos.Curso_Observaciones;
                }
            }
            const ko = function (jqXHR, textStatus, errorThrown) {
                Dolf.Ventana.WarningModal('Cursos', jqXHR.responseJSON.Message);
            }

            Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
        } else {
            return;
        }
    }

    function pEditarRegistro(id, nombre, activo, fechaInicio, fechaFin, observaciones) {
        const url = '/Services/SvcCursos.svc/EditarCurso'
        const type = 'POST';
        const params = {
            curso: {
                Curso_Id: id,
                Curso_Nombre: nombre,
                Curso_Activo: activo,
                Curso_Fecha_Inicio: fechaInicio.toFechaDate(),
                Curso_Fecha_Fin: fechaFin.toFechaDate(),
                Curso_Observaciones: observaciones
            }
        }
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            $('#modalCursos').modal('hide');
            if (typeof AceptarCallback !== 'undefined') {
                AceptarCallback();
            }
        };
        const ko = function (jqXHR, textStatus, errorThrown) {
            Dolf.Ventana.WarningModal('Cursos', jqXHR.responseJSON.Message);
        };

        Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    function pNuevoRegistro(id, nombre, activo, fechaInicio, fechaFin, observaciones) {
        const url = '/Services/SvcCursos.svc/NuevoCurso'
        const type = 'POST';
        const params = {
            curso: {
                Curso_Id: id ? id : 0,
                Curso_Nombre: nombre,
                Curso_Activo: activo,
                Curso_Fecha_Inicio: fechaInicio.toFechaDate(),
                Curso_Fecha_Fin: fechaFin.toFechaDate(),
                Curso_Observaciones: observaciones
            }
        }
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            $('#modalCursos').modal('hide');
            if (typeof AceptarCallback !== 'undefined') {
                AceptarCallback();
            }
        };
        const ko = function (jqXHR, textStatus, errorThrown) {
            Dolf.Ventana.WarningModal('Cursos', jqXHR.responseJSON.Message);
        };

        Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    return {
        EstablecerAceptar: EstablecerAceptar,
        Mostrar: Mostrar
    }
})();