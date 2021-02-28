using Alexna.Datos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Alexna.Managers
{
    public class ClsVacaciones
    {
        public static alexnaDataContext db = new Datos.alexnaDataContext();

        public static bool BorraVacacion(int id)
        {
            var record = db.Vacaciones.Where(v => v.Vacacion_Id == id).First();
            db.Vacaciones.DeleteOnSubmit(record);
            db.SubmitChanges();
            return true;
        }

        public static Vacaciones DameVacacion(int id)
        {
            return db.Vacaciones.Where(v => v.Vacacion_Id == id).First();
        }

        public static List<Vacaciones> DameVacaciones()
        {
            try
            {
                return db.Vacaciones.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool ExisteVacacion(int id)
        {
            return db.Vacaciones.Where(v => v.Vacacion_Id == id).Count() > 0;
        }

        public static Vacaciones NuevaVacacion(Vacaciones vacacion)
        {
            db.Vacaciones.InsertOnSubmit(vacacion);
            db.SubmitChanges();
            return vacacion;
        }

        public static Vacaciones ModificarVacacion(Vacaciones vacacion)
        {
            if (ExisteVacacion(vacacion.Vacacion_Id))
            {
                var record = DameVacacion(vacacion.Vacacion_Id);
                record.Vacacion_Fecha_Fin = vacacion.Vacacion_Fecha_Fin;
                record.Vacacion_Fecha_Inicio = vacacion.Vacacion_Fecha_Inicio;
                record.Vacacion_Nombre = vacacion.Vacacion_Nombre;
                record.Vacacion_Observaciones = vacacion.Vacacion_Observaciones;
                db.SubmitChanges();
                return record;
            }
            else
            {
                throw new Exception($"Las vacaciones {vacacion.Vacacion_Id} no existe en la base de datos.");
            }
        }
    }
}