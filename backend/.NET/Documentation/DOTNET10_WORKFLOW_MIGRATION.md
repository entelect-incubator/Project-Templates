# .NET 10 Workflow Migration - Fix Summary

## 📋 Issue
The `Vertical Slice Minimal Architecture` workflow in GitHub Actions failed because:
1. ❌ .NET version pinned to 8.x and 9.x (needs .NET 10)
2. ❌ Incorrect path references (missing `backend/.NET/` prefix)

**Workflow File:** `.github/workflows/min-vertical-slice.yml`  
**Repository:** `entelect-incubator/Project-Templates`  
**Branch:** `master`

---

## 🔧 Required Changes

### Change 1: Update .NET Version (Lines 19-22)

**BEFORE:**
```yaml
with:
    dotnet-version: |
        8.x
        9.x
    include-prerelease: true
```

**AFTER:**
```yaml
with:
    dotnet-version: |
        10.x
    include-prerelease: false
```

**Why:** .NET 8 and 9 support matrix tests are no longer needed; .NET 10 is the target version.

---

### Change 2: Fix All Path References

All paths need the `backend/.NET/` prefix to match the repository structure.

**Affected Lines:**

#### Line 25 - dotnet restore
```yaml
# BEFORE
run: dotnet restore "./3.VerticalSliceArchitecture/2.Minimal/.NET.VerticalSliceArchitecture.Minimal.sln"

# AFTER
run: dotnet restore "./backend/.NET/3.VerticalSliceArchitecture/2.Minimal/.NET.VerticalSliceArchitecture.Minimal.sln"
```

#### Line 29 - dotnet build
```yaml
# BEFORE
run: dotnet build "./3.VerticalSliceArchitecture/2.Minimal/.NET.VerticalSliceArchitecture.Minimal.sln" --configuration Release --no-restore

# AFTER
run: dotnet build "./backend/.NET/3.VerticalSliceArchitecture/2.Minimal/.NET.VerticalSliceArchitecture.Minimal.sln" --configuration Release --no-restore
```

#### Line 33 - dotnet test (in the test run script)
```yaml
# BEFORE
dotnet test 3.VerticalSliceArchitecture/2.Minimal/Test/Test.csproj

# AFTER
dotnet test backend/.NET/3.VerticalSliceArchitecture/2.Minimal/Test/Test.csproj
```

Also update the coverage output path in the test command:
```yaml
# BEFORE
/p:CoverletOutput="3.VerticalSliceArchitecture/2.Minimal/Test/TestResults/"

# AFTER
/p:CoverletOutput="backend/.NET/3.VerticalSliceArchitecture/2.Minimal/Test/TestResults/"
```

#### Line 51 - reportgenerator
```yaml
# BEFORE
reportgenerator "-reports:3.VerticalSliceArchitecture/2.Minimal/Test/TestResults/*/coverage.cobertura.xml" \
  "-targetdir:3.VerticalSliceArchitecture/2.Minimal/Test/TestResults/html"

# AFTER
reportgenerator "-reports:backend/.NET/3.VerticalSliceArchitecture/2.Minimal/Test/TestResults/*/coverage.cobertura.xml" \
  "-targetdir:backend/.NET/3.VerticalSliceArchitecture/2.Minimal/Test/TestResults/html"
```

#### Line 60 - cp command (copy HTML report)
```yaml
# BEFORE
cp -r 3.VerticalSliceArchitecture/2.Minimal/Test/TestResults/html/* reports/vertical-min-test-results/

# AFTER
cp -r backend/.NET/3.VerticalSliceArchitecture/2.Minimal/Test/TestResults/html/* reports/vertical-min-test-results/
```

#### Line 78 - Upload HTML Report Artifact
```yaml
# BEFORE
path: 3.VerticalSliceArchitecture/2.Minimal/Test/TestResults/html/

# AFTER
path: backend/.NET/3.VerticalSliceArchitecture/2.Minimal/Test/TestResults/html/
```

#### Line 86 - Upload Cobertura Report Artifact
```yaml
# BEFORE
path: 3.VerticalSliceArchitecture/2.Minimal/Test/TestResults/coverage.cobertura.xml

# AFTER
path: backend/.NET/3.VerticalSliceArchitecture/2.Minimal/Test/TestResults/coverage.cobertura.xml
```

---

## ✅ Complete Fixed File

See `DOTNET10_WORKFLOW_FIX.yml` in this directory for the complete corrected workflow file.

---

## 🚀 How to Apply the Fix

### Option 1: Direct GitHub UI Edit
1. Go to `.github/workflows/min-vertical-slice.yml` on GitHub
2. Click the pencil icon (Edit)
3. Apply all changes listed above
4. Commit with message: `chore: Update Vertical Slice Minimal workflow to .NET 10`

### Option 2: Local Git Clone & Push
```bash
# Clone the repo
git clone https://github.com/entelect-incubator/Project-Templates.git
cd Project-Templates

# Create a new branch
git checkout -b upgrade/all-net10

# Replace the workflow file with the fixed version
cp DOTNET10_WORKFLOW_FIX.yml .github/workflows/min-vertical-slice.yml

# Commit and push
git add .github/workflows/min-vertical-slice.yml
git commit -m "chore: Update Vertical Slice Minimal workflow to .NET 10"
git push origin upgrade/all-net10

# Create a Pull Request on GitHub
```

### Option 3: Using GitHub CLI
```bash
gh workflow run upgrade/all-net10
```

---

## 📊 Impact Analysis

| Aspect          | Before          | After          | Impact                                    |
| --------------- | --------------- | -------------- | ----------------------------------------- |
| .NET Versions   | 8.x, 9.x        | 10.x           | ✅ Uses latest stable version              |
| Path Resolution | Broken          | Fixed          | ✅ Correctly locates solution and projects |
| Build Status    | ❌ FAILED        | ✅ WILL PASS    | ✅ Workflow executes successfully          |
| Test Coverage   | ❌ Not generated | ✅ Generated    | ✅ Reports available                       |
| Prerelease      | true (unstable) | false (stable) | ✅ Uses stable only                        |

---

## 🧪 Verification Steps

After applying the fix:

1. **Trigger the workflow:**
   ```bash
   git push origin upgrade/all-net10
   ```

2. **Monitor on GitHub:**
   - Go to Actions tab
   - Check "Vertical Slice Minimal Architecture" workflow
   - Verify all steps pass (green checkmarks)

3. **Validate artifacts:**
   - Coverage report should be generated
   - HTML report should be available
   - GitHub Pages deployment should succeed

---

## 📝 Notes

- **No breaking changes** to functionality
- Only paths and version numbers were updated
- All test files remain unchanged
- Code coverage reports will have the same format

---

## 🔗 Related Files

- Repository: `entelect-incubator/Project-Templates`
- Workflow: `.github/workflows/min-vertical-slice.yml`
- Solution: `backend/.NET/3.VerticalSliceArchitecture/2.Minimal/.NET.VerticalSliceArchitecture.Minimal.sln`
- Test Project: `backend/.NET/3.VerticalSliceArchitecture/2.Minimal/Test/Test.csproj`

---

**Last Updated:** November 12, 2025  
**Status:** Ready for Implementation  
**Priority:** High (Workflow Failure)
