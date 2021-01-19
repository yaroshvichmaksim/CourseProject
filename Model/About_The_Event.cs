using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OrganiztionOfEvents.Model
{
    [Table("about_the_event")]
    public class About_The_Event
    {
        [Key]
        public int Id { get; set; }

        [Column("Id_User")]
        public int Id_User { get; set; }

        [Column("Internal_Name")]
        public string Internal_Name { get; set; }

        [Column("Official_Name")]
        public string Official_Name { get; set; }

        [Column("Place")]
        public string Place { get; set; }

        [Column("Country")]
        public string Country { get; set; }

        [Column("Address")]
        public string Address { get; set; }

        [Column("PostCode")]
        public string PostCode { get; set; }

        [Column("City")]
        public string City { get; set; }

        [Column("Date_Of_the")]
        public string Date_Of_the { get; set; }

        [Column("Start_Of_event")]
        public string Start_Of_event { get; set; }

        [Column("End_Of_event")]
        public string End_Of_event { get; set; }
    }
}
