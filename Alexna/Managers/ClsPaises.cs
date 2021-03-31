using Alexna.Datos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Alexna.Managers
{
    public class ClsPaises
    {
        public static alexnaDataContext db = new Datos.alexnaDataContext();

        public static bool BorraPais(int id)
        {
            var regiones = ClsRegiones.DameRegiones().Where(r => r.Pais_Id == id).ToList();
            if (regiones is null || regiones.Count == 0)
            {
                var record = db.Paises.Where(p => p.Pais_Id == id).First();
                db.Paises.DeleteOnSubmit(record);
                db.SubmitChanges();
                return true;
            } else
            {
                throw new Exception("No se puede borrar el país, ya que tiene regiones asociadas.");
            }
        }

        public static Paises DamePais(int id)
        {
            return db.Paises.Where(p => p.Pais_Id == id).First();
        }

        public static List<Paises> DamePaises()
        {
            try
            {
                return db.Paises.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool ExistePais(int id)
        {
            return db.Paises.Where(p => p.Pais_Id == id).Count() > 0;
        }

        public static Paises NuevoPais(Paises pais)
        {
            db.Paises.InsertOnSubmit(pais);
            db.SubmitChanges();
            return pais;
        }

        public static Paises ModificarPais(Paises pais)
        {
            if (ExistePais(pais.Pais_Id))
            {
                var record = DamePais(pais.Pais_Id);
                record.Pais_Nombre = pais.Pais_Nombre;
                record.Pais_Observaciones = pais.Pais_Observaciones;
                db.SubmitChanges();
                return record;
            }
            else
            {
                throw new Exception($"El país {pais.Pais_Id} no existe en la base de datos.");
            }
        }
    }
}