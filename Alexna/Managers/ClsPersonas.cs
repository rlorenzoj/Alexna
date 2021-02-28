using Alexna.Datos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Alexna.Managers
{
    public class ClsPersonas
    {
        public static alexnaDataContext db = new alexnaDataContext();

        public static bool BorraPersona(int id)
        {
            var record = db.Personas.Where(p => p.Persona_Id == id).First();
            db.Personas.DeleteOnSubmit(record);
            db.SubmitChanges();
            return true;
        }

        public static Personas DamePersona(int id)
        {
            return db.Personas.Where(p => p.Persona_Id == id).First();
        }

        public static List<Personas> DamePersonas()
        {
            try
            {
                return db.Personas.ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static bool ExistePersona(int id)
        {
            return db.Personas.Where(p => p.Persona_Id == id).Count() > 0;
        }

        public static Personas NuevaPersona(Personas persona)
        {
            db.Personas.InsertOnSubmit(persona);
            db.SubmitChanges();
            return persona;
        }

        public static Personas ModificarPersona(Personas persona)
        {
            if (ExistePersona(persona.Persona_Id))
            {
                var record = DamePersona(persona.Persona_Id);
                record.Persona_Identificacion_Legal = persona.Persona_Identificacion_Legal;
                if (persona.Persona_Foto != "mantener")
                {
                    record.Persona_Foto = persona.Persona_Foto;
                }
                record.Persona_Nombre = persona.Persona_Nombre;
                record.Persona_Apellido_1 = persona.Persona_Apellido_1;
                record.Persona_Apellido_2 = persona.Persona_Apellido_2;
                record.Persona_Alias = persona.Persona_Alias;
                record.Persona_Sexo = persona.Persona_Sexo;
                record.Persona_Fecha_Nacimiento = persona.Persona_Fecha_Nacimiento;
                record.Persona_Fecha_Muerte = persona.Persona_Fecha_Muerte;
                record.Persona_Observaciones = persona.Persona_Observaciones;
                db.SubmitChanges();
                return record;
            }
            else
            {
                throw new Exception($"La persona {persona.Persona_Id} no existe en la base de datos.");
            }
        }
    }
}