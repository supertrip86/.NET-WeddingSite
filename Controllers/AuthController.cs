using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WeddingSite.BackEnd.DAL;
using WeddingSite.BackEnd.Shared.Models;
using WeddingSite.BackEnd.Shared.Structs;
using WeddingSite.BackEnd.Utilities;
using Models = WeddingSite.BackEnd.DAL.Models;
using Responses = WeddingSite.BackEnd.DAL.Responses;

namespace WeddingSite.BackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : BaseController
    {
        public AuthController(IMapper _mapper, IConfiguration _config, WeddingSiteDbContext _context) : base(_mapper, _config, _context) { }

        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Login([FromBody] CurrentUser userLogin)
        {
            try
            {
                var user = await AuthenticateUser(userLogin);

                if (user == default)
                {
                    return Unauthorized();
                }

                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
                    new Claim(ClaimTypes.Surname, user.LastName),
                    new Claim(ClaimTypes.GivenName, user.FirstName),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role),
                };

                var token = await GenerateCurrentToken(user, new ClaimsIdentity(claims));

                var _ = JwtTokenValidate(token);

                Log.Information($"{user.FirstName} {user.LastName} has been authenticated");

                return Ok(token);

            }
            catch (Exception ex)
            {
                Log.Error("Authentication failed");

                return BadRequest(ex);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> RefreshLogin([FromBody] CurrentToken currentToken)
        {
            try
            {
                var securityToken = JwtTokenValidate(currentToken);

                if (securityToken is JwtSecurityToken token && !token.Header.Alg.Equals(SecurityAlgorithms.HmacSha256))
                {
                    return Unauthorized();
                }

                var activeInvitee = await _context.GetAll<Models.ActiveInvitee>()
                                                  .FirstOrDefaultAsync(x => x.RefreshToken.Equals(currentToken.RefreshToken));

                if (activeInvitee == default)
                {
                    return Unauthorized();
                }

                var entity = await _context.GetAll<Models.Invitee>()
                                           .FirstOrDefaultAsync(x => x.Email.Equals(activeInvitee.Email));

                var user = _mapper.Map<Responses.Invitee>(entity);

                var identity = new ClaimsIdentity(HttpContext.User.Claims);

                var result = await GenerateCurrentToken(user, identity);

                return Ok(result);

            }
            catch (Exception ex)
            {
                Log.Error("Impossible to refresh the authentication token");

                return BadRequest(ex);
            }
        }

        [Authorize(Policy = Policies.Authorized)]
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

        private Responses.Invitee? CurrentUser()
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var userClaims = identity.Claims;

                return new Responses.Invitee
                {
                    Email = userClaims.First(x => x.Type.Equals(ClaimTypes.Email)).Value,
                    LastName = userClaims.First(x => x.Type.Equals(ClaimTypes.Surname)).Value,
                    FirstName = userClaims.First(x => x.Type.Equals(ClaimTypes.GivenName)).Value,
                    Role = userClaims.First(x => x.Type.Equals(ClaimTypes.Role)).Value,
                };
            }

            return null;
        }

        private async Task<Responses.Invitee?> AuthenticateUser(CurrentUser currentUser)
        {
            try
            {
                var encryptionString = _config["EncryptionStrings:CryptographyString"];

                var encryptedString = Cryptography.EncryptString(currentUser.Password, encryptionString);

                var entity = await _context.GetAll<Models.Invitee>()
                                           .FirstOrDefaultAsync(x => x.Password.Equals(encryptedString));

                var result = _mapper.Map<Responses.Invitee>(entity);

                return result;
            }
            catch
            {
                Log.Error("Unable to query the Database");

                return default;
            }
        }

        private async Task<CurrentToken> GenerateCurrentToken(Responses.Invitee user, ClaimsIdentity identity)
        {
            try
            {
                var jwtToken = GenerateToken(identity);
                var refreshToken = await RegisterRefreshToken(user);

                var token = new CurrentToken
                {
                    Token = jwtToken,
                    RefreshToken = refreshToken
                };

                return token;
            }
            catch
            {
                return new CurrentToken();
            }

        }

        private string GenerateToken(ClaimsIdentity identity)
        {
            try
            {
                var jwtKey = _config["Jwt:Key"];
                var issuer = _config["Jwt:ValidIssuer"];
                var audience = _config["Jwt:ValidAudience"];
                var minutes = double.Parse(_config["Jwt:TokenExpirationInMinutes"]);

                var expiration = DateTime.Now.AddMinutes(minutes);
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Issuer = issuer,
                    Audience = audience,
                    Subject = identity,
                    Expires = expiration,
                    SigningCredentials = credentials,
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);

                return tokenHandler.WriteToken(token);
            }
            catch
            {
                Log.Error("Unable to create JWT token");

                return string.Empty;
            }
        }

        private async Task<string> RegisterRefreshToken(Responses.Invitee user)
        {
            try
            {
                var record = await _context.GetAll<Models.ActiveInvitee>()
                                           .FirstOrDefaultAsync(x => x.Email.Equals(user.Email));

                var refreshToken = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));

                if (record != default)
                {
                    record.RefreshToken = refreshToken;

                    _context.Modify(record);
                }
                else
                {
                    var newRecord = new Models.ActiveInvitee
                    {
                        InvitationRefId = user.InvitationId,
                        Email = user.Email,
                        LastName = user.LastName,
                        FirstName = user.FirstName,
                        RefreshToken = refreshToken,
                    };

                    _context.Add(newRecord);
                }

                await _context.SaveChangesAsync();

                return refreshToken;
            }
            catch
            {
                Log.Error("Unable to update the Refresh Token");

                return string.Empty;
            }
        }

        private SecurityToken JwtTokenValidate(CurrentToken currentToken)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();

                var tokenParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _config["Jwt:ValidIssuer"],
                    ValidAudience = _config["Jwt:ValidAudience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"])),
                    ClockSkew = TimeSpan.Zero
                };

                HttpContext.User = tokenHandler.ValidateToken(currentToken.Token, tokenParameters, out var securityToken);

                return securityToken;

            }
            catch (SecurityTokenExpiredException ex)
            {
                throw new SecurityTokenExpiredException(ex.Message);
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);

                throw new Exception(ex.Message);
            }
        }

        #endregion

    }
}
