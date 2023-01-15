using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Serilog;
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
    public class WeddingSiteController : BaseController
    {
        private readonly EncryptionStrings _encryption;

        public WeddingSiteController(IMapper _mapper, WeddingSiteDbContext _context, IOptions<EncryptionStrings> encryption) : base(_mapper, _context) 
        {
            _encryption = encryption.Value;
        }

        #region GET

        [Authorize(Policy = Policies.Authorized)]
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

        [Authorize(Policy = Policies.Authorized)]
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

        [Authorize(Policy = Policies.Authorized)]
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> GetInvitationById(int id)
        {
            try
            {
                var result = await _context.GetAll<Models.Invitee>()
                                           .Include(x => x.Guests)
                                           .Include(x => x.ActiveInvitee)
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

        [Authorize(Policy = Policies.Authorized)]
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

        [Authorize(Policy = Policies.Authorized)]
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

        [Authorize(Policy = Policies.Authorized)]
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

        [Authorize(Policy = Policies.Authorized)]
        [HttpGet]
        [Route("[action]/{id}")]
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

        [Authorize(Policy = Policies.Authorized)]
        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> GetGuestsByInvitationId(int id)
        {
            try
            {
                var result = await _context.GetAll<Models.Guest>()
                                           .Where(x => x.InvitationRefId.Equals(id))
                                           .ToListAsync();

                if (result == default)
                {
                    return NotFound("No guests have been found");
                }

                var response = _mapper.Map<List<Responses.Guest>>(result);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        #endregion

        #region PUT

        [Authorize(Policy = Policies.Authorized)]
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
                entity.Note = request.Note;
                entity.GuestsCount = request.Guests.Count;
                entity.Email = string.IsNullOrEmpty(request.Email) ? entity.Email : request.Email;

                foreach (var guest in entity.Guests)
                {
                    if (!request.Guests.Any(c => c.GuestId.Equals(guest.GuestId)))
                    {
                        _context.Delete(guest);
                    }
                }

                foreach (var guest in request.Guests)
                {
                    var target = entity.Guests.FirstOrDefault(x => x.GuestId.Equals(guest.GuestId));

                    if (target == default)
                    {
                        guest.GuestId = 0;

                        var newGuest = _mapper.Map<Models.Guest>(guest);

                        entity.Guests.Add(newGuest);
                    }
                    else
                    {
                        _context.Entry(target).CurrentValues.SetValues(guest);
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

        [Authorize(Policy = Policies.Authorized)]
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

        [Authorize(Policy = Policies.Admin)]
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddInvitations([FromBody] List<Responses.Invitee> invitees)
        {
            try
            {
                var encryptionString = _encryption.CryptographyString;
                
                foreach (var invitee in invitees)
                {
                    invitee.Password = Cryptography.EncryptString(invitee.Password, encryptionString);
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

        [Authorize(Policy = Policies.Admin)]
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
