using System.Web.Mvc;

namespace CommercePromote.BookingClient.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    /// <seealso cref="CommercePromote.BookingClient.Controllers.BaseController" />
    public class BookingController : BaseController
    {
        
        public ActionResult Index()
        {
            
            return View();
        }

        public ActionResult Create()
        {

            return View();
        }

        public ActionResult Edit(int Id)
        {
            ViewBag.ReservationId = Id;
            return View();
        }

        public ActionResult CreateReservation()
        {

            return View();
        }

        public ActionResult GetReservedAgents()
        {

            return View();
        }

        public ActionResult SeeAllReservation()
        {

            return View();
        }

        public ActionResult DisplayReservationGrid()
        {

            return View();
        }

    }
}