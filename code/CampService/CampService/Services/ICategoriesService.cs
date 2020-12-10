using Camps.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Camps.API.Services
{
    public interface ICategoriesService
    {
        Task<List<Category>> GetCategories();
        Task<Category> GetCategory(string id);
        Task<Category> CreateCategory(Category category);
        Task UpdateCategory(string id, Category categoryIn);
        Task RemoveCategory(Category categoryIn);
        Task RemoveCategory(string id);
    }
}