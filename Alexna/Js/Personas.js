const Personas = (function () {
    "use strict";

    function Inicio() {
        pLoadPersonas();

        // Click events.
        (function () {
            // Edición de registros de la tabla.
            $('body').on('click', 'i.editRow', function (e) {
                const id = $(this).data('id');
                const callback = function () {
                    $('#tablaPrincipal').DataTable().ajax.reload();
                };
                modalPersonas.EstablecerAceptar(callback);
                modalPersonas.Mostrar(id);
            });

            // Borrado de registros de la tabla.
            $('body').on('click', 'i.deleteRow', function (e) {
                const id = $(this).data('id');
                const ok = function () {
                    const url = '/Services/SvcPersonas.svc/BorrarPersona';
                    const type = 'POST';
                    const params = {
                        id: id
                    };
                    const async = true;
                    const ok = function (datos, textStatus, jqXHR) {
                        if (datos) {
                            $('#tablaPrincipal').DataTable().ajax.reload();
                        } else {
                            Dolf.Ventana.WarningModal('Personas', 'No se ha podido borrar la persona indicada.');
                        }
                    }
                    const ko = function (jqXHR, textStatus, errorThrown) {
                        Dolf.Ventana.WarningModal('Personas', jqXHR.responseJSON.Message);
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
                modalPersonas.EstablecerAceptar(callback);
                modalPersonas.Mostrar();
            });
        })();
    }

    function pLoadPersonas() {
        const dataTable = $('#tablaPrincipal').DataTable({
            ajax: {
                url: '/Services/SvcPersonas.svc/ObtenerListado',
                method: 'POST',
                dataSrc: function (datos) {
                    return datos.d;
                },
                error: function (xhr, error, thrown) {
                    Dolf.Ventana.WarningModal('Personas', xhr.statusText);
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
                { data: 'Persona_Id' },
                { data:'Persona_Identificacion_Legal'},
                {
                    data: 'Persona_Foto',
                    searchable: false,
                    orderable: false,
                    render: function (data, type, row, meta) {
                        if (data) {
                            //const image = new Image();
                            //image.src = data;
                            //document.body.appendChild(image);
                            return '<img src="' + data + '" style="width: 50px;" />';
                        } else {
                            return '';
                        }
                    }
                },
                { data: 'Persona_Nombre' },
                { data: 'Persona_Apellido_1' },
                { data: 'Persona_Apellido_2' },
                { data: 'Persona_Alias' },
                { data:'Persona_Sexo'},
                {
                    data: 'Persona_Fecha_Nacimiento',
                    'render': function (data, type, row, meta) {
                        if (type === 'sort') {
                            return data ? data.JsonToDate().toFechaAnoMesDia() : '';
                        } else {
                            return data ? data.JsonToDate().toFecha() : '';
                        }
                    }
                },
                {
                    data: 'Persona_Fecha_Muerte',
                    'render': function (data, type, row, meta) {
                        if (type === 'sort') {
                            return data ? data.JsonToDate().toFechaAnoMesDia() : '';
                        } else {
                            return data ? data.JsonToDate().toFecha() : '';
                        }
                    }
                },
                { data: 'Persona_Observaciones' },
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    width: '150px',
                    render: function (data, type, row, meta) {
                        return '<span style="font-size: 20px;"><i class="fas fa-pencil-alt editRow mr-3 pointer" data-id="{0}"></i><i class="fas fa-trash-alt deleteRow pointer" data-id="{0}"></i></span>'.formato(row.Persona_Id);
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
                        columns: 'th:not(:nth-child(3), :last-child)'
                    }
                },
                {
                    extend: 'csv',
                    exportOptions: {
                        columns: 'th:not(:nth-child(3), :last-child)'
                    }
                },
                {
                    extend: 'excel',
                    exportOptions: {
                        columns: 'th:not(:nth-child(3), :last-child)'
                    }
                },
                {
                    extend: 'pdf',
                    exportOptions: {
                        columns: 'th:not(:nth-child(3), :last-child)'
                    }
                }, {
                    extend: 'print',
                    exportOptions: {
                        columns: 'th:not(:nth-child(3), :last-child)'
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
    Personas.Inicio()
}