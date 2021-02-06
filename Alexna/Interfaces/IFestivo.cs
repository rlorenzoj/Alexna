using Alexna.Datos;
using System;
using System.Collections.Generic;
using System.ServiceModel;

namespace Alexna.Interfaces
{
    [ServiceContract]
    interface IFestivo
    {
        [OperationContract]
        bool BorrarFestivo(DateTime fecha);

        [OperationContract]
        Festivos EditarFestivo(Festivos festivo);

        [OperationContract]
        Festivos GetFestivo(DateTime fecha);

        [OperationContract]
        List<Festivos> GetListado(int? ano);

        [OperationContract]
        Festivos NuevoFestivo(Festivos festivo);
    }
}
