using Camps.API.Models;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace Camps.API.Infrastructure
{
    public class CampsContext
    {
        private readonly IMongoDatabase _database;
        private readonly IConfiguration _configuration;

        public CampsContext(ICampsDatabaseSettings settings, IConfiguration configuration)
        {
            var client = new MongoClient(settings.ConnectionString);
            _database = client.GetDatabase(settings.DatabaseName);

            _configuration = configuration;
        }

        public IMongoCollection<Camp> Camps =>
            _database.GetCollection<Camp>(_configuration["CampsDatabaseSettings:CampsCollectionName"]);

        public IMongoCollection<Category> Categories =>
            _database.GetCollection<Category>(_configuration["CampsDatabaseSettings:CategoriesCollectionName"]);
    }
}