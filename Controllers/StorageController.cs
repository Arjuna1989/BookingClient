using System.Web.Mvc;

namespace CommercePromote.BookingClient.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="CommercePromote.BookingClient.Controllers.BaseController" />
    public class StorageController : BaseController
    {
        // GET: Faq
        /// <summary>
        /// Indexes this instance.
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            
            return View();
        }
        public ActionResult Shared()
        {
            return View();
        }

    }
}