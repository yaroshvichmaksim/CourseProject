using Microsoft.EntityFrameworkCore;
//using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
//using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace OrganiztionOfEvents.Model
{
    public class EventContext : DbContext
    {
        //public string ConnectionString { get; set; }

        public DbSet<About_The_Event> About_The_Event { get; set; }

        public DbSet<UserAccount> UserAccount { get; set; }

        //public DbSet<RegistrUser> RegistrUser { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<UserAccount>((pc =>
        //    {
        //        pc.HasNoKey();
        //        pc.ToView("UserAccount");
        //    }));
        //}

        public EventContext(DbContextOptions<EventContext> options) : base(options)
        {
            //SetSqlGenerator("MySql.Data.MySqlClient" new MySql.Data.EntityFramework.MySqlMigrationSqlGenerator());
            //this.ConnectionString = connectionString;
        }

       

        //private MySqlConnection GetConnection()
        //{
        //    return new MySqlConnection(ConnectionString);
        //}

        //public List<About_The_Event> GetAllEvent()
        //{
        //    List<About_The_Event> list = new List<About_The_Event>();

        //    using (MySqlConnection conn = GetConnection())
        //    {
        //        conn.Open();
        //        MySqlCommand cmd = new MySqlCommand("select * from about_the_event;", conn);

        //        using (var reader = cmd.ExecuteReader())
        //        {
        //            while (reader.Read())
        //            {
        //                list.Add(new About_The_Event()
        //                {
        //                    Id = (int)reader[0],
        //                    Internal_Name = reader[1].ToString(),
        //                    Official_Name = reader[2].ToString(),
        //                    Place = reader[3].ToString(),
        //                    Country = reader[4].ToString(),
        //                    Address = reader[5].ToString(),
        //                    PostCode = reader[6].ToString(),
        //                    City = reader[7].ToString(),
        //                    Date_Of_the = reader[8].ToString(),
        //                    Start_Of_event = reader[9].ToString(),
        //                    End_Of_event = reader[10].ToString()
        //                });
        //            }

        //        }
        //    }
        //    return list;
        //}

        //public void AddEvent(About_The_Event the_Event)
        //{
        //    List<About_The_Event> list = new List<About_The_Event>();

        //    using (MySqlConnection conn = GetConnection())
        //    {
        //        conn.Open();
        //        string sql = "insert into About_The_Event(Internal_Name,Official_Name,Place,Country,Address,PostCode,City,Date_Of_the,Start_Of_event,End_Of_event) values('" + the_Event.Internal_Name + "','" + the_Event.Official_Name + "','" +
        //            the_Event.Place + "','" + the_Event.Country + "','" + the_Event.Address + "','" + the_Event.PostCode + "','" + the_Event.City + "','" + the_Event.Date_Of_the + "','" +
        //            the_Event.Start_Of_event + "','" + the_Event.End_Of_event + "');";
        //        MySqlCommand cmd = new MySqlCommand(sql, conn);

        //        cmd.ExecuteNonQuery();
        //    }
        //}
    }
}
