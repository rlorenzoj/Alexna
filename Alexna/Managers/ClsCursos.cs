using Alexna.Datos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Alexna.Managers
{
    public static class ClsCursos
    {
        public static alexnaDataContext db = new Datos.alexnaDataContext();

        public static bool BorraCurso(int id)
        {
            var record = db.Cursos.Where(c => c.Curso_Id == id).First();
            db.Cursos.DeleteOnSubmit(record);
            db.SubmitChanges();
            return true;
        }

        public static Cursos DameCurso(int id)
        {
            return db.Cursos.Where(c => c.Curso_Id == id).First();
        }

        public static List<Cursos> DameCursos()
        {
            try
            {
                return db.Cursos.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static List<Cursos> DameCursosActivos()
        {
            try
            {
                return db.Cursos.Where(c => c.Curso_Activo).OrderByDescending(c => c.Curso_Fecha_Inicio).ThenByDescending(c => c.Curso_Fecha_Fin).ThenBy(c => c.Curso_Nombre).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool ExisteCurso(int id)
        {
            return db.Cursos.Where(c => c.Curso_Id == id).Count() > 0;
        }

        public static Cursos NuevoCurso(Cursos curso)
        {
            db.Cursos.InsertOnSubmit(curso);
            db.SubmitChanges();
            return curso;
        }

        public static Cursos ModificarCurso(Cursos curso)
        {
            if (ExisteCurso(curso.Curso_Id))
            {
                var record = DameCurso(curso.Curso_Id);
                record.Curso_Activo = curso.Curso_Activo;
                record.Curso_Fecha_Fin = curso.Curso_Fecha_Fin;
                record.Curso_Fecha_Inicio = curso.Curso_Fecha_Inicio;
                record.Curso_Nombre = curso.Curso_Nombre;
                record.Curso_Observaciones = curso.Curso_Observaciones;
                db.SubmitChanges();
                return record;
            }
            else
            {
                throw new Exception($"El curso {curso.Curso_Id} no existe en la base de datos.");
            }
        }
    }
}