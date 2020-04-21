using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace BookHotel.Models.Context
{
    public class BookingContext : DbContext
    {
        public BookingContext() : base("BookingContext")
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
    }
}