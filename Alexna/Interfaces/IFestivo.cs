using Alexna.Datos;
using System.Collections.Generic;
using System.ServiceModel;

namespace Alexna.Interfaces
{
    [ServiceContract]
    interface IFestivo
    {
        [OperationContract]
        List<Festivos> GetListado(int? ano);
    }
}
