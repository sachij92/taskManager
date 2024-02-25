using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManagementAPI.API.Models;

namespace TaskManagementAPI.Models
{
    public class TasksDBContext : DbContext
    {
        public TasksDBContext(DbContextOptions<TasksDBContext> options) : base(options) { }

        public DbSet<Tasks> TaskData { get; set; }
        public DbSet<Users> UserData { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Tasks>(entity =>
            {

                entity.Property(e => e.DESCRIPTION)
                .IsRequired()
                .HasMaxLength(100);
            });

            base.OnModelCreating(builder);
        }

     
    }
}
