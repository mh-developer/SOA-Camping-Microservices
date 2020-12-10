using Camps.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Camps.API.Services
{
    public interface ICampsService
    {
        Task<List<Camp>> GetCamps();
        Task<Camp> GetCamp(string id);
        Task<List<Category>> GetCampCategories(string id);
        Task<Camp> CreateCamp(Camp camp);
        Task UpdateCamp(string id, Camp campIn);
        Task RemoveCamp(Camp campIn);
        Task RemoveCamp(string id);
    }
}