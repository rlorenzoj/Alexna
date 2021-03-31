using Alexna.Datos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Alexna.Managers
{
    public class ClsRegiones : AbsGestores
    {
        public static bool BorraRegion(int id)
        {
            var record = db.Regiones.Where(r => r.Region_Id == id).First();
            db.Regiones.DeleteOnSubmit(record);
            db.SubmitChanges();
            return true;
        }

        public static Regiones DameRegion(int id)
        {
            return db.Regiones.Where(r => r.Region_Id == id).First();
        }

        public static List<Regiones> DameRegiones()
        {
            try
            {
                return db.Regiones.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool ExisteRegion(int id)
        {
            return db.Regiones.Where(r => r.Region_Id == id).Count() > 0;
        }

        public static Regiones NuevaRegion(Regiones region)
        {
            db.Regiones.InsertOnSubmit(region);
            db.SubmitChanges();
            return region;
        }

        public static Regiones ModificarRegion(Regiones region)
        {
            if (ExisteRegion(region.Region_Id))
            {
                var record = DameRegion(region.Region_Id);
                record.Region_Nombre = region.Region_Nombre;
                record.Region_Observaciones = region.Region_Observaciones;
                db.SubmitChanges();
                return record;
            }
            else
            {
                throw new Exception($"La región {region.Region_Id} no existe en la base de datos.");
            }
        }
    }
}