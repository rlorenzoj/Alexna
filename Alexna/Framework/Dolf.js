var Dolf = (function () {
    "use strict";

    const AutorVersion = 'Rafael Lorenzo Jiménez';
    const FechaVersion = '08 de octubre de 2020';
    const Version = '1.0.0';

    const mCarga = (function () {
        function EnviarDatos(url, type, params, async, callback_ok, callback_ko) {
            async = typeof async !== 'undefined' ? async : true;
            type = type || 'POST';
            params = typeof params !== 'undefined' ? JSON.stringify(params) : '';
            if (typeof callback_ok !== 'undefined') {
                if (typeof callback_ok !== 'function') {
                    callback_ok = Function(callback_ok);
                }
            }
            if (typeof callback_ko !== 'undefined') {
                if (typeof callback_ko !== 'function') {
                    callback_ko = Function(callback_ko);
                }
            }

            if (url) {
                return $.ajax({
                    'url': url,
                    'async': async,
                    'type': type,
                    'data': params,
                    dataType: 'json',
                    crossDomain: true,
                    xhrFields: {
                        withCredentials: true
                    },
                    contentType: 'application/json; charset=utf-8'
                }).done(function (data, textStatus, jqXHR) {
                    if (typeof callback_ko === 'function') {
                        callback_ok(data ? data.d : undefined, textStatus, jqXHR);
                    }
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    if (typeof callback_ko === 'function') {
                        callback_ko(jqXHR, textStatus, errorThrown);
                    }
                });
            } else {
                throw new error('Carga - EnviarDatos: No se ha indicado la url destino.');
            }
        }

        return {
            EnviarDatos: EnviarDatos
        }
    })();

    const mVentana = (function () {
        function DangerModal(title, message, callback) {
            if (typeof callback !== 'undefined') {
                if (typeof callback !== 'function') {
                    callback = new Function(callback);
                }
            }
            const action = function () {
                $('#centralModalDanger').modal('hide');
                if (typeof callback === 'function') {
                    callback();
                }
            }

            const $modalDiv = $('<div class="modal fade" id="centralModalDanger" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>');
            const $div2 = $('<div class="modal-dialog modal-notify modal-danger" role="document">');
            const $divContent = $('<div class="modal-content"></div>');

            const $divHeader = $('<div class="modal-header"></div>');
            const $pHeader = $('<p class="heading lead"></p>');
            if (typeof title !== 'undefined') {
                $pHeader.html(title);
            }
            const $closeX = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>');
            $closeX.on('click', action);

            const $divBody = $('<div class="modal-body"></div>');
            const $divText = $('<div class="text-center"></div>');
            const $icon = $('<i class="fas fa-times fa-4x mb-3 animated rotateIn"></i>');
            const $pText = $('<p></p>');
            if (typeof message !== 'undefined') {
                $pText.html(message);
            }

            const $divFooter = $('<div class="modal-footer justify-content-center"></div>');
            const $aButton = $('<a type="button" class="btn btn-outline-danger waves-effect" data-dismiss="modal">Aceptar</a>');
            $aButton.on('click', action);

            $('body').append($modalDiv);
            $($modalDiv).append($div2);
            $($div2).append($divContent);
            $($divContent).append($divHeader);
            $($divHeader).append($pHeader);
            $($divHeader).append($closeX);
            $($divContent).append($divBody);
            $($divBody).append($divText);
            $($divText).append($icon);
            $($divText).append($pText);
            $($divContent).append($divFooter);
            $($divFooter).append($aButton);

            $('#centralModalDanger').modal('show');
        }

        function InfoModal(title, message, callback) {
            if (typeof callback !== 'undefined') {
                if (typeof callback !== 'function') {
                    callback = new Function(callback);
                }
            }
            const action = function () {
                $('#centralModalInfo').modal('hide');
                if (typeof callback === 'function') {
                    callback();
                }
            }

            const $modalDiv = $('<div class="modal fade" id="centralModalInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>');
            const $div2 = $('<div class="modal-dialog modal-notify modal-info" role="document"></div>');
            const $divContent = $('<div class="modal-content"></div>');

            const $divHeader = $('<div class="modal-header"></div>');
            const $pHeader = $('<p class="heading lead"></p>');
            if (typeof title !== 'undefined') {
                $pHeader.html(title);
            }
            const $closeX = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>');
            $closeX.on('click', action);

            const $divBody = $('<div class="modal-body"></div>');
            const $divText = $('<div class="text-center"></div>');
            const $icon = $('<i class="fas fa-info fa-4x mb-3 animated rotateIn"></i>');
            const $pText = $('<p></p>');
            if (typeof message !== 'undefined') {
                $pText.html(message);
            }

            const $divFooter = $('<div class="modal-footer justify-content-center"></div>');
            const $aButton = $('<a type="button" class="btn btn-outline-info waves-effect" data-dismiss="modal">Aceptar</a>');
            $aButton.on('click', action);

            $('body').append($modalDiv);
            $($modalDiv).append($div2);
            $($div2).append($divContent);
            $($divContent).append($divHeader);
            $($divHeader).append($pHeader);
            $($divHeader).append($closeX);
            $($divContent).append($divBody);
            $($divBody).append($divText);
            $($divText).append($icon);
            $($divText).append($pText);
            $($divContent).append($divFooter);
            $($divFooter).append($aButton);

            $('#centralModalInfo').modal('show');
        }

        function Loading(message) {
            const $modalDiv = $('<div id="loadingModal" class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1"></div>');
            const $divPrincipal = $('<div class="modal-dialog modal-sm" role="document"></div>');
            const $divContenido = $('<div class="modal-content"></div>');
            const spinner = $('<span class="fa fa-spinner fa-spin fa-3x"></span>');
            if (message) {
                const $spanTexto = $('<span>' + message + '</span>')
                $divContenido.append($spanTexto);
            }

            $divContenido.prepend(spinner);
            $divPrincipal.append($divContenido);
            $modalDiv.append($divPrincipal);
            $('body').append($modalDiv);
            $('#loadingModal').modal('show');
        }

        function QuestionModal(title, message, callback, cancelcallback) {
            if (typeof callback !== 'undefined') {
                if (typeof callback !== 'function') {
                    callback = new Function(callback);
                }
            }
            const action = function () {
                $('#centralModalInfo').modal('hide');
                if (typeof callback === 'function') {
                    callback();
                }
            }

            if (typeof cancelcallback !== 'undefined') {
                if (typeof cancelcallback !== 'function') {
                    cancelcallback = new Function(cancelcallback);
                }
            }
            const actionCancel = function () {
                $('#centralModalInfo').modal('hide');
                if (typeof cancelcallback === 'function') {
                    cancelcallback();
                }
            }

            const $modalDiv = $('<div class="modal fade" id="centralModalInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>');
            const $div2 = $('<div class="modal-dialog modal-notify modal-info" role="document"></div>');
            const $divContent = $('<div class="modal-content"></div>');

            const $divHeader = $('<div class="modal-header"></div>');
            const $pHeader = $('<p class="heading lead"></p>');
            if (typeof title !== 'undefined') {
                $pHeader.html(title);
            }
            const $closeX = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>');
            $closeX.on('click', action);

            const $divBody = $('<div class="modal-body"></div>');
            const $divText = $('<div class="text-center"></div>');
            const $icon = $('<i class="fas fa-question fa-4x mb-3 animated rotateIn"></i>');
            const $pText = $('<p></p>');
            if (typeof message !== 'undefined') {
                $pText.html(message);
            }

            const $divFooter = $('<div class="modal-footer justify-content-center"></div>');
            const $aButton = $('<a type="button" class="btn btn-outline-info waves-effect" data-dismiss="modal">Aceptar</a>');
            $aButton.on('click', action);
            const $cancelButton = $('<a type="button" class="btn btn-outline-info waves-effect ml-3" data-dismiss="modal">Cancelar</a>');
            $cancelButton.on('click', actionCancel);

            $('body').append($modalDiv);
            $($modalDiv).append($div2);
            $($div2).append($divContent);
            $($divContent).append($divHeader);
            $($divHeader).append($pHeader);
            $($divHeader).append($closeX);
            $($divContent).append($divBody);
            $($divBody).append($divText);
            $($divText).append($icon);
            $($divText).append($pText);
            $($divContent).append($divFooter);
            $($divFooter).append($aButton);
            $($divFooter).append($cancelButton);

            $('#centralModalInfo').modal('show');
        }

        function SuccessModal(title, message, callback) {
            if (typeof callback !== 'undefined') {
                if (typeof callback !== 'function') {
                    callback = new Function(callback);
                }
            }
            const action = function () {
                $('#centralModalSuccess').modal('hide');
                if (typeof callback === 'function') {
                    callback();
                }
            }

            const $modalDiv = $('<div class="modal fade" id="centralModalSuccess" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>');
            const $div2 = $('<div class="modal-dialog modal-notify modal-success" role="document"></div>');
            const $div3 = $('<div class="modal-content"></div>');

            const $divHeader = $('<div class="modal-header"></div>');
            const $pHeader = $('<p class="heading lead"></p>');
            if (typeof title !== 'undefined') {
                $pHeader.html(title);
            }
            const $closeX = $('<button type="button" class="close" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>');
            $closeX.on('click', action);

            const $divBody = $('<div class="modal-body"></div>');
            const $divBody1 = $('<div class="text-center"></div>');
            const $icon = $('<i class="fas fa-check fa-4x mb-3 animated rotateIn"></i>');
            const $pText = $('<p></p>');
            if (typeof message !== 'undefined') {
                $pText.html(message);
            }

            const $divFooter = $('<div class="modal-footer justify-content-center"></div>');
            const $aButton = $('<a type="button" class="btn btn-outline-success waves-effect">Aceptar</a>');
            $aButton.on('click', action);

            $modalDiv.append($div2);
            $div2.append($div3);
            $div3.append($divHeader);
            $divHeader.append($pHeader);
            $divHeader.append($closeX);
            $div3.append($divBody);
            $divBody.append($divBody1);
            $divBody1.append($icon);
            $divBody1.append($pText);
            $div3.append($divFooter);
            $divFooter.append($aButton);

            $('body').append($modalDiv);

            $('#centralModalSuccess').modal('show');
        }

        function WarningModal(title, message, callback) {
            if (typeof callback !== 'undefined') {
                if (typeof callback !== 'function') {
                    callback = new Function(callback);
                }
            }
            const action = function () {
                $('#centralModalWarning').modal('hide');
                if (typeof callback === 'function') {
                    callback();
                }
            }

            const $modalDiv = $('<div class="modal fade" id="centralModalWarning" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"></div>');
            const $div2 = $('<div class="modal-dialog modal-notify modal-warning" role="document"></div>');
            const $div3 = $('<div class="modal-content"></div>');

            const $divHeader = $('<div class="modal-header"></div>');
            const $pHeader = $('<p class="heading lead"></p>');
            if (typeof title !== 'undefined') {
                $pHeader.html(title);
            }
            const $closeX = $('<button type="button" class="close" aria-label="Close"><span aria-hidden="true" class="white-text">&times;</span></button>');
            $closeX.on('click', action);

            const $divBody = $('<div class="modal-body"></div>');
            const $divBody1 = $('<div class="text-center"></div>');
            const $icon = $('<i class="fas fa-exclamation fa-4x mb-3 animated rotateIn"></i>');
            const $pText = $('<p></p>');
            if (typeof message !== 'undefined') {
                $pText.html(message);
            }

            const $divFooter = $('<div class="modal-footer justify-content-center"></div>');
            const $aButton = $('<a type="button" class="btn btn-outline-warning waves-effect">Aceptar</a>');
            $aButton.on('click', action);

            $modalDiv.append($div2);
            $div2.append($div3);
            $div3.append($divHeader);
            $divHeader.append($pHeader);
            $divHeader.append($closeX);
            $div3.append($divBody);
            $divBody.append($divBody1);
            $divBody1.append($icon);
            $divBody1.append($pText);
            $div3.append($divFooter);
            $divFooter.append($aButton);

            $('body').append($modalDiv);

            $('#centralModalWarning').modal('show');
        }

        return {
            DangerModal: DangerModal,
            InfoModal: InfoModal,
            Loading: Loading,
            QuestionModal: QuestionModal,
            SuccessModal: SuccessModal,
            WarningModal: WarningModal
        }
    })();

    return {
        AutorVersion: function () { return AutorVersion; },
        Carga: mCarga,
        FechaVersion: function () { return FechaVersion; },
        Ventana: mVentana,
        Version: function () { return Version; }
    }
})();