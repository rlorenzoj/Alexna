using Alexna.Interfaces;
using System.Web;

namespace Alexna.Services
{
    public class Usuario : IUsuario
    {
        Alexna.Datos.Usuarios IUsuario.GetUserInfo()
        {
            return HttpContext.Current.Session["usuario"] != null ? (Alexna.Datos.Usuarios)HttpContext.Current.Session["usuario"] : null;
        }
    }
}
