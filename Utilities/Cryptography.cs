using System.Security.Cryptography;
using System.Text;

namespace WeddingSite.BackEnd.Utilities
{
    public static class Cryptography
    {
        public static string EncryptString(string plainText, string key)
        {
            byte[] iv = new byte[16];
            byte[] array;

            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = iv;

                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                using MemoryStream memoryStream = new();
                using CryptoStream cryptoStream = new(memoryStream, encryptor, CryptoStreamMode.Write);
                using (StreamWriter streamWriter = new(cryptoStream))
                {
                    streamWriter.Write(plainText);
                }

                array = memoryStream.ToArray();
            }

            return Convert.ToBase64String(array);
        }

        public static string DecryptString(string plainText, string key)
        {
            byte[] iv = new byte[16];
            string? ret = null;
            var base64EncodedBytes = Convert.FromBase64String(plainText);

            using (Aes aes = Aes.Create())
            {
                aes.Key = Encoding.UTF8.GetBytes(key);
                aes.IV = iv;

                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                using MemoryStream msDecrypt = new(base64EncodedBytes);
                using CryptoStream csDecrypt = new(msDecrypt, decryptor, CryptoStreamMode.Read);
                using StreamReader srDecrypt = new(csDecrypt);
                
                // Read the decrypted bytes from the decrypting stream and place them in a string.
                ret = srDecrypt.ReadToEnd();
            }

            return ret;
        }
    }
}
