using System;

namespace LocationSync.Model
{
    public class UserLocation
    {
        public string UserId { get; set; }
        public ComputedLocation LatestUserLocation { get; set; }
        public DateTime UpdateTime { get; set; }
    }
}