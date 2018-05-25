using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LocationSync.Model;

namespace LocationSync
{
    public interface ILocationService
    {
        Task<LocationResponse> Process(LocationRequest request);
        Task<MeetLocationResponse> GetMeetLocation(MeetLocationRequest request);
    }

    public class LocationService : ILocationService
    {
        private readonly ILocationCache _locationCache;

        public LocationService(ILocationCache locationCache)
        {
            _locationCache = locationCache;
        }

        /// <summary>
        /// enhance data to give accurate response to customer
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<LocationResponse> Process(LocationRequest request)
        {
            _locationCache.UpdateUserLocation(request.DeviceID, new UserLocation()
            {
                LatestUserLocation = request.ComputedLocation,
                UpdateTime = DateTime.Now,
                UserId = request.DeviceID
            });

            return request.ToResponse();
        }

        public async Task<MeetLocationResponse> GetMeetLocation(MeetLocationRequest request)
        {
            var responseDevices = GetUserLocations(request.TargetDeviceIds).ToArray();
            return new MeetLocationResponse()
            {
                CurrentLocation = request.CurrentLocation,
                SenderDeviceId = request.SenderDeviceId,
                TargetLocations = responseDevices
            };
        }

        private IEnumerable<UserLocation> GetUserLocations(string[] targetDeviceIds)
        {
            foreach (var targetDeviceId in targetDeviceIds)
            {
                if (_locationCache.TryGetUserLocation(targetDeviceId, out UserLocation location))
                {
                    yield return location;
                }
            }
        }
    }
}
