using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookHotel.Models
{
    public class User
    {
        public int Id { get; set; }
        public Boolean IsAdmin { get; set; }
        public String Email { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Password { get; set; }
    }
}