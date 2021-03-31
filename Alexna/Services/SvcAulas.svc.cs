using Alexna.Datos;
using Alexna.Interfaces;
using System;
using System.Collections.Generic;

namespace Alexna.Services
{
    public class SvcAulas : IAula
    {
        public bool BorrarAula(int id)
        {
            return Managers.ClsAulas.BorraAula(id);
        }

        public Aulas EditarAula(Aulas aula)
        {
            return Managers.ClsAulas.ModificarAula(aula);
        }

        public Aulas NuevaAula(Aulas aula)
        {
            return Managers.ClsAulas.NuevaAula(aula);
        }

        public Aulas ObtenerAula(int id)
        {
            return Managers.ClsAulas.DameAula(id);
        }

        public List<Aulas> ObtenerListado()
        {
            return Managers.ClsAulas.DameAulas();
        }
    }
}
