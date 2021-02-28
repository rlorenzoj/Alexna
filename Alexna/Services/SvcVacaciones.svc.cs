using Alexna.Datos;
using Alexna.Interfaces;
using System;
using System.Collections.Generic;

namespace Alexna.Services
{
    public class SvcVacaciones : IVacacion
    {
        public bool BorrarVacacion(int id)
        {
            return Managers.ClsVacaciones.BorraVacacion(id);
        }

        public Vacaciones EditarVacacion(Vacaciones vacacion)
        {
            return Managers.ClsVacaciones.ModificarVacacion(vacacion);
        }

        public Vacaciones NuevaVacacion(Vacaciones vacacion)
        {
            return Managers.ClsVacaciones.NuevaVacacion(vacacion);
        }

        public Vacaciones ObtenerVacacion(int id)
        {
            return Managers.ClsVacaciones.DameVacacion(id);
        }

        public List<Vacaciones> ObtenerListado()
        {
            return Managers.ClsVacaciones.DameVacaciones();
        }
    }
}
