using System.ServiceModel;

namespace Alexna.Interfaces
{
    [ServiceContract]
    interface ILogin
    {
        [OperationContract]
        bool DoLogin(string usuario, string contrasena);
    }
}
