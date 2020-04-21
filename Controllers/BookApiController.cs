using BookHotel.Models;
using BookHotel.Models.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BookHotel.Controllers
{
    public class BookApiController : ApiController
    {
        // GET: api/BookApi
        [HttpPost, Route("api/BookRoom")]
        public IHttpActionResult BookRoom(Reservation reservation)
        {
            var answer = new Answer
            {
                Error = false
            };
            using (BookingContext context = new BookingContext())
            {
                var reservations = context.Reservations.Where(r => r.RoomId == reservation.RoomId).ToList();
                if(reservation.Arrival < DateTime.Now.Date || reservation.Departure < DateTime.Now.Date)
                {
                    answer.Error = true;
                    return Ok(answer);
                }

                foreach (var r in reservations)
                {
                    for(var i = reservation.Arrival; i <= reservation.Departure; i = i.AddDays(1))
                    {
                        if (i >= r.Arrival && i <= r.Departure)
                        {
                            answer.Error = true;
                            return Ok(answer);
                        }
                    }
                }
                var user = context.Users.FirstOrDefault(u => u.Email == User.Identity.Name);
                reservation.UserId = user.Id;
                context.Reservations.Add(reservation);
                context.SaveChanges();
            }
            return Ok(answer);
        }

        // GET: api/BookApi/5
        [HttpGet, Route("api/BookRooms")]
        public IHttpActionResult BookRooms()
        {
            return Ok("123");
        }

        // POST: api/BookApi
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/BookApi/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/BookApi/5
        public void Delete(int id)
        {
        }
        public struct Answer
        {
            public bool Error { get; set; }
        } 
    }
}
