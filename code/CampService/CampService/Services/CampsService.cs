using Camps.API.Infrastructure;
using Camps.API.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Camps.API.Services
{
    public class CampsService : ICampsService
    {
        private readonly CampsContext _camps;

        public CampsService(CampsContext camps)
        {
            _camps = camps;
        }

        public async Task<List<Camp>> GetCamps() =>
            (await _camps.Camps.FindAsync(camp => true)).ToList();

        public async Task<Camp> GetCamp(string id) =>
            (await _camps.Camps.FindAsync(camp => camp.Id == id)).FirstOrDefault();

        public async Task<List<Category>> GetCampCategories(string id) =>
            (await _camps.Camps.FindAsync(camp => camp.Id == id)).FirstOrDefault().Categories;


        public async Task<Camp> CreateCamp(Camp camp)
        {
            camp.CreateAt = DateTime.Now;
            camp.UpdatedAt = DateTime.Now;
            await _camps.Camps.InsertOneAsync(camp);
            return camp;
        }

        public async Task UpdateCamp(string id, Camp campIn)
        {
            campIn.UpdatedAt = DateTime.Now;
            await _camps.Camps.ReplaceOneAsync(camp => camp.Id == id, campIn);
        }

        public async Task RemoveCamp(Camp campIn) =>
            await _camps.Camps.DeleteOneAsync(camp => camp.Id == campIn.Id);

        public async Task RemoveCamp(string id) =>
            await _camps.Camps.DeleteOneAsync(camp => camp.Id == id);
    }
}