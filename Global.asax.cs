#region Namespaces

using System;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing; 

#endregion

namespace CommercePromote.BookingClient
{
    public class MvcApplication : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}