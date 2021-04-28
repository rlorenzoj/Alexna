const CursosEscolares = (function () {
    "use strict";

    let ListaAsignaturas = [];
    let ListaCursos = [];

    // Eventos
    {
        $('#cursoEscolar').select2({
            allowClear: true,
            language: 'es',
            multiple: false,
            placeholder: 'Seleccione el curso escolar',
            theme: 'classic',
            width: 'resolve'
        });

        $("#fechaInicio").datepicker({
            dateFormat: "dd-mm-yy"
        });

        $("#fechaFin").datepicker({
            dateFormat: "dd-mm-yy"
        });


        $('#asignaturas').select2({
            allowClear: true,
            language: 'es',
            multiple: true,
            placeholder: 'Seleccione las asignaturas que se impartirán',
            theme: 'classic',
            width: 'resolve'
        });

        $('#cursoEscolar').on('change', function (e) {
            if ($('#cursoEscolar').val()) {
                if ($('#cajaOpciones').hasClass('d-none')) {
                    $('#cajaOpciones').removeClass('d-none');
                }
            } else {
                if (!$('#cajaOpciones').hasClass('d-none')) {
                    $('#cajaOpciones').addClass('d-none');
                }
            }
        });
    }

    function Inicio() {
        $.when(pObtenerAsignaturas()).done(function () {
            pObtenerCursos().done(function () {

            });
        });
    }

    function pCargarComboAsignaturas() {
        const $select = $('#asignaturas');
        $select.find('option').remove();

        if (ListaAsignaturas && ListaAsignaturas.length > 0) {
            for (let indice = 0, max = ListaAsignaturas.length; indice < max; indice++) {
                const $option = $('<option value="{0}">{1}</option>'.formato(ListaAsignaturas[indice].Asignatura_Id, ListaAsignaturas[indice].Asignatura_Nombre));
                $select.append($option);
            }
        }
    }

    function pCargarComboCursos() {
        const $select = $('#cursoEscolar');
        $select.find('option').remove();

        if (ListaCursos && ListaCursos.length > 0) {
            $select.append($('<option></option>'));
            for (let indice = 0, max = ListaCursos.length; indice < max; indice++) {
                const $option = $('<option value="{0}">{1}</option>'.formato(ListaCursos[indice].Curso_Id, ListaCursos[indice].Curso_Nombre));
                $select.append($option);
            }
        }
    }

    function pObtenerAsignaturas() {
        const url = '/Services/SvcAsignaturas.svc/ObtenerListadoActivos';
        const type = 'POST';
        const params = {
        };
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            ListaAsignaturas = datos;
            pCargarComboAsignaturas();
        }
        const ko = function (jqXHR, textStatus, errorThrown) {
            Dolf.Ventana.WarningModal('Cursos', jqXHR.responseJSON.Message);
        }

        return Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    function pObtenerCursos() {
        const url = '/Services/SvcCursos.svc/ObtenerListadoActivos';
        const type = 'POST';
        const params = {
        };
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            ListaCursos = datos;
            pCargarComboCursos();
        }
        const ko = function (jqXHR, textStatus, errorThrown) {
            Dolf.Ventana.WarningModal('Cursos', jqXHR.responseJSON.Message);
        }

        return Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    return {
        Inicio: Inicio
    }
})();

function Inicio() {
    CursosEscolares.Inicio();
}
