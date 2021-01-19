using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OrganiztionOfEvents.Model;

namespace OrganiztionOfEvents.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IOptions<AuthOption> authOptions;

        public EventContext context;


        //public List<UserAccount> Accounts;

        public AuthController(EventContext context, IOptions<AuthOption> authOptions)
        {
            this.authOptions = authOptions;
            this.context = context;
            //Accounts = this.context.Accounts.ToList();
        }


        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody]Login request)
        { 
            var user = AuthenticateUser(request.username, request.password);
            if (user != null)
            {
                var tok = GenerateToken(user);
                    
                return Ok(new
                {
                    access_token = tok
                });
            }
            return Unauthorized();
        }

        [Route("register")]
        [HttpPost]
        public IActionResult Registration([FromForm] RegistrUser request)
        {
            try
            {
                UserAccount userAccount = new UserAccount()
                {
                    Id=0,
                    Email = request.Email,
                    UserName = request.UserName,
                    Passw0rd = request.Password,
                };
                context.UserAccount.Add(userAccount);
                context.SaveChanges();
                return Ok(new
                {
                    status = "Success"
                });
            }
            catch (Exception ex)
            {
                return Ok(new
                {
                    status = ex.Message
                });
            }
        }

        private UserAccount AuthenticateUser(string userName, string password)
        {
            return context.UserAccount.SingleOrDefault(u => u.UserName == userName && u.Passw0rd == password);
        }

        private string GenerateToken(UserAccount user)
        {
            var authParam = authOptions.Value;
            var securityKey = authParam.GetSymmetricSecurityKey();
            var credentails = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            };
            var token = new JwtSecurityToken(authParam.Issuer, authParam.Audience, claims,
                expires: DateTime.Now.AddSeconds(authParam.TokenLifetime), signingCredentials: credentails);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private string GetHashPassword(string password)
        {
            using (SHA512 sha512 = SHA512.Create())
            {
                byte[] sourceBytes = Encoding.UTF8.GetBytes(password);
                byte[] hashBytes = sha512.ComputeHash(sourceBytes);
                string hash = BitConverter.ToString(hashBytes);
                return hash;
            }
        }
    }
}
