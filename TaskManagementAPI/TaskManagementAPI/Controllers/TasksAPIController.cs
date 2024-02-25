using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using TaskManagementAPI.API.Models;
using TaskManagementAPI.Authentication;
using TaskManagementAPI.Models;

namespace TaskManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TasksAPIController : ControllerBase
    {
        private readonly TasksDBContext _context;
        public TasksAPIController(TasksDBContext context)
        {
            _context = context;
        }
        // Get Tasks by UserName

        [HttpGet]
   
        public async Task<IActionResult> GetAllTasks([FromQuery(Name = "userName")] string userName)
        {
            var tasks = await _context.TaskData
                .Where(x => x.IS_DELETED == false && x.USERNAME == userName)
                .OrderByDescending(x => x.CREATED_DTM)
                .ToListAsync();

            return Ok(tasks);
        }
        // Add Tasks
        [HttpPost]
        public async Task<IActionResult> AddTask(Tasks task)
        {
            if (task == null)
            {
                return NotFound();
            }
            task.CREATED_DTM = DateTime.Now;
            _context.TaskData.Add(task);
            await _context.SaveChangesAsync();

            return Ok(task);
        }

        // Update Task for Completed
        [HttpPut]
        [Route("{taskId:int}")]
        public async Task<IActionResult> UpdateTaskStatus([FromRoute] int taskId, Tasks taskUpdateData)
        {
            var task = await _context.TaskData.FindAsync(taskId);
            if(task == null)
            {
                return NotFound();
            }
            task.IS_COMPLETED = true;
            task.COMPLETED_DTM = DateTime.Now;
            await _context.SaveChangesAsync();
            return Ok(task);
        }


        // Update Task Data
        [HttpPut("{taskId:int}/UpdateData")]
        public async Task<ActionResult> UpdateTask(int taskId, [FromBody] Tasks taskUpdateData)
        {
            var task = await _context.TaskData.FindAsync(taskId);
            if (task == null)
            {
                return NotFound();
            }
            task.TITLE = taskUpdateData.TITLE;
            task.DESCRIPTION = taskUpdateData.DESCRIPTION;
            task.EDITED_DTM = DateTime.Now;
            task.IS_EDITED = true;
            await _context.SaveChangesAsync();
            return Ok(task);
        }

        // Delete Task by Id
        [HttpDelete]
        [Route("{taskId:int}")]
        public async Task<IActionResult> DeleteTasks([FromRoute] int taskId)
        {
            var task = await _context.TaskData.FindAsync(taskId);
            if (task == null)
            {
                return NotFound();
            }
            task.IS_DELETED = true;
            task.DELETED_DTM = DateTime.Now;
            await _context.SaveChangesAsync();
            return Ok(task);
        }
        protected string HashText(string text)
        {
            HashAlgorithm hasher = new SHA1CryptoServiceProvider();
            byte[] textWithSaltBytes = Encoding.UTF8.GetBytes(text);
            byte[] hashedBytes = hasher.ComputeHash(textWithSaltBytes);
            hasher.Clear();
            return Convert.ToBase64String(hashedBytes);
        }
    }

}
