using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LocationSync;
using LocationSync.Model;
using Microsoft.AspNetCore.Mvc;

namespace TranslocationSyncService.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class LocationsController : Controller
    {
        private readonly ILocationService _impl;

        public LocationsController(ILocationService impl)
        {
            _impl = impl;
        }

        [HttpPost]
        public async Task<IActionResult> EstimatedLocation([FromBody]LocationRequest request)
        {
            var result = await _impl.Process(request);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> MeetLocations([FromBody] MeetLocationRequest request)
        {
            var result = await _impl.GetMeetLocation(request);
            return Ok(result);
        }


        [HttpGet("[action]")]
        public async Task<IActionResult> DummyMeetLocations()
        {
            var resp = new MeetLocationResponse()
            {
                CurrentLocation = new ComputedLocation()
                {
                    Latitude = 51.1,
                    Longitude = -0.1
                },
                SenderDeviceId = "1",
                TargetLocations = CreateDummyUserLocations().ToArray()
            };

            return Ok(resp);
        }



        private IEnumerable<UserLocation> CreateDummyUserLocations()
        {
            for (int i = 0; i < new Random().Next(1,10); i++)
            {
                yield return new UserLocation()
                {
                    UserId = i.ToString(),
                    LatestUserLocation = new ComputedLocation()
                    {
                        Latitude = 51.195 + new Random().NextDouble(),
                        Longitude = -0.1 + new Random().NextDouble()
                    }
                };
            }
        }
    }
}