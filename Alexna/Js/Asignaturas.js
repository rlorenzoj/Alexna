﻿const Asignaturas = (function () {
    "use strict";

    function Inicio() {
        pLoadAsignaturas();

        // Click events.
        (function () {
            // Edición de registros de la tabla.
            $('body').on('click', 'i.editRow', function (e) {
                const id = $(this).data('id');
                const callback = function () {
                    $('#tablaPrincipal').DataTable().ajax.reload();
                };
                modalAsignaturas.EstablecerAceptar(callback);
                modalAsignaturas.Mostrar(id);
            });

            // Borrado de registros de la tabla.
            $('body').on('click', 'i.deleteRow', function (e) {
                const id = $(this).data('id');
                const ok = function () {
                    const url = '/Services/SvcAsignaturas.svc/BorrarAsignatura';
                    const type = 'POST';
                    const params = {
                        id: id
                    };
                    const async = true;
                    const ok = function (datos, textStatus, jqXHR) {
                        if (datos) {
                            $('#tablaPrincipal').DataTable().ajax.reload();
                        } else {
                            Dolf.Ventana.WarningModal('Asignaturas', 'No se ha podido borrar la Asignatura indicado.');
                        }
                    }
                    const ko = function (jqXHR, textStatus, errorThrown) {
                        Dolf.Ventana.WarningModal('Asignaturas', jqXHR.responseJSON.Message);
                    }

                    Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
                };
                Dolf.Ventana.QuestionModal('Borrar registro', '¿Está seguro que desea borrar el registro seleccionado?', ok);
            });

            // Añadir nuevos registros.
            $('body').on('click', '#Nuevo', function (e) {
                const callback = function () {
                    $('#tablaPrincipal').DataTable().ajax.reload();
                };
                modalAsignaturas.EstablecerAceptar(callback);
                modalAsignaturas.Mostrar();
            });
        })();
    }

    function pLoadAsignaturas() {
        const dataTable = $('#tablaPrincipal').DataTable({
            ajax: {
                url: '/Services/SvcAsignaturas.svc/ObtenerListado',
                method: 'POST',
                dataSrc: function (datos) {
                    return datos.d;
                },
                error: function (xhr, error, thrown) {
                    Dolf.Ventana.WarningModal('Asignaturas', xhr.statusText);
                }
            },
            autoWidth: false,
            responsive: true,
            columnDefs: [
                {
                    targets: ['_all'],
                    className: 'mdc-data-table__cell'
                }
            ],
            columns: [
                { data: 'Asignatura_Id' },
                { data: 'Asignatura_Nombre' },
                { data: 'Asignatura_Activa' },
                {
                    data: 'Asignatura_Fecha_Inicio',
                    'render': function (data, type, row, meta) {
                        if (type === 'sort') {
                            return data ? data.JsonToDate().toFechaAnoMesDia() : '';
                        } else {
                            return data ? data.JsonToDate().toFecha() : '';
                        }
                    }
                },
                {
                    data: 'Asignatura_Fecha_Fin',
                    'render': function (data, type, row, meta) {
                        if (type === 'sort') {
                            return data ? data.JsonToDate().toFechaAnoMesDia() : '';
                        } else {
                            return data ? data.JsonToDate().toFecha() : '';
                        }
                    }
                },
                { data: 'Asignatura_Observaciones' },
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    width: '150px',
                    render: function (data, type, row, meta) {
                        return '<span style="font-size: 20px;"><i class="fas fa-pencil-alt editRow mr-3 pointer" data-id="{0}"></i><i class="fas fa-trash-alt deleteRow pointer" data-id="{0}"></i></span>'.formato(row.Asignatura_Id);
                    }
                }
            ],
            paging: true,
            pageLength: 10,
            processing: true,
            serverSide: false,
            dom: '<"toolbar">Bfrtip',
            buttons: [
                {
                    extend: 'copy',
                    exportOptions: {
                        columns: 'th:not(:last-child)'
                    }
                },
                {
                    extend: 'csv',
                    exportOptions: {
                        columns: 'th:not(:last-child)'
                    }
                },
                {
                    extend: 'excel',
                    exportOptions: {
                        columns: 'th:not(:last-child)'
                    }
                },
                {
                    extend: 'pdf',
                    exportOptions: {
                        columns: 'th:not(:last-child)'
                    }
                }, {
                    extend: 'print',
                    exportOptions: {
                        columns: 'th:not(:last-child)'
                    }
                }]
        });
        $("div.toolbar").html('<button type="button" class="btn btn-outline-primary btn-sm mb-4" id="Nuevo">Añadir</button>');
    }

    return {
        Inicio: Inicio
    }
})();

function Inicio() {
    Asignaturas.Inicio()
}