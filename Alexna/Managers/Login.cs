using Alexna.Datos;
using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Linq;

namespace Alexna.Managers
{
    public static class Login
    {
        public static alexnaDataContext db = new Datos.alexnaDataContext();

        public static class Global
        {
            // set password
            public const string strPassword = "NmsW.P*%POdfrt&(123123<";

            // set permutations
            public const String strPermutation = "ouiveyxaqtdpsodui";
            public const Int32 bytePermutation1 = 0x19;
            public const Int32 bytePermutation2 = 0x59;
            public const Int32 bytePermutation3 = 0x17;
            public const Int32 bytePermutation4 = 0x41;
        }

        #region "Métodos públicos"
        public static Usuarios DoLogin(string usuario, string contrasena)
        {
            if (string.IsNullOrWhiteSpace(usuario))
            {
                HttpContext.Current.Session.Clear();
                throw new Exception("No se ha indicado el usuario.");
            }
            else if (string.IsNullOrWhiteSpace(contrasena))
            {
                HttpContext.Current.Session.Clear();
                throw new Exception("No se ha indicado la contraseña.");
            }
            else
            {
                var password = Encrypt(contrasena);
                var registros = db.Usuarios.Where(u => u.usuario == usuario && u.password == password);
                if (registros != null && registros.Count() > 0)
                {
                    // Almacenamos el usuario en la sesión (menos la contraseña).
                    var registro = registros.First();
                    registro.password = "";
                    HttpContext.Current.Session["usuario"] = registro;
                    return registros.First();
                }
                else
                {
                    HttpContext.Current.Session.Clear();
                    return null;
                }
            }
        }

        // encoding
        public static string Encrypt(string strData)
        {
            return Convert.ToBase64String(Encrypt(Encoding.UTF8.GetBytes(strData)));
            // reference https://msdn.microsoft.com/en-us/library/ds4kkd55(v=vs.110).aspx

        }


        // decoding
        public static string Decrypt(string strData)
        {
            return Encoding.UTF8.GetString(Decrypt(Convert.FromBase64String(strData)));
            // reference https://msdn.microsoft.com/en-us/library/system.convert.frombase64string(v=vs.110).aspx
        }
        #endregion

        #region "Métodos privados"
        // encrypt
        private static byte[] Encrypt(byte[] strData)
        {
            PasswordDeriveBytes passbytes =
            new PasswordDeriveBytes(Global.strPermutation,
            new byte[] { Global.bytePermutation1,
                         Global.bytePermutation2,
                         Global.bytePermutation3,
                         Global.bytePermutation4
            });

            MemoryStream memstream = new MemoryStream();
            Aes aes = new AesManaged();
            aes.Key = passbytes.GetBytes(aes.KeySize / 8);
            aes.IV = passbytes.GetBytes(aes.BlockSize / 8);

            CryptoStream cryptostream = new CryptoStream(memstream,
            aes.CreateEncryptor(), CryptoStreamMode.Write);
            cryptostream.Write(strData, 0, strData.Length);
            cryptostream.Close();
            return memstream.ToArray();
        }

        // decrypt
        private static byte[] Decrypt(byte[] strData)
        {
            PasswordDeriveBytes passbytes =
            new PasswordDeriveBytes(Global.strPermutation,
            new byte[] { Global.bytePermutation1,
                         Global.bytePermutation2,
                         Global.bytePermutation3,
                         Global.bytePermutation4
            });

            MemoryStream memstream = new MemoryStream();
            Aes aes = new AesManaged();
            aes.Key = passbytes.GetBytes(aes.KeySize / 8);
            aes.IV = passbytes.GetBytes(aes.BlockSize / 8);

            CryptoStream cryptostream = new CryptoStream(memstream,
            aes.CreateDecryptor(), CryptoStreamMode.Write);
            cryptostream.Write(strData, 0, strData.Length);
            cryptostream.Close();
            return memstream.ToArray();
        }
        // reference
        // https://msdn.microsoft.com/en-us/library/system.security.cryptography(v=vs.110).aspx
        // https://msdn.microsoft.com/en-us/library/system.security.cryptography.cryptostream%28v=vs.110%29.aspx?f=255&MSPPError=-2147217396
        // https://msdn.microsoft.com/en-us/library/system.security.cryptography.rfc2898derivebytes(v=vs.110).aspx
        // https://msdn.microsoft.com/en-us/library/system.security.cryptography.aesmanaged%28v=vs.110%29.aspx?f=255&MSPPError=-2147217396
        #endregion
    }
}