using Camps.API.Models;
using Camps.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Camps.API.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoriesService _categoriesService;
        private readonly ILogger<CategoriesController> _logger;

        public CategoriesController(ICategoriesService categoriesService, ILogger<CategoriesController> logger)
        {
            _categoriesService = categoriesService;
            _logger = logger;
        }

        /// <summary>
        ///     List of categories
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /api/Categories
        ///
        /// </remarks>
        /// <returns>List of categories</returns>
        /// <response code="200">Returns list of categories</response>
        /// <response code="400">Bad request error massage</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                var result = await _categoriesService.GetCategories();
                if (result == null)
                {
                    _logger.LogError("Error getting categories. Categories not found.");
                    return NotFound("Error getting categories. Categories not found.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting categories.", ex);
                return BadRequest("Error getting categories.");
            }
        }

        /// <summary>
        ///     Category object
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     GET /api/Categories/5fc7db84bad96d1122af5644
        ///
        /// </remarks>
        /// <param name="id">MongoDB object id</param>
        /// <returns>Category object</returns>
        /// <response code="200">Returns category object</response>
        /// <response code="400">Bad request error massage</response>
        /// <response code="404">Not found category</response>
        [HttpGet("{id:length(24)}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetCategory(string id)
        {
            try
            {
                var result = await _categoriesService.GetCategory(id);
                if (result == null)
                {
                    _logger.LogError("Error getting category. Category not found.");
                    return NotFound("Error getting category. Category not found.");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error getting category.", ex);
                return BadRequest("Error getting category.");
            }
        }

        /// <summary>
        ///     Create category
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     POST /api/Categories
        ///     {
        ///        "Title": "More more more - kamperina na MORU",
        ///        "Description": "More more more more dok ja veslam ona suti sutim i ja."
        ///     }
        /// 
        /// </remarks>
        /// <param name="category">Category object</param>
        /// <returns>A newly created category</returns>
        /// <response code="201">Returns the newly created category</response>
        /// <response code="400">If category is null</response>  
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public async Task<IActionResult> CreateCategory(Category category)
        {
            try
            {
                var result = await _categoriesService.CreateCategory(category);
                if (result == null)
                {
                    _logger.LogError("Error creating category.");
                    return BadRequest("Error creating category.");
                }

                return CreatedAtAction(nameof(GetCategory), new {id = result.Id}, result);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error creating category.", ex);
                return BadRequest("Error creating category.");
            }
        }

        /// <summary>
        ///     Update category
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     PUT /api/Categories/5fc7db84bad96d1122af5644
        ///     {
        ///        "Id": "5fc7db84bad96d1122af5644",
        ///        "Title": "More more more - kamperina na MORU",
        ///        "Description": "More more more more dok ja veslam ona suti sutim i ja."
        ///     }
        /// 
        /// </remarks>
        /// <param name="id">MongoDB object id</param>
        /// <param name="categoryIn">Category object</param>
        /// <response code="204">No content</response>
        /// <response code="404">If the category is null</response>
        /// <response code="400">Bad request arguments</response>
        [HttpPut("{id:length(24)}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public async Task<IActionResult> UpdateCategory(string id, Category categoryIn)
        {
            try
            {
                if (categoryIn.Id != id)
                {
                    _logger.LogError($"Error updating category. Argument ID exception. {id} != {categoryIn.Id}");
                    return BadRequest($"Error updating category. Argument ID exception. {id} != {categoryIn.Id}");
                }

                var result = await _categoriesService.GetCategory(id);
                if (result == null)
                {
                    _logger.LogError("Error updating category. Category not found.");
                    return NotFound("Error updating category. Category not found.");
                }

                await _categoriesService.UpdateCategory(id, categoryIn);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error updating category.", ex);
                return BadRequest("Error updating category.");
            }
        }

        /// <summary>
        ///     Delete category
        /// </summary>
        /// <remarks>
        /// Sample request:
        /// 
        ///     DELETE /api/Categories/5fc7db84bad96d1122af5644
        /// 
        /// </remarks>
        /// <param name="id">MongoDB object id</param>
        /// <response code="204">No content</response>
        /// <response code="404">If the category is null</response>
        /// <response code="400">Bad request arguments</response> 
        [HttpDelete("{id:length(24)}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize]
        public async Task<IActionResult> DeleteCategory(string id)
        {
            try
            {
                var category = await _categoriesService.GetCategory(id);

                if (category == null)
                {
                    _logger.LogError("Error deleting category. Category not found.");
                    return NotFound("Error deleting category. Category not found.");
                }

                await _categoriesService.RemoveCategory(category.Id);

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError("Error deleting category.", ex);
                return BadRequest("Error deleting category.");
            }
        }
    }
}