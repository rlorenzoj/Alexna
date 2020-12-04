using Alexna.Interfaces;
using System.Web;

namespace Alexna.Services
{
    public class Usuario : Interfaces.IUsuario
    {
        string IUsuario.GetUserInfo()
        {
            return HttpContext.Current.Session["usuario"] != null ? HttpContext.Current.Session["usuario"].ToString() : null;
        }
    }
}
