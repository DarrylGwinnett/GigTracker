using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Gigs.DTO
{
    public class BaseGigDto
    {
        public string Title { get; set; } = "";

        public string Artist { get; set; } = "";

        public DateTime Date { get; set; }

        public string Description { get; set; } = "";

        public string Genre { get; set; } = "";

        public string City { get; set; } = "";

        public string Venue { get; set; } = "";

        public double Latitude { get; set; }

        public double Longitude { get; set; }
    }
}
