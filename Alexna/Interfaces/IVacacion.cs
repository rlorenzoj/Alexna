using Alexna.Datos;
using System;
using System.Collections.Generic;
using System.ServiceModel;

namespace Alexna.Interfaces
{
    [ServiceContract]
    interface IVacacion
    {
        [OperationContract]
        bool BorrarVacacion(int id);

        [OperationContract]
        Vacaciones EditarVacacion(Vacaciones vacacion);

        [OperationContract]
        Vacaciones NuevaVacacion(Vacaciones vacacion);

        [OperationContract]
        Vacaciones ObtenerVacacion(int id);

        [OperationContract]
        List<Vacaciones> ObtenerListado();
    }
}
