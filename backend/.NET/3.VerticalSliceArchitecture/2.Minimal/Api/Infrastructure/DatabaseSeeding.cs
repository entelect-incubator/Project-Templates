namespace Api.Infrastructure;

using Core;
using Core.Pizzas.V1.Database.Entities;
using Microsoft.EntityFrameworkCore;

/// <summary>
/// Handles database initialization and seeding with sample pizza data
/// </summary>
public static class DatabaseSeeding
{
    public static async Task InitializeAndSeedAsync(IServiceProvider serviceProvider, bool interactive = false)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

        // Ensure database is created
        await context.Database.EnsureCreatedAsync();

        // Check if database already has data
        var hasExistingData = await context.Pizzas.AnyAsync();

        if (hasExistingData && interactive)
        {
            Console.WriteLine("\n📊 Database already contains pizza data.");
            if (await PromptUserForResetAsync())
            {
                await ResetDatabaseAsync(context);
            }
            else
            {
                Console.WriteLine("✓ Keeping existing data.\n");
                return;
            }
        }

        if (!hasExistingData || (interactive && await PromptUserForResetAsync()))
        {
            await SeedSamplePizzasAsync(context);
        }
    }

    /// <summary>
    /// Seeds sample pizza data without user interaction
    /// </summary>
    /// <param name="serviceProvider">Service provider</param>
    /// <returns>representing the asynchronous operation.</returns>
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

        // Check if database already has data
        var hasExistingData = await context.Pizzas.AnyAsync();

        if (!hasExistingData)
        {
            await SeedSamplePizzasAsync(context);
        }
        else
        {
            Console.WriteLine("\n📊 Database already contains pizza data. Skipping seed.");
        }
    }

    /// <summary>
    /// Cleans all pizza and order data with confirmation
    /// </summary>
    /// <param name="serviceProvider">Service provider</param>
    /// <param name="requireConfirmation">Requiered confirmation</param>
    /// <returns>representing the asynchronous bool.</returns>
    public static async Task<bool> CleanDataAsync(IServiceProvider serviceProvider, bool requireConfirmation = true)
    {
        using var scope = serviceProvider.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

        if (requireConfirmation)
        {
            Console.WriteLine("\n⚠️  WARNING: This will delete ALL pizza and order data!");
            var hasData = await context.Pizzas.AnyAsync();
            if (!hasData)
            {
                Console.WriteLine("✓ No data to clean.\n");
                return false;
            }

            if (!await PromptUserForConfirmationAsync())
            {
                Console.WriteLine("✓ Clean operation cancelled.\n");
                return false;
            }
        }

        try
        {
            Console.WriteLine("\n🧹 Cleaning database...");

            // Delete all orders first (foreign key constraint)
            var orderCount = await context.Orders.ExecuteDeleteAsync();
            Console.WriteLine($"   • Deleted {orderCount} orders");

            // Delete all pizzas
            var pizzaCount = await context.Pizzas.ExecuteDeleteAsync();
            Console.WriteLine($"   • Deleted {pizzaCount} pizzas");

            await context.SaveChangesAsync();
            Console.WriteLine("✓ Database cleaned successfully.\n");
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Error cleaning database: {ex.Message}");
            return false;
        }
    }

    private static async Task SeedSamplePizzasAsync(DatabaseContext context)
    {
        var samplePizzas = new List<Pizza>
        {
            new() { Name = "Margherita", Disabled = false, DateCreated = DateTime.UtcNow },
            new() { Name = "Pepperoni", Disabled = false, DateCreated = DateTime.UtcNow },
            new() { Name = "Hawaiian", Disabled = false, DateCreated = DateTime.UtcNow },
            new() { Name = "BBQ Chicken", Disabled = false, DateCreated = DateTime.UtcNow },
            new() { Name = "Vegetarian", Disabled = false, DateCreated = DateTime.UtcNow },
            new() { Name = "Four Cheese", Disabled = false, DateCreated = DateTime.UtcNow },
            new() { Name = "Mushroom Truffle", Disabled = false, DateCreated = DateTime.UtcNow },
            new() { Name = "Spicy Italian", Disabled = true, DateCreated = DateTime.UtcNow },
        };

        context.Pizzas.AddRange(samplePizzas);
        await context.SaveChangesAsync();

        Console.WriteLine($"\n✅ Successfully seeded {samplePizzas.Count} pizzas to the database.");
        Console.WriteLine("🍕 Sample pizzas created:\n");
        foreach (var pizza in samplePizzas)
        {
            var status = pizza.Disabled ?? false ? "[DISABLED]" : "[ACTIVE]";
            Console.WriteLine($"   • {pizza.Name} {status}");
        }

        Console.WriteLine();
    }

    private static async Task ResetDatabaseAsync(DatabaseContext context)
    {
        try
        {
            Console.WriteLine("\n🔄 Resetting database...");
            await context.Database.EnsureDeletedAsync();
            await context.Database.EnsureCreatedAsync();
            Console.WriteLine("✓ Database reset successfully.\n");

            await SeedSamplePizzasAsync(context);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Error resetting database: {ex.Message}");
        }
    }

    private static async Task<bool> PromptUserForResetAsync()
    {
        Console.WriteLine("\n❓ Would you like to reset the database and reseed it? (y/n)");
        var response = await GetUserInputAsync();
        return response?.ToLower() == "y";
    }

    private static async Task<bool> PromptUserForConfirmationAsync()
    {
        Console.WriteLine("❓ Are you sure? Type 'yes' to confirm: ");
        var response = await GetUserInputAsync();
        return response?.ToLower() == "yes";
    }

    private static Task<string?> GetUserInputAsync()
    {
        return Task.FromResult(Console.ReadLine());
    }
}
