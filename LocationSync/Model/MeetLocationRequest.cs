namespace LocationSync.Model
{
    public class MeetLocationRequest
    {
        public string SenderDeviceId { get; set; }
        public ComputedLocation CurrentLocation { get; set; }
        public string[] TargetDeviceIds { get; set; }
    }
}