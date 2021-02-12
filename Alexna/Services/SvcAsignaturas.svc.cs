using Alexna.Datos;
using Alexna.Interfaces;
using System.Collections.Generic;

namespace Alexna.Services
{
    public class SvcAsignaturas : IAsignatura
    {
        public bool BorrarAsignatura(int id)
        {
            return Managers.ClsAsignaturas.BorraAsignatura(id);
        }

        public Asignaturas EditarAsignatura(Asignaturas asignatura)
        {
            return Managers.ClsAsignaturas.ModificarAsignatura(asignatura);
        }

        public Asignaturas NuevaAsignatura(Asignaturas asignatura)
        {
            return Managers.ClsAsignaturas.NuevaAsignatura(asignatura);
        }

        public Asignaturas ObtenerAsignatura(int id)
        {
            return Managers.ClsAsignaturas.DameAsignatura(id);
        }

        public List<Asignaturas> ObtenerListado()
        {
            return Managers.ClsAsignaturas.DameAsignaturas();
        }
    }
}
