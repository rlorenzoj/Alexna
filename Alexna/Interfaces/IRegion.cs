using Alexna.Datos;
using System;
using System.Collections.Generic;
using System.ServiceModel;

namespace Alexna.Interfaces
{
    [ServiceContract]
    interface IRegion
    {
        [OperationContract]
        bool BorrarRegion(int id);

        [OperationContract]
        Regiones EditarRegion(Regiones region);

        [OperationContract]
        Regiones NuevaRegion(Regiones region);

        [OperationContract]
        Regiones ObtenerRegion(int id);

        [OperationContract]
        List<Regiones> ObtenerListado();
    }
}
