var Principal = (function () {
    return function () {
        "use strict";

        function pGetUser() {
            const url = '/Services/Usuario.svc/GetUserInfo';
            const type = 'POST';
            const param = {};
            const async = true;
            const ok = function (data) {
                if (data) {
                    // Configuramos el menú
                    if (!data.alumno) {
                        $('#alumnos').remove();
                    }
                    if (!data.profesor) {
                        $('#profesores').remove();
                    }
                    if (!data.alumno && !data.profesor && !data.administrador) {
                        $('#clases').remove();
                    }
                    if (!data.mantenimiento && !data.administrador) {
                        $('#tablasAuxiliares').remove();
                    }
                } else {
                    // No user data.
                    window.location = 'login.html';
                }
            }
            const ko = function (jqXHR, textStatus, errorThrown) {
                let message = jqXHR.statusText || 'Error sin definir en la llamada a login';
                const callback = function () {
                    window.location = 'login.html';
                }
                Dolf.Ventana.DangerModal('Login', message, callback);
            }
            return Dolf.Carga.EnviarDatos(url, type, param, async, ok, ko);
        }

        function Start() {
            // Check Session
            pGetUser().done(function () {
                // Set window select option
                (function () {
                    const page = document.location.pathname.match(/[^\/]+$/)[0];
                    $('li.nav-item').removeClass('active');
                    $('li.nav-item a.nav-link[href="' + page.toLowerCase() + '"]').closest('li').addClass('active');
                })();

                // Check if Init function exists.
                (function () {
                    if (typeof Inicio === 'function') {
                        Inicio();
                    }
                })();
            });
        }

        return {
            Start: Start
        }
    }
})();
Principal = Principal();

$(document).ready(function () {
    Principal.Start();
});