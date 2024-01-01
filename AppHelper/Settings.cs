#region Using

using System;
using System.Configuration;
using System.Web.Configuration;
using System.Web.WebPages;
using Microsoft.Ajax.Utilities;

#endregion

namespace CommercePromote.BookingClient
{
    public class Settings
    {
        private const string Prefix = "config";

        public static readonly string Company = GetValue<string>("Company");

        public static readonly string Project = GetValue<string>("Project");

        public static readonly string CurrentTheme = GetValue<string>("CurrentTheme");

        public static readonly bool EnableTiles = GetValue<bool>("EnableTiles");

        public static T GetValue<T>(string key, string prefix = Prefix)
        {
            var entry = string.Format("{0}:{1}", prefix, key);

            if (entry.IsNullOrWhiteSpace())
                return default(T);

            var value = ConfigurationManager.AppSettings[entry];

            if (value.IsNullOrWhiteSpace())
                return default(T);

            if (typeof(T).IsEnum)
                return (T)Enum.Parse(typeof(T), value, true);

            if (typeof(T) == typeof(bool) && value.Is<int>())
                return (T)Convert.ChangeType(value.As<int>(), typeof(T));

            return (T)Convert.ChangeType(value, typeof(T));
        }

        public static T SetValue<T>(string key, string value)
        {
            var config = WebConfigurationManager.OpenWebConfiguration("~");

            config.AppSettings.Settings[key].Value = value;
            config.Save(ConfigurationSaveMode.Modified);
            ConfigurationManager.RefreshSection("appSettings");

            return default(T);
        }
    }
}