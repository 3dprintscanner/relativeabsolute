using System.Threading.Tasks;
using LocationSync;
using LocationSync.Model;
using Microsoft.AspNetCore.Mvc;

namespace TranslocationSyncService.Controllers
{
    [Produces("application/json")]
    [Route("api/Locations")]
    public class LocationsController : Controller
    {
        private readonly ILocationService _impl;

        public LocationsController(ILocationService impl)
        {
            _impl = impl;
        }

        [HttpPost]
        public async Task<IActionResult> GetEstimatedLocation([FromBody]LocationRequest request)
        {
            var result = await _impl.Process(request);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> GetMeetLocations([FromBody] MeetLocationRequest request)
        {
            var result = await _impl.GetMeetLocation(request);
            return Ok(result);
        }
    }
}