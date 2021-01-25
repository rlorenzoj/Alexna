using Alexna.Datos;
using Alexna.Interfaces;
using System.Collections.Generic;

namespace Alexna.Services
{
    public class SvcFestivos : IFestivo
    {
        public List<Festivos> GetListado(int? ano)
        {
            return Managers.ClsFestivos.GetFestivos(null);
        }
    }
}
