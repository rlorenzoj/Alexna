const Festivos = (function () {
    "use strict";

    function Inicio() {
        pLoadFestivos();

        // Click events.
        (function () {
            $('body').on('click', 'i.editRow', function (e) {
                //TODO: Edición de registros de la tabla.
            });

            $('body').on('click', 'i.deleteRow', function (e) {
                //TODO: Borrado de registros de la tabla.
                const ok = function () {
                    alert('A borrar se ha dicho');
                };
                Dolf.Ventana.QuestionModal('Borrar registro', '¿Está seguro que desea borrar el registro seleccionado?', ok);
            });
        })();
    }

    function pLoadFestivos() {
        const dataTable = $('#tablaPrincipal').DataTable({
            ajax: {
                url: '/Services/SvcFestivos.svc/GetListado',
                method: 'POST',
                dataSrc: function (datos) {
                    return datos.d;
                },
                error: function (xhr, error, thrown) {
                    //TODO: Mostrar mensaje de error.
                }
            },
            responsive: true,
            columns: [
                {
                    data: 'Festivo_Fecha',
                    render: function (data, type, row, meta) {
                        if (type === 'sort') {
                            return data ? data.JsonToDate() : '';
                        } else {
                            return data ? data.JsonToDate().toFecha() : '';
                        }
                    }
                },
                { data: 'Festivo_Descripcion' },
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    width: '150px',
                    render: function (data, type, row, meta) {
                        return '<span style="font-size: 20px;"><i class="fas fa-pencil-alt editRow mr-3 pointer"></i><i class="fas fa-trash-alt deleteRow pointer"></i></span>';
                    }
                }
            ],
            paging: true,
            pageLength: 10,
            processing: true,
            serverSide: false
        });

        //const url = '/Services/SvcFestivos.svc/GetListado';
        //const type = 'POST';
        //const params = {};
        //const async = true;
        //const ok = function (data, textStatus, jqXHR) {
        //};
        //const ko = function (jqXHR, textStatus, errorThrown) {
        //    alert('ko');
        //};

        //return Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    return {
        Inicio: Inicio
    }
})();

function Inicio() {
    Festivos.Inicio()
}