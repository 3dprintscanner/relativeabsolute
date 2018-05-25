namespace LocationSync.Model
{
    public class MeetLocationResponse
    {
        public string SenderDeviceId { get; set; }
        public ComputedLocation CurrentLocation { get; set; }
        public UserLocation[] TargetLocations { get; set; }
    }
}