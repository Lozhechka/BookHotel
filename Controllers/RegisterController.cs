using BookHotel.Models;
using BookHotel.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace BookHotel.Controllers
{
    public class RegisterController : Controller
    {
        // GET: Register
        public ActionResult Login()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }
        public ActionResult Register()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Login(User user)
        {
            if (ModelState.IsValid)
            {
                using (BookingContext context = new BookingContext())
                {
                    User loginUser = context.Users.FirstOrDefault(u => u.Email == user.Email);
                    if (loginUser != null)
                    {
                        var pass = loginUser.Password.Substring(0, 28);
                        if (pass == HashPassword(user.Password))
                        {
                            FormsAuthentication.SetAuthCookie(loginUser.Email, true);
                            if(loginUser.IsAdmin)
                            {
                                return RedirectToAction("ReservationTable", "Home");
                            }
                            return RedirectToAction("Index", "Home");
                        }
                    }
                }
            }
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Register(User user)
        {
            
            if (ModelState.IsValid)
            {
                using (BookingContext context = new BookingContext())
                {
                    User existUser = context.Users.FirstOrDefault(u => u.Email == user.Email);
                    if (existUser == null)
                    {
                        context.Users.Add(new User
                        {
                            Email = user.Email,
                            FirstName = user.FirstName,
                            LastName = user.LastName,
                            Password = HashPassword(user.Password) + GenerateSalt()
                        });
                        context.SaveChanges();
                    }
                    User _user = context.Users.FirstOrDefault(u => u.Email == User.Identity.Name);
                    if (user != null)
                    {
                        FormsAuthentication.SetAuthCookie(user.Email, true);
                        return RedirectToAction("Index", "Home");
                    }
                }
            }
            return View("Register", "Register");
        }

        [HttpGet]
        public ActionResult Logoff()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Login", "Register");
        }
        private String HashPassword(string userPassword)
        {
            Rfc2898DeriveBytes PBKDF2 = new Rfc2898DeriveBytes(userPassword, Convert.FromBase64String(_salt), 1000);
            return Convert.ToBase64String(PBKDF2.GetBytes(20));
        }
        private String GenerateSalt()
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return Convert.ToBase64String(salt);
        }
        private string _salt = "VEBpyGMSXGG6eEymz2ReuQ==";
    }   
}
