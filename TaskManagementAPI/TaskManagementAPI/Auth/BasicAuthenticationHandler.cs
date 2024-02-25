using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaskManagementAPI.Auth
{
    using System.Security.Claims;
    using System.Security.Cryptography;
    using System.Text;
    using System.Text.Encodings.Web;
    using Microsoft.AspNetCore.Authentication;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using TaskManagementAPI.Controllers;
    using TaskManagementAPI.Models;

    public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly TasksDBContext _context;
        public BasicAuthenticationHandler(
            IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock,
            TasksDBContext context)
            : base(options, logger, encoder, clock)
        {
            _context = context;
        }
        
        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey("Authorization"))
            {
                return AuthenticateResult.Fail("Unauthorized");
            }

            string authorizationHeader = Request.Headers["Authorization"];
            if (string.IsNullOrEmpty(authorizationHeader))
            {
                return AuthenticateResult.Fail("Unauthorized");
            }

            if (!authorizationHeader.StartsWith("basic ", StringComparison.OrdinalIgnoreCase))
            {
                return AuthenticateResult.Fail("Unauthorized");
            }

        

            var authData = authorizationHeader.Split(" ")[1];
      
            var credentialAsString = Encoding.UTF8.GetString(Convert.FromBase64String(authData));

            var credentials = credentialAsString.Split(":");
            if (credentials?.Length != 2)
            {
                return AuthenticateResult.Fail("Unauthorized");
            }

            var username = credentials[0];
            var password = credentials[1];

           var encryptedPassword = HashText(password);
            var user = await _context.UserData.FirstOrDefaultAsync(x => x.USERNAME == username && x.PASSWORD == encryptedPassword);
            if (user == null)
            {
                return AuthenticateResult.Fail("Authentication failed");
            }
            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, username)
        };
            var identity = new ClaimsIdentity(claims, "basic");
            var claimsPrincipal = new ClaimsPrincipal(identity);
            return AuthenticateResult.Success(new AuthenticationTicket(claimsPrincipal, Scheme.Name));
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
