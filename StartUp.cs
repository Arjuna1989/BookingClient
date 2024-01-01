using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(CommercePromote.BookingClient.StartUp))]
namespace CommercePromote.BookingClient
{
    public partial class StartUp
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}