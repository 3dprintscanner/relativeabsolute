using LocationSync.Model;
using Microsoft.Extensions.Caching.Memory;

namespace LocationSync
{
    public interface ILocationCache
    {
        bool TryGetUserLocation(string userId, out UserLocation location);
        void UpdateUserLocation(string userId, UserLocation location);
    }

    public class LocationCache : ILocationCache
    {
        private readonly IMemoryCache _cache = new MemoryCache(new MemoryDistributedCacheOptions());
        public bool TryGetUserLocation(string userId, out UserLocation location)
        {
            if (_cache.TryGetValue(userId, out var value) && value is UserLocation)
            {
                location = (UserLocation) value;
                return true;
            }

            location = null;
            return false;
        }

        public void UpdateUserLocation(string userId, UserLocation location)
        {
            if(_cache.TryGetValue(userId, out var value))
            {
                if (value is UserLocation)
                {
                    _cache.Set(userId, location);
                }
            }
        }
    }
}