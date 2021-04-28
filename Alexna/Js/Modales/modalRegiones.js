var modalRegiones = (function () {
    "use strict";

    let AceptarCallback = undefined;
    let ListaPaises = [];
    const Original = {
        Id: undefined,
        PaisId: undefined,
        Nombre: undefined,
        Observaciones: undefined
    }

    // Eventos
    {
        $('#modalRegiones_paisId').select2({
            allowClear: true,
            language: 'es',
            multiple: false,
            placeholder: 'Seleccione el país',
            theme: 'classic',
            width: 'resolve'
        });

        $('#modalRegiones_Aceptar').on('click', function (e) {
            const regionId = $('#modalRegiones_id').val();
            const paisId = $('#modalRegiones_paisId').val();
            const nombre = $('#modalRegiones_nombre').val();
            const observaciones = $("#modalRegiones_observaciones").html();

            if (!paisId) {
                Dolf.Ventana.WarningModal('Regiones', 'Por favor, seleccione el país.');
            } else if (!nombre) {
                Dolf.Ventana.WarningModal('Regiones', 'Por favor, introduzca el nombre de la región.');
            } else {
                if (!Original.Id) {
                    pNuevoRegistro(id, nombre, observaciones);
                } else {
                    pEditarRegistro(id, nombre, observaciones);
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
        pBorrarRegistro();
        pCargarPaises().done(function () {
            pCargarRegistro(id).done(function () {
                $('#modalRegiones').modal('show');
                if (typeof callbakOK !== 'undefined') {
                    if (typeof callbakOK !== 'function') {
                        callbakOK = Function(callbakOK);
                    }
                    callbakOK();
                }
            }).fail(function () {
                if (typeof callbackKO !== 'undefined') {
                    if (typeof callbackKO !== 'function') {
                        callbackKO = Function(callbackKO);
                    }
                    callbackKO();
                }
            });
        }).fail(function () {
            if (typeof callbackKO !== 'undefined') {
                if (typeof callbackKO !== 'function') {
                    callbackKO = Function(callbackKO);
                }
                callbackKO();
            }
        });
    }

    function pBorrarRegistro() {
        Original.Id = undefined;
        Original.PaisId = undefined;
        Original.Nombre = undefined;
        Original.Observaciones = undefined;

        $('#modalRegiones_id').val('')
        $('#modalRegiones_paisId').val('').trigger('change');
        $('#modalRegiones_nombre').val('');
        $("#modalRegiones_observaciones").html('');
    }

    function pCargarPaises() {
        const url = '/Services/SvcPaises.svc/ObtenerListado';
        const type = 'POST';
        const param = {
        };
        const async = true;
        const ok = function (datos) {
            ListaPaises = datos;
            pCargarComboPaises();
        }
        const ko = function (jqXHR, textStatus, errorThrown) {
            let message = jqXHR.statusText || 'Error sin definir en la llamada a login';
            Dolf.Ventana.DangerModal('Regiones', message);
        }
        return Dolf.Carga.EnviarDatos(url, type, param, async, ok, ko);
    }

    function pCargarComboPaises() {
        const $select = $('#modalRegiones_paisId');
        $select.find('option').remove();

        if (ListaPaises && ListaPaises.length > 0) {
            $select.append($('<option></option>'));
            for (let indice = 0, max = ListaPaises.length; indice < max; indice++) {
                const $option = $('<option value="{0}">{1}</option>'.formato(ListaPaises[indice].Pais_Id, ListaPaises[indice].Pais_Nombre));
                $select.append($option);
            }
        }
    }

    function pCargarRegistro(id) {
        if (typeof id !== 'undefined') {
            const url = '/Services/SvcRegiones.svc/ObtenerRegion';
            const type = 'POST';
            const params = {
                id: id
            };
            const async = true;
            const ok = function (datos, textStatus, jqXHR) {
                if (datos) {
                    $('#modalRegiones_id').val(datos.Region_Id)
                    $('#modalRegiones_paisId').val(datos.Pais_Id).trigger('change');
                    $('#modalRegiones_nombre').val(datos.Region_Nombre);
                    $("#modalRegiones_observaciones").html(datos.Region_Observaciones);

                    Original.Id = datos.Region_Id;
                    Original.PaisId = datos.Pais_Id;
                    Original.Nombre = datos.Region_Nombre;
                    Original.Observaciones = datos.Region_Observaciones;
                }
            }
            const ko = function (jqXHR, textStatus, errorThrown) {
                Dolf.Ventana.WarningModal('Países', jqXHR.responseJSON.Message);
            }

            return Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
        } else {
            return $.Deferred().resolve().promise();
        }
    }

    function pEditarRegistro(id, paisId, nombre, observaciones) {
        const url = '/Services/SvcPaises.svc/EditarRegion'
        const type = 'POST';
        const params = {
            region: {
                Region_Id: id,
                Pais_Id: paisId,
                Region_Nombre: nombre,
                Region_Observaciones: observaciones
            }
        }
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            $('#modalPaises').modal('hide');
            if (typeof AceptarCallback !== 'undefined') {
                AceptarCallback();
            }
        };
        const ko = function (jqXHR, textStatus, errorThrown) {
            Dolf.Ventana.WarningModal('Regiones', jqXHR.responseJSON.Message);
        };

        Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    function pNuevoRegistro(id, paisId, nombre, observaciones) {
        const url = '/Services/SvcPaises.svc/NuevaRegion'
        const type = 'POST';
        const params = {
            region: {
                Region_Id: id ? id : 0,
                Pais_Id: paisId,
                Region_Nombre: nombre,
                Region_Observaciones: observaciones
            }
        }
        const async = true;
        const ok = function (datos, textStatus, jqXHR) {
            $('#modalPaises').modal('hide');
            if (typeof AceptarCallback !== 'undefined') {
                AceptarCallback();
            }
        };
        const ko = function (jqXHR, textStatus, errorThrown) {
            Dolf.Ventana.WarningModal('Regiones', jqXHR.responseJSON.Message);
        };

        Dolf.Carga.EnviarDatos(url, type, params, async, ok, ko);
    }

    return {
        EstablecerAceptar: EstablecerAceptar,
        Mostrar: Mostrar
    }
})();
