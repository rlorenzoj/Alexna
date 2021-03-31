const Regiones = (function () {
    "use strict";

    let ListaPaises = [];

    // Eventos
    {
        $('body').on('click', 'i.editRow', function (e) {
            const id = $(this).data('id');
            const callback = function () {
                $('#tablaPrincipal').DataTable().ajax.reload();
            };
            modalRegiones.EstablecerAceptar(callback);
            modalRegiones.Mostrar(id);
        });

        $('body').on('click', 'i.deleteRow', function (e) {
            const id = $(this).data('id');
            const ok = function () {
                const url = '/Services/SvcRegiones.svc/BorrarRegion';
                const type = 'POST';
                const params = {
                    id: id
                };
                const async = true;
                const ok = function (datos, textStatus, jqXHR) {
                    if (datos) {
                        $('#tablaPrincipal').DataTable().ajax.reload();
                    } else {
                        Dolf.Ventana.WarningModal('Regiones', 'No se ha podido borrar la región indicada.');
                    }
                }
                const ko = function (jqXHR, textStatus, errorThrown) {
                    Dolf.Ventana.WarningModal('Regiones', jqXHR.responseJSON.Message);
                }

                Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
            };
            Dolf.Ventana.QuestionModal('Borrar registro', '¿Está seguro que desea borrar el registro seleccionado?', ok);
        });

        $('body').on('click', '#Nuevo', function (e) {
            const callback = function () {
                $('#tablaPrincipal').DataTable().ajax.reload();
            };
            modalRegiones.EstablecerAceptar(callback);
            modalRegiones.Mostrar();
        });
    }


    function Inicio() {
        pCargarPaises().done(function () {
            pCargarDatos();
        });
    }

    function pCargarDatos() {
        const dataTable = $('#tablaPrincipal').DataTable({
            ajax: {
                url: '/Services/SvcRegiones.svc/ObtenerListado',
                method: 'POST',
                dataSrc: function (datos) {
                    return datos.d;
                },
                error: function (xhr, error, thrown) {
                    Dolf.Ventana.WarningModal('Países', xhr.statusText);
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
                { data: 'Region_Id' },
                {
                    data: 'Pais_Id',
                    render: function (data, type, row, meta) {
                        let nombrePais = '';

                        if (ListaPaises && ListaPaises.length > 0) {
                            const pais = $.grep(ListaPaises, function (e, i) {
                                return e.Pais_Id == data;
                            });
                            if (pais && pais.length > 0) {
                                nombrePais = ' - ' + pais[0].Pais_Nombre;
                            }
                        }

                        return data + nombrePais;
                    }
                },
                { data: 'Region_Nombre' },
                { data: 'Region_Observaciones' },
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    width: '150px',
                    render: function (data, type, row, meta) {
                        return '<span style="font-size: 20px;"><i class="fas fa-pencil-alt editRow mr-3 pointer" data-id="{0}"></i><i class="fas fa-trash-alt deleteRow pointer" data-id="{0}"></i></span>'.formato(row.Region_Id);
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

    function pCargarPaises() {
        const url = '/Services/SvcPaises.svc/ObtenerListado';
        const type = 'POST';
        const param = {
        };
        const async = true;
        const ok = function (datos) {
            ListaPaises = datos;
        }
        const ko = function (jqXHR, textStatus, errorThrown) {
            let message = jqXHR.statusText || 'Error sin definir en la llamada a login';
            Dolf.Ventana.DangerModal('Regiones', message);
        }
        return Dolf.Carga.EnviarDatos(url, type, param, async, ok, ko);
    }

    return {
        Inicio: Inicio
    }
})();


function Inicio() {
    Regiones.Inicio()
}