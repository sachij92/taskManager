using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly TasksDBContext _context;
        public AuthenticationController(TasksDBContext context)
        {
            _context = context;
        }
        [HttpPost("Authenticate")]
   
        public async Task<ActionResult> Authenticate( [FromBody] Users userData)
        {
           if(userData ==  null)
            {
                return BadRequest();
            }
            userData.PASSWORD = HashText(userData.PASSWORD);
            var user = await _context.UserData.FirstOrDefaultAsync(x => x.USERNAME == userData.USERNAME && x.PASSWORD == userData.PASSWORD);
            if (user == null)
            {
                
                return NotFound(new { Message = "User Not Found " });
            }
                
                return Ok(userData);
         }
        [HttpPost("Register")]
        public async Task<ActionResult> Register([FromBody] Users userData)
        {
            if (userData == null)
            {
                return NotFound();
            }
            userData.PASSWORD =   HashText(userData.PASSWORD);
            _context.UserData.Add(userData);
            await _context.SaveChangesAsync();

            return Ok(userData);
        }
        protected string HashText(string text)
        {
            HashAlgorithm hasher = new SHA1CryptoServiceProvider();
            byte[] textWithSaltBytes = Encoding.UTF8.GetBytes(text);
            byte[] hashedBytes = hasher.ComputeHash(textWithSaltBytes);
            hasher.Clear();
            return Convert.ToBase64String(hashedBytes);
        }
    }
}
