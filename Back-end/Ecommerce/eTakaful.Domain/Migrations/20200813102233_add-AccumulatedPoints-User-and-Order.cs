using Microsoft.EntityFrameworkCore.Migrations;

namespace Ecommerce.Domain.Migrations
{
    public partial class addAccumulatedPointsUserandOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AccumulatedPoints",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AccumulatedPoints",
                table: "Orders",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AccumulatedPoints",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AccumulatedPoints",
                table: "Orders");
        }
    }
}
