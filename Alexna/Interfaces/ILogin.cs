using System.ServiceModel;

namespace Alexna.Interfaces
{
    [ServiceContract]
    interface ILogin
    {
        [OperationContract]
        Alexna.Datos.Usuarios DoLogin(string usuario, string contrasena);
    }
}
