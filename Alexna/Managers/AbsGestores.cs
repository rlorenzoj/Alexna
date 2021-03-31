using Alexna.Datos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Alexna.Managers
{
    public abstract class AbsGestores
    {
        public static alexnaDataContext db = new Datos.alexnaDataContext();

    }
}