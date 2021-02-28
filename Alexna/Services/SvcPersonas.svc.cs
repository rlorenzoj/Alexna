using Alexna.Datos;
using Alexna.Interfaces;
using System;
using System.Collections.Generic;

namespace Alexna.Services
{
    public class SvcPersonas : IPersona
    {
        public bool BorrarPersona(int id)
        {
            return Managers.ClsPersonas.BorraPersona(id);
        }

        public Personas EditarPersona(Personas persona)
        {
            return Managers.ClsPersonas.ModificarPersona(persona);
        }

        public Personas NuevaPersona(Personas persona)
        {
            return Managers.ClsPersonas.NuevaPersona(persona);
        }

        public List<Personas> ObtenerListado()
        {
            return Managers.ClsPersonas.DamePersonas();
        }

        public Personas ObtenerPersona(int id)
        {
            return Managers.ClsPersonas.DamePersona(id);
        }
    }
}
