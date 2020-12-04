using System;
using System.Web;

namespace Alexna.Managers
{
    public static class Login
    {
        #region "Métodos públicos"
        public static bool DoLogin(string usuario, string contrasena)
        {
            if (string.IsNullOrWhiteSpace(usuario))
            {
                HttpContext.Current.Session.Clear();
                throw new Exception("No se ha indicado el usuario.");
            }
            else if (string.IsNullOrWhiteSpace(contrasena))
            {
                HttpContext.Current.Session.Clear();
                throw new Exception("No se ha indicado la contraseña.");
            }
            else
            {
                if (usuario == "admin" && contrasena == "admin")
                {
                    // Almacenamos el usuario en la sesión.
                    HttpContext.Current.Session["usuario"] = usuario;
                    return true;
                }
                else
                {
                    HttpContext.Current.Session.Clear();
                    return false;
                }
            }
        }
        #endregion

        #region "Métodos privados"
        #endregion
    }
}