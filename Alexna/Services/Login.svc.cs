using Alexna.Interfaces;

namespace Alexna.Services
{
    public class Login : ILogin
    {
        public bool DoLogin(string usuario, string contrasena)
        {
            return Managers.Login.DoLogin(usuario, contrasena);
        }
    }
}
