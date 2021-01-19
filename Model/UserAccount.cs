using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OrganiztionOfEvents.Model
{
    public class UserAccount
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Passw0rd { get; set; }

        public string Email { get; set; }
    }
}
