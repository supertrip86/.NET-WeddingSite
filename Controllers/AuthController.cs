using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WeddingSite.BackEnd.DAL;
using WeddingSite.BackEnd.Shared;
using WeddingSite.BackEnd.Utilities;
using Models = WeddingSite.BackEnd.DAL.Models;
using Responses = WeddingSite.BackEnd.DAL.Responses;

namespace WeddingSite.BackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : BaseController
    {
        private readonly string _encryptionString;

        public AuthController(IMapper _mapper, IConfiguration _config, WeddingSiteDbContext _context) : base(_mapper, _config, _context) 
        {
            _encryptionString = _config["EncryptionStrings:CryptographyString"];
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Login([FromBody] CurrentUser userLogin)
        {
            try
            {
                var user = await Authenticate(userLogin);

                if (user != null)
                {
                    var token = Generate(user);

                    Log.Information($"{user.FirstName} ${user.LastName} has been authenticated");

                    return Ok(token);
                }

                return NotFound("Invitee not found");
            }
            catch (Exception ex)
            {
                Log.Error("Authentication failed");

                return BadRequest(ex);
            }
        }

        [Authorize(Policy = EPolicies.Authorized)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetCurrentUser()
        {
            try
            {
                var currentUser = CurrentUser();

                return Ok(currentUser);
            }
            catch (Exception ex)
            {
                Log.Error("Impossible to retrieve the current user");

                return BadRequest(ex);
            }
        }

        #region Auxiliary Methods

        public Responses.Invitee? CurrentUser()
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var userClaims = identity.Claims;

                return new Responses.Invitee
                {
                    Email = userClaims.FirstOrDefault(x => x.Type.Equals(ClaimTypes.Email))?.Value,
                    LastName = userClaims.FirstOrDefault(x => x.Type.Equals(ClaimTypes.Surname))?.Value,
                    FirstName = userClaims.FirstOrDefault(x => x.Type.Equals(ClaimTypes.GivenName))?.Value,
                    Role = userClaims.FirstOrDefault(x => x.Type.Equals(ClaimTypes.Role))?.Value,
                };
            }

            return null;
        }

        private string Generate(Models.Invitee user)
        {
            var jwtKey = _config["Jwt:Key"];
            var issuer = _config["Jwt:ValidIssuer"];
            var audience = _config["Jwt:ValidAudience"];

            var expiration = DateTime.Now.AddMinutes(15);

            var claims = new[]
{
                new Claim(ClaimTypes.Surname, user.LastName),
                new Claim(ClaimTypes.GivenName, user.FirstName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(issuer, audience, claims, expires: expiration, signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private async Task<Models.Invitee?> Authenticate(CurrentUser currentUser)
        {
            var encryptedString = Cryptography.EncryptString(currentUser.Password, _encryptionString);

            var result = await _context.GetAll<Models.Invitee>()
                                       .FirstOrDefaultAsync(x => x.Password.Equals(encryptedString));

            return result;
        }

        #endregion

    }
}
