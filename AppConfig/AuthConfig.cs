using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;

namespace CommercePromote.BookingClient
{
    public partial class StartUp
    {
        public void ConfigureAuth(IAppBuilder app)
        {

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                LoginPath = new PathString("/Auth/Login"),
                CookieName = "CpOwin_Auth",
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                CookieDomain = Settings.GetValue<string>("CookiePath"),
                CookieHttpOnly = false
            });

            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
        }
    }
}