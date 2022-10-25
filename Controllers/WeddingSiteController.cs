using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Serilog;
using WeddingSite.BackEnd.DAL;
using WeddingSite.BackEnd.Shared;
using WeddingSite.BackEnd.Utilities;
using Models = WeddingSite.BackEnd.DAL.Models;
using Responses = WeddingSite.BackEnd.DAL.Responses;

namespace WeddingSite.BackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeddingSiteController : BaseController
    {
        private readonly string _encryptionString;

        public WeddingSiteController(IMapper _mapper, IConfiguration _config, WeddingSiteDbContext _context) : base(_mapper, _config, _context) 
        {
            _encryptionString = _config["EncryptionStrings:CryptographyString"];
        }

        #region GET

        [Authorize(Policy = EPolicies.Authorized)]
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllInvitations()
        {
            try
            {
                var result = await _context.GetAll<Models.Invitee>()
                                           .Include(x => x.Guests)
                                           .ToListAsync();

                var response = _mapper.Map<List<Responses.Invitee>>(result);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize(Policy = EPolicies.Authorized)]
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetInvitationsByName()
        {
            try
            {
                var surname = HttpContext.Request.Query["surname"].ToString().ToLower();
                var name = HttpContext.Request.Query["name"].ToString().ToLower();

                var result = await _context.GetAll<Models.Invitee>()
                                           .Include(x => x.Guests)
                                           .Where(x => string.IsNullOrEmpty(surname) || x.LastName.ToLower().Equals(surname))
                                           .Where(x => string.IsNullOrEmpty(name) || x.FirstName.ToLower().Equals(name))
                                           .ToListAsync();

                var response = _mapper.Map<List<Responses.Invitee>>(result);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize(Policy = EPolicies.Authorized)]
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetInvitationById(int id)
        {
            try
            {
                var result = await _context.GetAll<Models.Invitee>()
                                           .Include(x => x.Guests)
                                           .FirstOrDefaultAsync(x => x.InvitationId.Equals(id));

                if (result == default)
                {
                    return NotFound("No invitee has been found");
                }

                var response = _mapper.Map<Responses.Invitee>(result);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize(Policy = EPolicies.Authorized)]
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetAllGuests()
        {
            try
            {
                var result = await _context.GetAll<Models.Guest>()
                                           .Include(x => x.Invitation)
                                           .ToListAsync();

                var response = _mapper.Map<List<Responses.Guest>>(result);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize(Policy = EPolicies.Authorized)]
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetGuestsByName()
        {
            try
            {
                var surname = HttpContext.Request.Query["surname"].ToString().ToLower();
                var name = HttpContext.Request.Query["name"].ToString().ToLower();

                var result = await _context.GetAll<Models.Guest>()
                                           .Include(x => x.Invitation)
                                           .Where(x => string.IsNullOrEmpty(surname) || x.LastName.ToLower().Equals(surname))
                                           .Where(x => string.IsNullOrEmpty(name) || x.FirstName.ToLower().Equals(name))
                                           .ToListAsync();

                var response = _mapper.Map<List<Responses.Guest>>(result);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize(Policy = EPolicies.Authorized)]
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetGuestsByInvitationName()
        {
            try
            {
                var surname = HttpContext.Request.Query["surname"].ToString().ToLower();
                var name = HttpContext.Request.Query["name"].ToString().ToLower();

                var invitation = await _context.GetAll<Models.Invitee>()
                                               .Include(x => x.Guests)
                                               .Where(x => string.IsNullOrEmpty(surname) || x.LastName.ToLower().Equals(surname))
                                               .Where(x => string.IsNullOrEmpty(name) || x.FirstName.ToLower().Equals(name))
                                               .ToListAsync();

                if (!invitation.Any())
                {
                    return NotFound("No valid invitation has been found");
                }

                var responses = _mapper.Map<List<Responses.Invitee>>(invitation);

                var result = responses.SelectMany(x => x.Guests).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [Authorize(Policy = EPolicies.Authorized)]
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> GetGuestById(int id)
        {
            try
            {
                var result = await _context.GetAll<Models.Guest>()
                                           .FirstOrDefaultAsync(x => x.GuestId.Equals(id));

                if (result == default)
                {
                    return NotFound("No guest has been found");
                }

                var response = _mapper.Map<Responses.Guest>(result);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        #endregion

        #region PUT

        [Authorize(Policy = EPolicies.Authorized)]
        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> UpdateInvitation([FromBody] Responses.Invitee request)
        {
            try
            {
                var entity = await _context.GetAll<Models.Invitee>()
                                           .Include(x => x.Guests)
                                           .FirstOrDefaultAsync(x => x.InvitationId.Equals(request.InvitationId));

                if (entity == default)
                {
                    return NotFound("No invitee has been found");
                }

                entity.Attending = request.Attending;
                entity.Email = string.IsNullOrEmpty(request.Email) ? entity.Email : request.Email;
                entity.GuestsCount = request.Guests.Count;

                foreach (var guest in request.Guests)
                {
                    var target = entity.Guests.FirstOrDefault(x => x.LastName.Equals(guest.LastName) && x.FirstName.Equals(guest.FirstName));

                    if (target == default)
                    {
                        var newGuest = _mapper.Map<Models.Guest>(guest);

                        entity.Guests.Add(newGuest);
                    }
                    else
                    {
                        target.ChosenMenu = guest.ChosenMenu;
                        target.Allergies = guest.Allergies;
                        target.Intolerances = guest.Intolerances;
                        target.Note = guest.Note;
                    }
                }

                _context.Modify(entity);

                await _context.SaveChangesAsync();

                Log.Information("Invitation updated");

                return Ok(request);
            }
            catch (Exception ex)
            {
                Log.Error("Failed to update invitations");

                return BadRequest(ex);
            }
        }

        [Authorize(Policy = EPolicies.Admin)]
        [HttpPut]
        [Route("[action]")]
        public async Task<IActionResult> UpdateGuest([FromBody] Responses.Guest request)
        {
            try
            {
                var entity = await _context.GetAll<Models.Guest>()
                                           .FirstOrDefaultAsync(x => x.GuestId.Equals(request.GuestId));

                if (entity == default)
                {
                    return NotFound("No guest has been found");
                }

                entity.ChosenMenu = request.ChosenMenu;
                entity.Allergies = request.Allergies;
                entity.Intolerances = request.Intolerances;
                entity.Note = request.Note;

                await _context.SaveChangesAsync();

                Log.Information("Guests updated");

                return Ok(request);
            }
            catch (Exception ex)
            {
                Log.Error("Failed to update guests information");

                return BadRequest(ex);
            }
        }

        #endregion

        #region POST

        [Authorize(Policy = EPolicies.Admin)]
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddInvitations([FromBody] List<Responses.Invitee> invitees)
        {
            try
            {
                foreach (var invitee in invitees)
                {
                    invitee.Password = Cryptography.EncryptString(invitee.Password, _encryptionString);
                }

                var entities = _mapper.Map<List<Models.Invitee>>(invitees);

                _context.AddRange(entities);

                await _context.SaveChangesAsync();

                Log.Information("Invitees added to the database");

                return Ok(invitees);
            }
            catch (Exception ex)
            {
                Log.Error("Could not add new invitations", ex);

                return BadRequest(ex);
            }
        }

        [Authorize(Policy = EPolicies.Admin)]
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddGuests([FromBody] ICollection<Responses.Guest> guests)
        {
            try
            {
                var entities = _mapper.Map<List<Models.Guest>>(guests);

                _context.AddRange(entities);

                await _context.SaveChangesAsync();

                Log.Information("Guests added to the database");

                return Ok(guests);
            }
            catch (Exception ex)
            {
                Log.Error("Could not add new guests", ex);

                return BadRequest(ex);
            }
        }

        #endregion
    
    }
}
