using Alexna.Datos;
using Alexna.Interfaces;
using System;
using System.Collections.Generic;

namespace Alexna.Services
{
    public class SvcFestivos : IFestivo
    {
        public bool BorrarFestivo(DateTime fecha)
        {
            return Managers.ClsFestivos.DeleteFestivo(fecha);
        }

        public Festivos EditarFestivo(Festivos festivo)
        {
            return Managers.ClsFestivos.ModifyFestivo(festivo);
        }

        public Festivos GetFestivo(DateTime fecha)
        {
            return Managers.ClsFestivos.GetFestivo(fecha);
        }

        public List<Festivos> GetListado(int? ano)
        {
            return Managers.ClsFestivos.GetFestivos(null);
        }

        public Festivos NuevoFestivo(Festivos festivo)
        {
            return Managers.ClsFestivos.NewFestivo(festivo);
        }
    }
}
