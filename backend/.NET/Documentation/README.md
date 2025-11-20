# .NET Template Documentation

## Quick Reference

### Port Configuration (Kestrel)

- **KESTREL_MASTER_SUMMARY.txt** - Executive summary (START HERE)
- **KESTREL_PORT_CONFIGURATION.md** - Complete technical guide with 4 solution approaches
- **KESTREL_CONFIG_QUICK_REFERENCE.txt** - One-page cheat sheet
- **KESTREL_REFACTORING_PLAN.md** - Phase-by-phase implementation strategy
- **KESTREL_VISUAL_GUIDE.txt** - Flowcharts and visual explanations
- **APPLY_KESTREL_CONFIG_TO_PROJECTS.md** - Quick implementation steps

### HTTP/3 & Compression

- **DOTNET_HTTP3_COMPRESSION_UPDATES.md** - Implementation details
- **HTTP3_COMPRESSION_IMPLEMENTATION_COMPLETE.md** - Completion summary
- **IMPLEMENTATION_CHECKLIST.md** - Verification steps

### .NET 10 Workflow Updates

- **DOTNET10_WORKFLOW_FIX.yml** - Corrected GitHub Actions workflow file
- **DOTNET10_WORKFLOW_MIGRATION.md** - Migration guide with changes
- **WORKFLOW_FIX_SUMMARY.txt** - Quick reference of fixes

### Summaries

- **FINAL_SUMMARY.txt** - Overall project summary
- **DOTNET_UPDATES_SUMMARY.txt** - Update overview

---

## What Changed

### Program.cs (All 5 Api Projects)

All 5 template projects now use **configuration-driven port management**:

```csharp
builder.WebHost.ConfigureKestrel((context, options) =>
{
    var port = int.Parse(context.Configuration["Kestrel:Port"] ?? "5000");
    options.ListenAnyIP(port, listenOptions => 
        listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3);
});
```

**Projects Updated:**

1. `1.LayeredArchitecture/1.CleanTemplate/Api/Program.cs`
2. `1.LayeredArchitecture/2.TemplateWithDataAccess/Api/Program.cs`
3. `2.CleanArchitecture/Api/Program.cs`
4. `3.VerticalSliceArchitecture/1.Traditional/Api/Program.cs`
5. `3.VerticalSliceArchitecture/2.Minimal/Api/Program.cs`

### appsettings.json (All 5 Api Projects)

All 5 projects now include Kestrel port configuration:

```json
{
  "Kestrel": {
    "Port": 5000
  }
}
```

**Benefits:**

- Environment variable override support: `Kestrel__Port=8080`
- Docker/Kubernetes friendly
- Development/Production flexibility
- Follows Twelve-Factor App principles

### GitHub Actions Workflow

- Updated to .NET 10.x
- Fixed paths with `backend/.NET/` prefix
- Corrected `include-prerelease` setting

---

## Next Steps

1. **Review** the port configuration in `KESTREL_MASTER_SUMMARY.txt`
2. **Test** each project: `dotnet run` (should use port 5000)
3. **Override** ports: `Kestrel__Port=8080 dotnet run`
4. **Deploy** with environment-specific configurations

---

## Configuration Priority (Highest to Lowest)

1. Environment variables: `Kestrel__Port=5000`
2. `appsettings.{Environment}.json` (Production/Development)
3. `appsettings.json`
4. Code default: `"5000"`

See `KESTREL_PORT_CONFIGURATION.md` for details.
