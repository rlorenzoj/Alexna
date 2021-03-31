using Alexna.Datos;
using System;
using System.Collections.Generic;
using System.ServiceModel;

namespace Alexna.Interfaces
{
    [ServiceContract]
    interface IPais
    {
        [OperationContract]
        bool BorrarPais(int id);

        [OperationContract]
        Paises EditarPais(Paises pais);

        [OperationContract]
        Paises NuevoPais(Paises pais);

        [OperationContract]
        Paises ObtenerPais(int id);

        [OperationContract]
        List<Paises> ObtenerListado();
    }
}
