using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookHotel.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public String FullName { get; set; }
        public String Email { get; set; }
        public String Phone { get; set; }
        public String Adult { get; set; }
        public String Children { get; set; }
        public DateTime Arrival { get; set; }
        public DateTime Departure { get; set; }
        public String Wishes { get; set; }
        public String Room { get; set; }
        public int RoomId { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}