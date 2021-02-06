using Alexna.Interfaces;

namespace Alexna.Services
{
    public class Login : ILogin
    {
        public Alexna.Datos.Usuarios DoLogin(string usuario, string contrasena)
        {
            return Managers.Login.DoLogin(usuario, contrasena);
        }
    }
}
