﻿using Alexna.Datos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Alexna.Managers
{
    public static class ClsFestivos
    {
        public static alexnaDataContext db = new Datos.alexnaDataContext();

        public static bool DeleteFestivo(DateTime fecha)
        {
            var record = db.Festivos.Where(f => f.Festivo_Fecha.Date == fecha).First();
            db.Festivos.DeleteOnSubmit(record);
            db.SubmitChanges();
            return true;
        }

        public static Festivos GetFestivo(DateTime fecha)
        {
            return db.Festivos.Where(f => f.Festivo_Fecha.Date == fecha).First();
        }

        public static List<Festivos> GetFestivos(int? year)
        {
            try
            {
                return (from f in db.Festivos
                        where year == null || f.Festivo_Fecha.Year == year
                        select f).ToList();
            } catch(Exception ex)
            {
                throw ex;
            }
        }

        public static bool IsFestivo(DateTime fecha)
        {
            return db.Festivos.Where(f => f.Festivo_Fecha.Date == fecha).Count() > 0;
        }

        public static Festivos NewFestivo(Festivos festivo)
        {
            if (!IsFestivo(festivo.Festivo_Fecha))
            {
                var newRecord = new Festivos() { Festivo_Fecha = festivo.Festivo_Fecha, Festivo_Descripcion = festivo.Festivo_Descripcion };
                db.Festivos.InsertOnSubmit(newRecord);
                db.SubmitChanges();
                return newRecord;
            }
            else
            {
                throw new Exception($"El festivo {festivo.Festivo_Fecha.ToString("dd-MM-yyyy")} ya está dado de alta en la base de datos");
            }
        }

        public static Festivos ModifyFestivo(Festivos festivo)
        {
            if (IsFestivo(festivo.Festivo_Fecha))
            {
                var record = GetFestivo(festivo.Festivo_Fecha);
                record.Festivo_Descripcion = festivo.Festivo_Descripcion;
                db.SubmitChanges();
                return record;
            } else
            {
                throw new Exception($"El festivo {festivo.Festivo_Fecha.ToString("dd-mm-yyyy")} no existe en la base de datos.");
            }
        }
    }
}