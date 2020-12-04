using System.ServiceModel;

namespace Alexna.Interfaces
{
    [ServiceContract]
    interface IUsuario
    {
        [OperationContract]
        string GetUserInfo();
    }
}
