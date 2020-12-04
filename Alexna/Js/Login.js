var Login = (function () {
    "use strict";

    function Inicio() {
        // Click events
        $('#btnLogin').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            let username = $('#username').val();
            let password = $('#password').val();

            if (!username) {
                Dolf.Ventana.WarningModal('Login', 'Por favor, introduzca el usuario.');
            } else if (!password) {
                Dolf.Ventana.WarningModal('Login', 'Por favor, introduzca la contraseña.');
            } else {
                pValidar(username, password);
            }
        });
    }

    function pValidar(usuario, contrasena) {
        const url = '/Services/Login.svc/DoLogin';
        const type = 'POST';
        const param = {
            usuario: usuario,
            contrasena: contrasena
        };
        const async = true;
        const ok = function (data) {
            if (data === true) {
                window.location = '/Paginas/Inicio.aspx';
            } else {
                Dolf.Ventana.WarningModal('Login', 'El usuario / contraseña introducidos no son correctos.');
            }
        }
        const ko = function (jqXHR, textStatus, errorThrown) {
            let message = jqXHR.statusText || 'Error sin definir en la llamada a login';
            Dolf.Ventana.DangerModal('Login', message);
        }
        return Dolf.Carga.EnviarDatos(url, type, param, async, ok, ko);
    }

    return {
        Inicio: Inicio
    }
})();

$(document).ready(function () {
    Login.Inicio();
})