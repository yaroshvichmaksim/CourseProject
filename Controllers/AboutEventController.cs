using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using MimeKit;
using MailKit.Net.Smtp;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using OrganiztionOfEvents.Model;
using System.Security.Claims;

namespace OrganiztionOfEvents.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AboutEventController : ControllerBase
    {
        public EventContext db;

        public AboutEventController(EventContext db)
        {
            this.db = db;
        }

        [Route("getEvents")]
        [HttpGet]
        public IEnumerable<About_The_Event> GetAllEvents()
        {
            int id = Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            return db.About_The_Event.ToList().Where(x => x.Id_User == id);
        }

        [Route("send")]
        [HttpGet]
        public async Task<IActionResult> Send(string email, string body, string text)
        {
            await SendEmailAsync(email, body, text);
            return Ok(new
            {
                status = "Error"
            });
        }

        public async Task SendEmailAsync(string email, string subject, string message)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("Euro-Events", "yaroshukevich@gmail.com"));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message
            };

            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.gmail.com", 587, false);
                await client.AuthenticateAsync("yaroshukevich@gmail.com", "1999maks");
                await client.SendAsync(emailMessage);

                await client.DisconnectAsync(true);
            }
        }


        [Route("addEvent")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost]
        public async Task<IActionResult> AddEvent([FromBody]About_The_Event the_Event)
        {
            using var transaction = db.Database.BeginTransaction();
            int id = Convert.ToInt32(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            try
            {
                About_The_Event about_The_Event = the_Event;
                about_The_Event.Id_User = id;
                await db.About_The_Event.AddAsync(about_The_Event);
                db.SaveChanges();
                transaction.Commit();

                return Ok(new
                {
                    status = "Success"
                });
            }
            catch (Exception)
            {
                transaction.Rollback();
                return Ok(new
                {
                    status = "Error"
                });
            }
        }

        [Route("editEvent")]
        [HttpPut]
        public IActionResult EditEvent([FromBody]About_The_Event the_Event)
        {
            using var transaction = db.Database.BeginTransaction();
            try
            {
                db.About_The_Event.Update(the_Event);
                db.SaveChanges();
                transaction.Commit();

                return Ok(new
                {
                    status = "Success"
                });
            }
            catch (Exception)
            {
                transaction.Rollback();
                return Ok(new
                {
                    status = "Error"
                });
            }
        }

        [Route("deleteEvent")]
        [HttpDelete]
        public IActionResult DeleteEvent(int id)
        {
            using var transaction = db.Database.BeginTransaction();
            try
            {
                About_The_Event the_Event = db.About_The_Event.Find(id);
                db.About_The_Event.Remove(the_Event);
                db.SaveChanges();
                transaction.Commit();

                return Ok(new
                {
                    status = "Success"
                });
            }
            catch (Exception)
            {
                transaction.Rollback();
                return Ok(new
                {
                    status = "Error"
                });
            }
        }
    }
}
