# Getting Started with Project Templates

A step-by-step guide to get up and running with Project Templates, from choosing your template to deploying your first application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Choosing Your Template](#choosing-your-template)
3. [Setup Instructions](#setup-instructions)
4. [Project Structure Overview](#project-structure-overview)
5. [Common Tasks](#common-tasks)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required

**Git**
- Download: [https://git-scm.com/downloads](https://git-scm.com/downloads)
- Verify: `git --version`

### For .NET Templates

**Supported Operating Systems:**
- Windows 10 / 11
- macOS 10.14+
- Linux (Ubuntu, Fedora, etc.)

**Required Software:**
- **.NET 9 SDK** - [Download](https://dotnet.microsoft.com/download)
  - Verify: `dotnet --version`
  - Should show version 9.0.x or higher

**Recommended**
- **Visual Studio** 2022 Community (Free)
- **Visual Studio Code** with C# extension
- **SQL Server Express** (optional, for local development)

### For React Templates

*Coming soon*

---

## Choosing Your Template

### Step 1: Understand Your Project Needs

Ask yourself these questions:

1. **What is your project timeline?**
   - Very tight (< 1 month) → Layered Architecture
   - Normal (1-3 months) → Layered or Vertical Slice
   - Extended timeline → Clean Architecture

2. **How complex is your business logic?**
   - Simple (basic CRUD) → Layered
   - Medium (some complex workflows) → Vertical Slice
   - Complex (multiple systems integration) → Clean

3. **How big will your team be?**
   - Solo or small (1-3 people) → Layered
   - Medium (4-10 people) → Vertical Slice
   - Large (> 10 people) → Clean or Vertical Slice

4. **How long will this project live?**
   - Short-term (< 1 year) → Layered
   - Medium-term (1-3 years) → Vertical Slice
   - Long-term (> 3 years) → Clean

### Step 2: Review Architecture Overview

Read the [ARCHITECTURE.md](ARCHITECTURE.md) guide for detailed information about each pattern.

### Step 3: Make Your Decision

Based on your answers and the architecture guide, choose:

- **Layered Architecture** - Most projects should start here
- **Clean Architecture** - If long-term maintenance is critical
- **Vertical Slice Architecture** - If agile/rapid delivery is critical

### Decision Quick Reference

| Scenario                         | Recommendation               |
| -------------------------------- | ---------------------------- |
| First project, small team        | **Layered** ✓                |
| Quick MVP needed                 | **Layered** ✓                |
| Complex domain, large team       | **Clean** ✓                  |
| Agile team, independent features | **Vertical Slice** ✓         |
| Unsure                           | **Layered** (safe default) ✓ |

---

## Setup Instructions

### Backend - .NET Setup

#### Option 1: Clone from GitHub (Recommended)

```bash
# 1. Clone the entire repository
git clone https://github.com/entelect-incubator/Project-Templates.git
cd Project-Templates/backend/.NET

# 2. Choose your template
cd 1.LayeredArchitecture
# (or 2.CleanArchitecture, or 3.VerticalSliceArchitecture)
```

#### Option 2: Copy Template Locally

```bash
# 1. Download the repository as ZIP
# https://github.com/entelect-incubator/Project-Templates/archive/refs/heads/master.zip

# 2. Extract and navigate
cd Project-Templates/backend/.NET/1.LayeredArchitecture

# 3. Copy to your project location
cp -r . ../../../MyNewProject
cd ../../../MyNewProject
```

#### Option 3: Use Template Directly (No Copy)

```bash
# Navigate to your chosen template
cd Project-Templates/backend/.NET/1.LayeredArchitecture

# Create a new solution from the template
dotnet new -i .
```

### Initial Configuration

#### 1. Install Dependencies

```bash
# From the template root directory
dotnet restore
```

#### 2. Update Project Names

If copying the template, rename projects to match your application:

```bash
# Example: Renaming from "CleanArchitecture" to "MyApp"
# Find and replace in:
# - Solution files (.sln)
# - Project files (.csproj)
# - Namespace declarations
```

#### 3. Configure Database Connection

Edit `appsettings.json` (in the API project):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=MyAppDb;User Id=sa;Password=YourPassword;"
  }
}
```

**Connection String Examples:**

SQL Server (Local):
```
Server=.;Database=MyAppDb;Trusted_Connection=true;
```

SQL Server (Named Instance):
```
Server=.\SQLEXPRESS;Database=MyAppDb;Trusted_Connection=true;
```

PostgreSQL:
```
Host=localhost;Port=5432;Database=MyAppDb;Username=postgres;Password=password;
```

SQLite:
```
Data Source=myapp.db;
```

#### 4. Apply Database Migrations

```bash
# Navigate to the API project directory
cd src/MyApp.Api

# Apply migrations to create database
dotnet ef database update

# Create a new migration (after model changes)
dotnet ef migrations add MigrationName

# Revert last migration
dotnet ef migrations remove
```

#### 5. Run the Application

```bash
# Navigate to API project
cd src/MyApp.Api

# Run with dotnet CLI
dotnet run

# Or run in watch mode (auto-restart on changes)
dotnet watch run

# Or use Visual Studio (F5)
```

The API will be available at:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`

#### 6. Explore the API

Navigate to the Swagger UI:
```
https://localhost:5001/swagger/index.html
```

You can test all endpoints directly from the browser.

---

## Project Structure Overview

### Typical .NET Project Layout

```
MyApp/
├── src/
│   ├── MyApp.Api/                    # Web API layer
│   │   ├── Controllers/              # API endpoints
│   │   ├── Middleware/               # Custom middleware
│   │   ├── Filters/                  # Action filters
│   │   ├── appsettings.json         # Configuration
│   │   ├── Program.cs               # Startup configuration
│   │   └── MyApp.Api.csproj
│   │
│   ├── MyApp.Application/           # Business logic
│   │   ├── Features/                # Feature modules
│   │   │   ├── Users/
│   │   │   ├── Products/
│   │   │   └── Orders/
│   │   ├── Behaviors/               # Pipeline behaviors
│   │   ├── Validators/              # Validation rules
│   │   ├── Exceptions/              # Custom exceptions
│   │   ├── AutoMapper/              # DTO mappings
│   │   └── MyApp.Application.csproj
│   │
│   ├── MyApp.Domain/                # Core entities
│   │   ├── Entities/                # Domain models
│   │   ├── Interfaces/              # Abstractions
│   │   ├── Specifications/          # Domain specs
│   │   ├── Exceptions/              # Domain exceptions
│   │   └── MyApp.Domain.csproj
│   │
│   ├── MyApp.Infrastructure/        # Data & services
│   │   ├── Data/
│   │   │   ├── ApplicationDbContext.cs
│   │   │   └── Migrations/
│   │   ├── Repositories/            # Data access
│   │   ├── Services/                # External services
│   │   └── MyApp.Infrastructure.csproj
│   │
│   └── MyApp.Shared/                # Cross-cutting
│       ├── Constants/
│       ├── Extensions/
│       ├── Exceptions/
│       └── MyApp.Shared.csproj
│
├── tests/
│   ├── MyApp.Application.Tests/     # Application tests
│   ├── MyApp.Domain.Tests/          # Domain tests
│   ├── MyApp.Api.Tests/             # API tests
│   └── MyApp.Integration.Tests/     # Integration tests
│
├── MyApp.sln                        # Solution file
├── README.md
└── .gitignore
```

### Key Directories Explained

**src/MyApp.Api**
- Entry point of the application
- HTTP request/response handling
- Swagger/OpenAPI configuration
- CORS and middleware setup

**src/MyApp.Application**
- Business logic implementation
- CQRS command/query handlers (if using MediatR)
- Data validation
- Cross-cutting concerns

**src/MyApp.Domain**
- Pure business entities
- Business logic that shouldn't depend on frameworks
- Contracts and interfaces

**src/MyApp.Infrastructure**
- Database context and migrations
- Repository implementations
- External service integrations
- Implementation details

**tests/**
- Unit tests for business logic
- Integration tests for API
- Test fixtures and helpers

---

## Common Tasks

### Building the Project

```bash
# Build solution
dotnet build

# Build with specific configuration
dotnet build -c Release

# Clean build
dotnet clean && dotnet build
```

### Running Tests

```bash
# Run all tests
dotnet test

# Run tests with coverage
dotnet test /p:CollectCoverage=true

# Run specific test project
dotnet test tests/MyApp.Application.Tests

# Run with verbose output
dotnet test -v d
```

### Adding NuGet Packages

```bash
# Add to specific project
dotnet add MyApp.Application package MediatR

# Add specific version
dotnet add MyApp.Application package MediatR --version 12.0.0

# List packages
dotnet package list
```

### Database Management

```bash
# Create new migration
dotnet ef migrations add AddUserTable -p src/MyApp.Infrastructure -s src/MyApp.Api

# Update database
dotnet ef database update -p src/MyApp.Infrastructure -s src/MyApp.Api

# Remove migrations
dotnet ef migrations remove -p src/MyApp.Infrastructure -s src/MyApp.Api

# Create SQL script
dotnet ef migrations script -p src/MyApp.Infrastructure -s src/MyApp.Api -o migrations.sql
```

### Code Formatting

```bash
# Format all code
dotnet format

# Show formatting issues without applying
dotnet format --verify-no-changes

# Format specific file
dotnet format path/to/file.cs
```

### Publishing the Application

```bash
# Publish to Release folder
dotnet publish -c Release -o ./publish

# Create Docker image (if Dockerfile exists)
docker build -t myapp .

# Publish to folder for deployment
dotnet publish -c Release --self-contained -r win-x64 -o ./publish
```

---

## Project Customization

### Renaming the Project

1. **Update Solution File:**
   - Open `MyApp.sln` in an editor
   - Replace `MyApp` with your project name

2. **Rename Project Folders:**
   ```bash
   ren src\MyApp.Api src\YourApp.Api
   ren src\MyApp.Application src\YourApp.Application
   # ... and so on
   ```

3. **Update Project Files:**
   - Open each `.csproj` file
   - Update assembly name and root namespace

4. **Update Namespaces:**
   - Search and replace `MyApp` → `YourApp` across all files

5. **Update appsettings.json:**
   - Update any references to the old project name

### Adding New Features

#### Example: Adding a User Management Feature

1. **Create domain entity** (`src/MyApp.Domain/Entities/User.cs`)
2. **Create commands/queries** (`src/MyApp.Application/Features/Users/`)
3. **Create handlers** (`src/MyApp.Application/Features/Users/Handlers/`)
4. **Create controller** (`src/MyApp.Api/Controllers/UsersController.cs`)
5. **Add migrations** for database changes
6. **Add tests** (`tests/MyApp.Application.Tests/Features/Users/`)

### Modifying the Database

```bash
# 1. Make changes to your domain entities
# 2. Create migration
dotnet ef migrations add DescriptiveChangeName

# 3. Review the generated migration file
# 4. Update database
dotnet ef database update
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: "Entity Framework migrations not found"

**Solution:**
```bash
# Ensure you're in the correct directory with DbContext
dotnet ef migrations list -p src/MyApp.Infrastructure -s src/MyApp.Api

# Verify DbContext is registered in DI container (Program.cs)
```

#### Issue: "Database connection failed"

**Solution:**
```bash
# 1. Verify connection string in appsettings.json
# 2. Ensure database server is running
# 3. Check firewall rules
# 4. Test connection with sqlcmd or pgAdmin
```

#### Issue: "Port already in use"

**Solution:**
```bash
# Change the port in launchSettings.json or use:
dotnet run --urls "https://localhost:7777"

# Or kill the process using the port
# Windows: netstat -ano | findstr :5001
# Linux/Mac: lsof -i :5001
```

#### Issue: ".NET SDK not found"

**Solution:**
```bash
# Verify .NET installation
dotnet --version

# If needed, download and install from:
https://dotnet.microsoft.com/download

# Check global.json version requirement (if present)
cat global.json
```

#### Issue: "Build errors after template rename"

**Solution:**
```bash
# 1. Clean solution
dotnet clean

# 2. Remove bin/obj folders
rm -r src/*/bin src/*/obj tests/*/bin tests/*/obj

# 3. Restore packages
dotnet restore

# 4. Rebuild
dotnet build
```

#### Issue: "Tests fail with configuration errors"

**Solution:**
```bash
# Ensure test appsettings.json exists
# Copy appsettings.json to test project if needed
# Verify test project has proper configuration

# Run with verbose output
dotnet test -v d
```

---

## Next Steps

Once you have the template running:

1. **Read the Architecture Guide** - Understand your chosen pattern
2. **Explore the Examples** - Each template includes example features
3. **Review Test Examples** - See how testing is structured
4. **Add Your First Feature** - Extend the template with your logic
5. **Join the Community** - Contribute improvements back

---

## Getting Help

- **GitHub Issues** - Report bugs or ask questions
- **GitHub Discussions** - General questions and best practices
- **See Also**
  - [ARCHITECTURE.md](ARCHITECTURE.md) - Pattern comparison and explanation
  - [README.md](README.md) - Project overview
  - [CONTRIBUTING.md](CONTRIBUTING.md) - Contributing guidelines
  - [backend/.NET/README.md](backend/.NET/README.md) - .NET specific documentation

---

## Tips for Success

✅ **Start Small** - Understand the template structure before adding complexity
✅ **Keep Dependencies Clean** - Respect the architecture's dependency rules
✅ **Write Tests** - Each new feature should have tests
✅ **Document Decisions** - Explain why you made architectural choices
✅ **Code Reviews** - Review changes to maintain consistency
✅ **Consistent Naming** - Use clear, descriptive names throughout
✅ **Refactor Regularly** - Improve code quality as you go

---

**Happy Coding! 🚀**

*Built with ❤️ by the Entelect Incubator team*
