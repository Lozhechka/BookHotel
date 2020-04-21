using BookHotel.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Web;
using BookHotel.Models;
using System.Web.Mvc;

namespace BookHotel.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

        [Authorize]
        public ActionResult ReservationTable()
        {
            using (BookingContext context = new BookingContext())
            {
                var user = context.Users.FirstOrDefault(u => u.Email == User.Identity.Name);
                if(!user.IsAdmin)
                {
                    return HttpNotFound();
                }
                var reservations = context.Reservations.Include(r => r.User).OrderByDescending(r => r.Id).ToList();
               // ViewBag.Reservations = reservations;
                return View(reservations);
            }
            
        }
        [Authorize]
        public ActionResult Contact()
        {
            return View();
        }

    }
}