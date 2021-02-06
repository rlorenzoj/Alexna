using System.ServiceModel;

namespace Alexna.Interfaces
{
    [ServiceContract]
    interface IUsuario
    {
        [OperationContract]
        Alexna.Datos.Usuarios GetUserInfo();
    }
}
