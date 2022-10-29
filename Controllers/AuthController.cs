using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
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
        private readonly TokenValidationParameters _tokenValidationParameters;
        private readonly EncryptionStrings _encryption;
        private readonly JwtParameters _jwtParams;

        public AuthController(
                IMapper _mapper,
                WeddingSiteDbContext _context,
                IOptions<EncryptionStrings> encryption,
                IOptions<JwtParameters> jwtParams,
                TokenValidationParameters tokenParameters
            )
            : base(_mapper, _context)
        {
            _tokenValidationParameters = tokenParameters;
            _encryption = encryption.Value;
            _jwtParams = jwtParams.Value;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Login([FromBody] AppLogin userLogin)
        {
            try
            {
                var user = await AuthenticateUser(userLogin);

                if (user == default)
                {
                    return Unauthorized("User not found");
                }

                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
                    new Claim(ClaimTypes.Surname, user.LastName),
                    new Claim(ClaimTypes.GivenName, user.FirstName),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role),
                };

                var tokens = await GenerateCurrentToken(user, new ClaimsIdentity(claims));

                HttpContext.User = new JwtSecurityTokenHandler().ValidateToken(tokens.AccessToken, _tokenValidationParameters, out var _);

                Log.Information($"{user.FirstName} {user.LastName} has been authenticated");

                return Ok(tokens);

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
        public async Task<IActionResult> RefreshLogin([FromBody] AppTokens tokens)
        {
            try
            {
                #region Modifica1

                //var refreshToken = Request.Cookies["refreshToken"];
                //var accessToken = Request.Cookies["accessToken"];

                //if (string.IsNullOrEmpty(accessToken) || string.IsNullOrEmpty(refreshToken))
                //{
                //    return Unauthorized();
                //}

                //var securityToken = JwtTokenValidate(new AppTokens
                //{
                //    AccessToken = accessToken,
                //    RefreshToken = refreshToken
                //});

                if (string.IsNullOrEmpty(tokens.AccessToken) || string.IsNullOrEmpty(tokens.RefreshToken))
                {
                    return Unauthorized("Missing tokens");
                }

                #endregion

                _tokenValidationParameters.ValidateLifetime = false;

                HttpContext.User = new JwtSecurityTokenHandler().ValidateToken(tokens.AccessToken, _tokenValidationParameters, out var securityToken);

                _tokenValidationParameters.ValidateLifetime = true;

                if (securityToken is JwtSecurityToken token && !token.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    return Unauthorized("Invalid access token");
                }

                var activeInvitee = await _context.GetAll<Models.ActiveInvitee>()
                                                  .FirstOrDefaultAsync(x => x.RefreshToken.Equals(tokens.RefreshToken));

                if (activeInvitee == default)
                {
                    return Unauthorized("Invalid refresh token");
                }

                if (activeInvitee.Expiration < DateTime.Now)
                {
                    return Unauthorized("Expired refresh token");
                }

                var entity = await _context.GetAll<Models.Invitee>()
                                           .FirstOrDefaultAsync(x => x.Email.Equals(activeInvitee.Email));

                var user = _mapper.Map<Responses.Invitee>(entity);

                var identity = new ClaimsIdentity(HttpContext.User.Claims);

                var appTokens = await GenerateCurrentToken(user, identity);

                return Ok(appTokens);

            }
            catch (SecurityTokenSignatureKeyNotFoundException)
            {
                return Unauthorized("Invalid access token");
            }
            catch (Exception ex)
            {
                Log.Error("Impossible to refresh the authentication token");

                return Unauthorized(ex.Message);
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

        private async Task<Responses.Invitee?> AuthenticateUser(AppLogin currentUser)
        {
            try
            {
                var encryptionString = _encryption.CryptographyString;

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

        private async Task<AppTokens> GenerateCurrentToken(Responses.Invitee user, ClaimsIdentity identity)
        {
            try
            {
                var jwtToken = GenerateToken(identity);
                var refreshToken = await RegisterRefreshToken(user);

                #region Modifica2

                //var accessExpiration = DateTime.Now.AddMinutes(_jwtParams.TokenExpirationInMinutes)
                //                                   .AddSeconds(-10);

                //var refreshExpiration = DateTime.Now.AddMonths(_jwtParams.RefreshTokenExpirationInMonths)
                //                                    .AddMinutes(-1);

                //Response.Cookies.Append("accessToken", jwtToken, new CookieOptions
                //{
                //    HttpOnly = true,
                //    Expires = accessExpiration
                //});

                //Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
                //{
                //    HttpOnly = true,
                //    Expires = refreshExpiration
                //});

                #endregion

                return new AppTokens
                {
                    AccessToken = jwtToken,
                    RefreshToken = refreshToken
                };
            }
            catch
            {
                return new AppTokens();
            }
        }

        private string GenerateToken(ClaimsIdentity identity)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtParams.Key));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Issuer = _jwtParams.ValidIssuer,
                    Audience = _jwtParams.ValidAudience,
                    Subject = identity,
                    Expires = DateTime.Now.AddMinutes(_jwtParams.TokenExpirationInMinutes),
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
                    record.Active = DateTime.Now;

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
                        Expiration = DateTime.Now.AddMonths(_jwtParams.RefreshTokenExpirationInMonths),
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

        #endregion

    }
}
