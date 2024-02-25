using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManagementAPI.API.Models
{
    public class Tasks
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TASK_ID { get; set; }
        public string USERNAME { get; set; }
        public string TITLE { get; set; }
        public string DESCRIPTION { get; set; }
        public DateTime CREATED_DTM { get; set; }
        public bool IS_COMPLETED { get; set; }
        public DateTime COMPLETED_DTM { get; set; }
        public bool IS_EDITED { get; set; }
        public DateTime EDITED_DTM { get; set; }
        public bool IS_DELETED { get; set; }
        public DateTime DELETED_DTM { get; set; }




    }
}
