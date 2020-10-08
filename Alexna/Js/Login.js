let Login = (function () {
    "use strict";

    function Inicio() {
        // Click events
        $('#btnLogin').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            let username = $('#username').val();
            let password = $('#password').val();

            if (!username) {
                //TODO: No se ha introducido el usuario.
            } else if (!password) {
                //TODO: No se ha introducido la contraseña.
            } else {
                //TODO: Validar usuario.
            }
        });
    }

    function pValidar(usuario, contrasena) {
        //TODO: Comprobar usuario y contraseña.
    }

    return {
        Inicio: Inicio
    }
})();