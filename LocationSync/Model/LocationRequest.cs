namespace LocationSync.Model
{
    public class LocationRequest
    {
        public string DeviceID { get; set; }
        public GNSSData Data { get; set; }
        public ComputedLocation ComputedLocation { get; set; }

        public LocationResponse ToResponse()
        {
            return new LocationResponse()
            {
                ComputedLocation = ComputedLocation,
                SenderDeviceId = DeviceID,
            };
        }
    }
}