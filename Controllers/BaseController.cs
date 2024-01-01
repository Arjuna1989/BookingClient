
using CommercePromote.BookingClient.Models;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web.Mvc;
using System.Web.Routing;

namespace CommercePromote.BookingClient.Controllers
{
    public class BaseController : Controller
    {

        protected AgentInfoModel LoggedUser = null;

        protected override void Initialize(RequestContext requestContext)
        {
            base.Initialize(requestContext);

            LoggedUser = new AgentInfoModel();
            if (User is ClaimsPrincipal)
            {
                var user = User as ClaimsPrincipal;
                var claims = user.Claims.ToList();
                var userStateString = GetClaim(claims, "logged_user");

                if (!string.IsNullOrEmpty(userStateString))
                    LoggedUser.FromString(userStateString);
            }
            ViewBag.LoggedUser = LoggedUser;

#if DEBUG
            LoggedUser = new AgentInfoModel() { AgentId = 3062, GroupId =3061, CountryCode = "MY", DisplayName = "Vinidu Nirash", Email = "vinidu.nirash@commercepromote.com", Token = "jGP1hJmhOfQmGU-kVK-ogI1E8ce1wjZPnMobaoIooR8F0pKwd_HVB7xeF_8f4z08IcYzlnZ485caEK-1dU_T67k6fwEedtRwjESbwrd5j7qnU7Ze3QQHxS00-MBnl7Lz8j_0PahdZ46oLURRvsPrbrqERTCIWKEoq5jsjVA7yFdnmkKkMVHeY3Ku24hrknhYrW0h-EAcHvCAjUS-CLj5EhVU-K-IE3_6paPPTqodZ1o" };
            ViewBag.LoggedUser = LoggedUser;
#endif

        }

        private static string GetClaim(List<Claim> claims, string key)
        {
            var claim = claims.FirstOrDefault(c => c.Type == key);
            if (claim == null)
                return null;

            return claim.Value;
        }
    }
}