using BookHotel.Models.Context;
using BookHotel.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BookHotel.Controllers
{
    public class ReservationController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult StandardRoom()
        {
            return View();
        }
        public ActionResult OceanRoom()
        {
            return View();
        }
        public ActionResult DeluxeRoom()
        {
            return View();
        }

        // GET: Reservation
        [Authorize]
        [HttpGet]
        public ActionResult BookRoom(int? id, int? month)
        {
            var _month = month ?? DateTime.Now.Month;
            var monthName = Enum.GetName(typeof(MonthEnum), _month);
            if (id == null)
            {
                id = 1;
            }
            using (BookingContext context = new BookingContext())
            {
                if (id == null)
                    id = 1;
                var reservations = context.Reservations.ToList().Where(r => r.RoomId == id);
                ViewBag.Reservation = reservations;
                ViewBag.MonthName = monthName;
                ViewBag.MonthNumber = _month;
            }
            switch (id)
            {
                case 1:
                    return View("BookStandard");

                case 2:
                    return View("BookOcean");

                case 3:
                    return View("BookDeluxe");
                default:
                    return View("BookStandard");
            }

        }
    }
}