using Alexna.Datos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Alexna.Managers
{
    public static class ClsAsignaturas
    {
        public static alexnaDataContext db = new Datos.alexnaDataContext();

        public static bool BorraAsignatura(int id)
        {
            var record = db.Asignaturas.Where(a => a.Asignatura_Id == id).First();
            db.Asignaturas.DeleteOnSubmit(record);
            db.SubmitChanges();
            return true;
        }

        public static Asignaturas DameAsignatura(int id)
        {
            return db.Asignaturas.Where(a => a.Asignatura_Id == id).First();
        }

        public static List<Asignaturas> DameAsignaturas()
        {
            try
            {
                return db.Asignaturas.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool ExisteAsignatura(int id)
        {
            return db.Asignaturas.Where(a => a.Asignatura_Id == id).Count() > 0;
        }

        public static Asignaturas NuevaAsignatura(Asignaturas asignatura)
        {
            db.Asignaturas.InsertOnSubmit(asignatura);
            db.SubmitChanges();
            return asignatura;
        }

        public static Asignaturas ModificarAsignatura(Asignaturas asignatura)
        {
            if (ExisteAsignatura(asignatura.Asignatura_Id))
            {
                var record = DameAsignatura(asignatura.Asignatura_Id);
                record.Asignatura_Activa = asignatura.Asignatura_Activa;
                record.Asignatura_Fecha_Fin = asignatura.Asignatura_Fecha_Fin;
                record.Asignatura_Fecha_Inicio = asignatura.Asignatura_Fecha_Inicio;
                record.Asignatura_Nombre = asignatura.Asignatura_Nombre;
                record.Asignatura_Observaciones = asignatura.Asignatura_Observaciones;
                db.SubmitChanges();
                return record;
            }
            else
            {
                throw new Exception($"La asignatura {asignatura.Asignatura_Id} no existe en la base de datos.");
            }
        }
    }
}