using Alexna.Datos;
using Alexna.Interfaces;
using System.Collections.Generic;

namespace Alexna.Services
{
    public class SvcRegiones : IRegion
    {
        public bool BorrarRegion(int id)
        {
            return Managers.ClsRegiones.BorraRegion(id);
        }

        public Regiones EditarRegion(Regiones region)
        {
            return Managers.ClsRegiones.ModificarRegion(region);
        }

        public Regiones NuevaRegion(Regiones region)
        {
            return Managers.ClsRegiones.NuevaRegion(region);
        }

        public List<Regiones> ObtenerListado()
        {
            return Managers.ClsRegiones.DameRegiones();
        }

        public Regiones ObtenerRegion(int id)
        {
            return Managers.ClsRegiones.DameRegion(id);
        }
    }
}
