namespace Camps.API.Infrastructure
{
    public class CampsDatabaseSettings : ICampsDatabaseSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
        public string CampsCollectionName { get; set; }
    }

    public interface ICampsDatabaseSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
        string CampsCollectionName { get; set; }
    }
}