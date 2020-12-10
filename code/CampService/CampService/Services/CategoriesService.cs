using Camps.API.Infrastructure;
using Camps.API.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Camps.API.Services
{
    public class CategoriesService : ICategoriesService
    {
        private readonly CampsContext _db;

        public CategoriesService(CampsContext db)
        {
            _db = db;
        }

        public async Task<List<Category>> GetCategories() =>
            (await _db.Categories.FindAsync(category => true)).ToList();

        public async Task<Category> GetCategory(string id) =>
            (await _db.Categories.FindAsync(category => category.Id == id)).FirstOrDefault();

        public async Task<Category> CreateCategory(Category category)
        {
            category.CreateAt = DateTime.Now;
            category.UpdatedAt = DateTime.Now;
            await _db.Categories.InsertOneAsync(category);
            return category;
        }

        public async Task UpdateCategory(string id, Category categoryIn)
        {
            categoryIn.UpdatedAt = DateTime.Now;
            await _db.Categories.ReplaceOneAsync(category => category.Id == id, categoryIn);
        }

        public async Task RemoveCategory(Category categoryIn) =>
            await _db.Categories.DeleteOneAsync(category => category.Id == categoryIn.Id);

        public async Task RemoveCategory(string id) =>
            await _db.Categories.DeleteOneAsync(category => category.Id == id);
    }
}