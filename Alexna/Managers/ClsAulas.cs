using Alexna.Datos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Alexna.Managers
{
    public static class ClsAulas
    {
        public static alexnaDataContext db = new Datos.alexnaDataContext();

        public static bool BorraAula(int id)
        {
            var record = db.Aulas.Where(a => a.Aula_Id == id).First();
            db.Aulas.DeleteOnSubmit(record);
            db.SubmitChanges();
            return true;
        }

        public static Aulas DameAula(int id)
        {
            return db.Aulas.Where(a => a.Aula_Id == id).First();
        }

        public static List<Aulas> DameAulas()
        {
            try
            {
                return db.Aulas.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool ExisteAula(int id)
        {
            return db.Aulas.Where(a => a.Aula_Id == id).Count() > 0;
        }

        public static Aulas NuevaAula(Aulas aula)
        {
            db.Aulas.InsertOnSubmit(aula);
            db.SubmitChanges();
            return aula;
        }

        public static Aulas ModificarAula(Aulas aula)
        {
            if (ExisteAula(aula.Aula_Id))
            {
                var record = DameAula(aula.Aula_Id);
                record.Aula_Activa = aula.Aula_Activa;
                record.Aula_Nombre = aula.Aula_Nombre;
                record.Aula_Observaciones = aula.Aula_Observaciones;
                db.SubmitChanges();
                return record;
            }
            else
            {
                throw new Exception($"El aula {aula.Aula_Id} no existe en la base de datos.");
            }
        }
    }
}