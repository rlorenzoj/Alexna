using Alexna.Datos;
using Alexna.Interfaces;
using System.Collections.Generic;

namespace Alexna.Services
{
    public class SvcPaises : IPais
    {
        public bool BorrarPais(int id)
        {
            return Managers.ClsPaises.BorraPais(id);
        }

        public Paises EditarPais(Paises pais)
        {
            return Managers.ClsPaises.ModificarPais(pais);
        }

        public Paises NuevoPais(Paises pais)
        {
            return Managers.ClsPaises.NuevoPais(pais);
        }

        public Paises ObtenerPais(int id)
        {
            return Managers.ClsPaises.DamePais(id);
        }

        public List<Paises> ObtenerListado()
        {
            return Managers.ClsPaises.DamePaises();
        }
    }
}
