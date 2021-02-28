using Alexna.Datos;
using System;
using System.Collections.Generic;
using System.ServiceModel;

namespace Alexna.Interfaces
{
    [ServiceContract]
    interface IPersona
    {
        [OperationContract]
        bool BorrarPersona(int id);

        [OperationContract]
        Personas EditarPersona(Personas persona);

        [OperationContract]
        Personas NuevaPersona(Personas persona);

        [OperationContract]
        Personas ObtenerPersona(int id);

        [OperationContract]
        List<Personas> ObtenerListado();
    }
}
