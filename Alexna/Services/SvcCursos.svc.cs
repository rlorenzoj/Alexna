using Alexna.Datos;
using Alexna.Interfaces;
using System;
using System.Collections.Generic;

namespace Alexna.Services
{
    public class SvcCursos : ICurso
    {
        public bool BorrarCurso(int id)
        {
            return Managers.ClsCursos.BorraCurso(id);
        }

        public Cursos EditarCurso(Cursos curso)
        {
            return Managers.ClsCursos.ModificarCurso(curso);
        }

        public Cursos NuevoCurso(Cursos curso)
        {
            return Managers.ClsCursos.NuevoCurso(curso);
        }

        public Cursos ObtenerCurso(int id)
        {
            return Managers.ClsCursos.DameCurso(id);
        }

        public List<Cursos> ObtenerListado()
        {
            return Managers.ClsCursos.DameCursos();
        }
    }
}
