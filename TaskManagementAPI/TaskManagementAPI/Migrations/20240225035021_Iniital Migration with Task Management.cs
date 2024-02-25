using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskManagementAPI.Migrations
{
    public partial class IniitalMigrationwithTaskManagement : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaskData",
                columns: table => new
                {
                    TASK_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    USERNAME = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TITLE = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DESCRIPTION = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CREATED_DTM = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IS_COMPLETED = table.Column<bool>(type: "bit", nullable: false),
                    COMPLETED_DTM = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IS_EDITED = table.Column<bool>(type: "bit", nullable: false),
                    EDITED_DTM = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IS_DELETED = table.Column<bool>(type: "bit", nullable: false),
                    DELETED_DTM = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskData", x => x.TASK_ID);
                });

            migrationBuilder.CreateTable(
                name: "UserData",
                columns: table => new
                {
                    USER_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    USERNAME = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PASSWORD = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserData", x => x.USER_ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaskData");

            migrationBuilder.DropTable(
                name: "UserData");
        }
    }
}
