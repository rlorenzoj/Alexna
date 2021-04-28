using Alexna.Datos;
using System;
using System.Collections.Generic;
using System.ServiceModel;

namespace Alexna.Interfaces
{
    [ServiceContract]
    interface IAsignatura
    {
        [OperationContract]
        bool BorrarAsignatura(int id);

        [OperationContract]
        Asignaturas EditarAsignatura(Asignaturas asignatura);

        [OperationContract]
        Asignaturas NuevaAsignatura(Asignaturas asignatura);

        [OperationContract]
        Asignaturas ObtenerAsignatura(int id);

        [OperationContract]
        List<Asignaturas> ObtenerListado();

        [OperationContract]
        List<Asignaturas> ObtenerListadoActivos();
    }
}
