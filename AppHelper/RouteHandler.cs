using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CommercePromote.BookingClient
{
    public class RouteHandler : MvcRouteHandler
    {
        protected override IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            var routeValues = requestContext.RouteData.Values;

            routeValues["action"] = routeValues["action"].UnDash();
            routeValues["controller"] = routeValues["controller"].UnDash();

            return base.GetHttpHandler(requestContext);
        }
    }
}