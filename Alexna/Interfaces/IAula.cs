using Alexna.Datos;
using System;
using System.Collections.Generic;
using System.ServiceModel;

namespace Alexna.Interfaces
{
    [ServiceContract]
    interface IAula
    {
        [OperationContract]
        bool BorrarAula(int id);

        [OperationContract]
        Aulas EditarAula(Aulas aula);

        [OperationContract]
        Aulas NuevaAula(Aulas aula);

        [OperationContract]
        Aulas ObtenerAula(int id);

        [OperationContract]
        List<Aulas> ObtenerListado();
    }
}
