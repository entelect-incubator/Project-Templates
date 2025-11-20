# Implementation Plan - Kestrel Configuration Refactoring

## Summary

Replace hardcoded ports with configuration-based approach across all 5 .NET template projects.

## Files to Modify

### 1. Api/Program.cs (5 projects)

**Change from:**
```csharp
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5000, listenOptions => 
        listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3);
});
```

**Change to:**
```csharp
builder.WebHost.ConfigureKestrel((context, options) =>
{
    var port = int.Parse(context.Configuration["Kestrel:Port"] ?? "5000");
    
    options.ListenAnyIP(port, listenOptions =>
    {
        listenOptions.Protocols = HttpProtocols.Http1AndHttp2AndHttp3;
    });
});
```

**Projects:**
1. `1.LayeredArchitecture/1. CleanTemplate/Api/Program.cs`
2. `1.LayeredArchitecture/2. TemplateWithDataAccess/Api/Program.cs`
3. `2.CleanArchitecture/Api/Program.cs`
4. `3.VerticalSliceArchitecture/1.Traditional/Api/Program.cs`
5. `3.VerticalSliceArchitecture/2.Minimal/Api/Program.cs`

### 2. appsettings.json (5 projects)

Add or update the Kestrel section:

```json
{
  "Kestrel": {
    "Port": 5000
  }
}
```

**Location in each project:**
- `1.LayeredArchitecture/1. CleanTemplate/Api/appsettings.json`
- `1.LayeredArchitecture/2. TemplateWithDataAccess/Api/appsettings.json`
- `2.CleanArchitecture/Api/appsettings.json`
- `3.VerticalSliceArchitecture/1.Traditional/Api/appsettings.json`
- `3.VerticalSliceArchitecture/2.Minimal/Api/appsettings.json`

### 3. appsettings.Development.json (optional - 5 projects)

Create if doesn't exist, or add section:

```json
{
  "Kestrel": {
    "Port": 5000
  }
}
```

### 4. appsettings.Production.json (optional - 5 projects)

Create or update with production port:

```json
{
  "Kestrel": {
    "Port": 80
  }
}
```

---

## Benefits

| Aspect               | Before               | After                     |
| -------------------- | -------------------- | ------------------------- |
| Port Management      | Hardcoded in code    | In configuration files    |
| Environment-Specific | Same port everywhere | Different per environment |
| Docker Support       | Requires code change | Use env variables         |
| CI/CD Integration    | Manual updates       | Automatic via variables   |
| Team Consistency     | Varies per developer | Standardized              |
| Documentation        | In code              | In README + config        |

---

## Deployment Examples

### Development
```bash
dotnet run
# Uses: Port 5000 from appsettings.json
```

### Local Testing (Different Port)
```bash
Kestrel__Port=7160 dotnet run
# Uses: Port 7160 (overrides config file)
```

### Docker Development
```bash
docker build -t myapp .
docker run -e Kestrel__Port=5000 myapp
# Uses: Port 5000
```

### Docker Production
```bash
docker run -e ASPNETCORE_ENVIRONMENT=Production myapp
# Uses: appsettings.Production.json → Port 80
```

### Kubernetes
```yaml
containers:
- name: api
  image: myapp:latest
  env:
  - name: Kestrel__Port
    value: "8080"
  - name: ASPNETCORE_ENVIRONMENT
    value: "Production"
```

---

## Testing Checklist

### After Implementation - Test Each Project

For each of the 5 projects:

```bash
# 1. Build
dotnet build

# 2. Run default (should use appsettings.json port)
dotnet run
# Check output: "Listening on: http://[::]:5000"

# 3. Run with env var override
Kestrel__Port=8080 dotnet run
# Check output: "Listening on: http://[::]:8080"

# 4. Run with different environment
ASPNETCORE_ENVIRONMENT=Production dotnet run
# Should use appsettings.Production.json (if it exists)
```

---

## Documentation Updates Needed

Update README files to document port configuration:

### `backend/.NET/README.md`

Add section:
```markdown
## Port Configuration

Ports are configured via `appsettings.json`:

- Development: Port 5000 (from appsettings.Development.json)
- Production: Port 80 (from appsettings.Production.json)

Override port for local testing:
```bash
Kestrel__Port=7160 dotnet run
```
```

### Individual Project READMEs

Add similar section explaining port configuration.

---

## Migration Path

### Phase 1: Update Code
- Modify Api/Program.cs (5 files)
- No breaking changes

### Phase 2: Add Configuration Files
- Add/update appsettings.json (5 files)
- Add/update appsettings.Development.json (5 files)
- Add/update appsettings.Production.json (5 files)

### Phase 3: Update Documentation
- Update README files (5 files)
- Explain configuration approach

### Phase 4: Test
- Verify each project builds and runs
- Test port override with env vars
- Test Docker deployment

### Phase 5: Deploy
- Merge to main branch
- Update deployment documentation

---

## Rollback Plan

If issues arise:

1. Revert Api/Program.cs changes
2. Keep configuration files (won't hurt)
3. Go back to hardcoded port

But this is unlikely - the pattern is standard ASP.NET Core practice.

---

## Why This is Important

1. **DevOps Best Practice** - Config should be separate from code
2. **Twelve-Factor App** - Rule #3: Store config in environment
3. **Docker/Kubernetes Ready** - Environment variables override
4. **Team Consistency** - Same approach across all projects
5. **Easy Troubleshooting** - Clear where port comes from

---

## Questions to Address

**Q: Will launchSettings.json conflict?**  
A: No. That's only used by IIS Express in development. Kestrel reads our config.

**Q: What if both config and env var set port?**  
A: Env var wins. Priority: Env Var > appsettings.{Env}.json > appsettings.json > Default

**Q: What about Docker port mapping?**  
A: Docker -p 8080:5000 → Container port 5000 (from config), Host port 8080

**Q: Can I set multiple ports?**  
A: Yes - refactor to support HTTP and HTTPS ports separately in config

---

## Files Ready to Deploy

See attached files:
- `KESTREL_PORT_CONFIGURATION.md` - Full technical details
- `APPLY_KESTREL_CONFIG_TO_PROJECTS.md` - Quick implementation guide

**Ready to proceed with implementation?** Y/N
