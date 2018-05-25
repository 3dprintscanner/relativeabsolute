namespace LocationSync.Model
{
    public class LocationResponse
    {
        public string SenderDeviceId { get; set; }

        public ComputedLocation ComputedLocation { get; set; }
    }
}