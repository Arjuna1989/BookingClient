using System.Web.Mvc;
using System.Web.Routing;

namespace CommercePromote.BookingClient
{
    public static class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.LowercaseUrls = true;
            routes.MapRoute("Default", "{controller}/{action}/{id}", new
            {
                controller = "Booking",
                action = "Index",
                id = UrlParameter.Optional
            }).RouteHandler = new RouteHandler();
        }
    }
}