using Alexna.Datos;
using System;
using System.Collections.Generic;
using System.ServiceModel;

namespace Alexna.Interfaces
{
    [ServiceContract]
    interface ICurso
    {
        [OperationContract]
        bool BorrarCurso(int id);

        [OperationContract]
        Cursos EditarCurso(Cursos curso);

        [OperationContract]
        Cursos NuevoCurso(Cursos curso);

        [OperationContract]
        Cursos ObtenerCurso(int id);

        [OperationContract]
        List<Cursos> ObtenerListado();

        [OperationContract]
        List<Cursos> ObtenerListadoActivos();
    }
}
