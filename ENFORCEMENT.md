# Standards Enforcement Guide

This guide establishes how code standards are enforced across all stacks using CI/CD pipelines, linting, formatting, and automated checks.

## Overview

Standards enforcement ensures consistent code quality across .NET and React codebases through:

1. **Linting** - Catch style and quality issues
2. **Formatting** - Enforce consistent code style
3. **Testing** - Verify functionality and coverage
4. **Type Safety** - Catch type errors before runtime
5. **Security** - Scan for vulnerabilities
6. **Performance** - Validate benchmarks and thresholds

## Backend (.NET) Enforcement

### Code Formatting with EditorConfig

Create `.editorconfig` at root:

```editorconfig
root = true

# C# files
[*.cs]
indent_size = 4
indent_style = space
end_of_line = lf
charset = utf-8-bom
insert_final_newline = true

# Naming conventions
dotnet_naming_rule.interfaces_should_be_begins_with_i.severity = suggestion
dotnet_naming_rule.interfaces_should_be_begins_with_i.symbols = interface
dotnet_naming_rule.interfaces_should_be_begins_with_i.style = begins_with_i

dotnet_naming_symbols.interface.applicable_kinds = interface
dotnet_naming_symbols.interface.applicable_accessibilities = public, internal, private, protected, protected_internal
dotnet_naming_symbols.interface.required_modifiers = 

dotnet_naming_style.begins_with_i.required_prefix = I
dotnet_naming_style.begins_with_i.required_suffix = 
dotnet_naming_style.begins_with_i.word_separator = 
dotnet_naming_style.begins_with_i.capitalization = pascal_case

# Class naming: PascalCase
dotnet_naming_rule.classes_should_be_pascal_case.severity = warning
dotnet_naming_rule.classes_should_be_pascal_case.symbols = class
dotnet_naming_rule.classes_should_be_pascal_case.style = pascal_case

dotnet_naming_symbols.class.applicable_kinds = class
dotnet_naming_symbols.class.applicable_accessibilities = public, internal, private
dotnet_naming_style.pascal_case.capitalization = pascal_case

# Method naming: PascalCase
dotnet_naming_rule.methods_should_be_pascal_case.severity = warning
dotnet_naming_rule.methods_should_be_pascal_case.symbols = method
dotnet_naming_rule.methods_should_be_pascal_case.style = pascal_case

dotnet_naming_symbols.method.applicable_kinds = method
dotnet_naming_symbols.method.applicable_accessibilities = public, internal, private

# Property naming: PascalCase
dotnet_naming_rule.properties_should_be_pascal_case.severity = warning
dotnet_naming_rule.properties_should_be_pascal_case.symbols = property
dotnet_naming_rule.properties_should_be_pascal_case.style = pascal_case

dotnet_naming_symbols.property.applicable_kinds = property
dotnet_naming_symbols.property.applicable_accessibilities = public, internal, private

# Private field naming: _camelCase
dotnet_naming_rule.private_members_should_be_camel_case.severity = warning
dotnet_naming_rule.private_members_should_be_camel_case.symbols = private_member
dotnet_naming_rule.private_members_should_be_camel_case.style = camel_case_with_underscore

dotnet_naming_symbols.private_member.applicable_kinds = field, property, method
dotnet_naming_symbols.private_member.applicable_accessibilities = private

dotnet_naming_style.camel_case_with_underscore.required_prefix = _
dotnet_naming_style.camel_case_with_underscore.capitalization = camel_case

# Code style rules
csharp_style_var_for_built_in_types = false:suggestion
csharp_style_var_when_type_is_apparent = true:suggestion
csharp_style_var_elsewhere = false:suggestion

# Require braces
csharp_prefer_braces = true:silent

# Use expression-bodied members where appropriate
csharp_style_expression_bodied_methods = when_on_single_line:silent
csharp_style_expression_bodied_properties = true:silent
csharp_style_expression_bodied_indexers = true:silent
csharp_style_expression_bodied_accessors = true:silent

# Use pattern matching
csharp_style_pattern_matching_over_as_with_null_check = true:suggestion
csharp_style_pattern_matching_over_is_with_cast_check = true:suggestion
```

### StyleCop Analyzer

Add to backend `.csproj`:

```xml
<ItemGroup>
  <PackageReference Include="StyleCop.Analyzers" Version="1.2.0-beta.556">
    <PrivateAssets>all</PrivateAssets>
    <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
  </PackageReference>
</ItemGroup>

<PropertyGroup>
  <EnforceCodeStyleInBuild>true</EnforceCodeStyleInBuild>
  <EnableNETAnalyzers>true</EnableNETAnalyzers>
  <AnalysisLevel>latest</AnalysisLevel>
</PropertyGroup>
```

Create `.stylecop.json`:

```json
{
  "$schema": "https://raw.githubusercontent.com/DotNetAnalyzers/StyleCopAnalyzers/master/StyleCop.Analyzers/StyleCop.Analyzers/Settings/stylecop.schema.json",
  "settings": {
    "documentationRules": {
      "documentInternals": true,
      "documentExposedElements": true,
      "documentPrivateElements": false
    },
    "orderingRules": {
      "elementOrder": [
        "Kind",
        "Accessibility",
        "Constant",
        "Static",
        "Readonly"
      ]
    }
  }
}
```

### Test Coverage Requirements

**Minimum Coverage Thresholds:**

- Overall: 80%
- Business Logic: 90%
- Critical Paths: 100%
- Utilities: 85%

```bash
# Generate coverage report
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover /p:Exclude="[*.Tests]*"

# Fail if coverage below threshold
dotnet test /p:CollectCoverage=true /p:Threshold=80 /p:ThresholdType=branch
```

## Frontend (React) Enforcement

### ESLint Configuration

Create `.eslintrc.json`:

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react", "react-hooks", "@typescript-eslint"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-return-types": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ]
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

### Prettier Configuration

Create `.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

Create `.prettierignore`:

```
node_modules
dist
build
coverage
*.lock
*.log
```

### TypeScript Strict Mode

Configure `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "build"]
}
```

## GitHub Actions CI/CD Pipeline

### .NET Backend CI

Create `.github/workflows/backend.yml`:

```yaml
name: Backend CI

on:
  push:
    branches: [main, develop]
    paths:
      - 'backend/**'
      - '.github/workflows/backend.yml'
  pull_request:
    branches: [main, develop]
    paths:
      - 'backend/**'

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '9.0.x'

      - name: Restore dependencies
        run: dotnet restore backend/

      - name: Build
        run: dotnet build backend/ --no-restore --configuration Release

      - name: Run unit tests
        run: dotnet test backend/tests/Unit --no-build --verbosity normal

      - name: Run integration tests
        run: dotnet test backend/tests/Integration --no-build --verbosity normal

      - name: Generate coverage
        run: dotnet test backend/ /p:CollectCoverage=true /p:CoverletOutputFormat=opencover --no-build

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage.opencover.xml
          fail_ci_if_error: false

      - name: Check code style
        run: dotnet format backend/ --verify-no-changes --verbosity diagnostic

      - name: Run analyzer
        run: dotnet build backend/ /p:TreatWarningsAsErrors=true
```

### React Frontend CI

Create `.github/workflows/frontend.yml`:

```yaml
name: Frontend CI

on:
  push:
    branches: [main, develop]
    paths:
      - 'frontend/**'
      - '.github/workflows/frontend.yml'
  pull_request:
    branches: [main, develop]
    paths:
      - 'frontend/**'

jobs:
  lint-and-test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: cd frontend && npm ci

      - name: Run ESLint
        run: cd frontend && npm run lint

      - name: Check format
        run: cd frontend && npm run format:check

      - name: Run type check
        run: cd frontend && npm run type-check

      - name: Run unit tests
        run: cd frontend && npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./frontend/coverage/coverage-final.json
          fail_ci_if_error: false

      - name: Build
        run: cd frontend && npm run build

      - name: Run E2E tests
        run: cd frontend && npm run test:e2e

      - name: Upload E2E results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-results
          path: frontend/playwright-report/
```

## Pre-commit Hooks

Use husky and lint-staged to enforce standards before commits:

```bash
npm install -D husky lint-staged
npx husky install
```

Create `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

Update `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.json": "prettier --write"
  }
}
```

## Code Review Checklist

### For All Code

- [ ] Follows CODE_STANDARDS.md guidelines
- [ ] Code is readable and well-named
- [ ] No code duplication (DRY principle)
- [ ] No unnecessary complexity (YAGNI principle)
- [ ] Error handling is appropriate
- [ ] Logging includes sufficient context
- [ ] Comments explain "why", not "what"
- [ ] No hardcoded values
- [ ] No security vulnerabilities

### For Tests

- [ ] Tests have descriptive names
- [ ] Tests follow AAA pattern
- [ ] Edge cases are covered
- [ ] Error scenarios tested
- [ ] Mocks are appropriate
- [ ] Tests are independent
- [ ] Coverage meets minimum threshold

### For .NET Code

- [ ] Naming conventions followed (PascalCase, etc.)
- [ ] Uses async/await properly
- [ ] Dependency injection used
- [ ] SOLID principles applied
- [ ] No null reference exceptions likely
- [ ] Proper resource disposal (using statements)

### For React Code

- [ ] TypeScript types are explicit
- [ ] No `any` types without justification
- [ ] Components are small and focused
- [ ] Props are properly typed
- [ ] Hooks used correctly
- [ ] No memory leaks (cleanup functions)
- [ ] Accessibility considered (semantic HTML)

## Enforcement CLI Commands

### Pre-commit Validation

```bash
# Backend: Format and analyze
dotnet format backend/
dotnet build backend/ /p:EnforceCodeStyleInBuild=true

# Frontend: Lint and format
cd frontend && npm run lint:fix && npm run format
```

### Full CI Simulation Locally

```bash
# Backend
dotnet build backend/ --configuration Release
dotnet test backend/ /p:CollectCoverage=true
dotnet format backend/ --verify-no-changes

# Frontend
cd frontend
npm install
npm run lint
npm run type-check
npm run test:coverage
npm run build
```

## Exceptions and Overrides

### Disabling Rules

Only in exceptional cases with team approval:

**.NET - Disable StyleCop rule:**
```csharp
#pragma warning disable SA1600 // Elements should be documented
public class SpecialCase { }
#pragma warning restore SA1600
```

**React - Disable ESLint rule:**
```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const value: any = getSomething();
```

Document why the exception is needed in the comment.

## Continuous Improvement

### Measuring Quality

Track metrics over time:
- Code coverage percentage
- Number of linting violations
- Test pass rate
- Build time trends
- Security vulnerabilities

### Quarterly Review

Review standards quarterly:
1. Check if standards are being followed
2. Identify common violations
3. Update standards if needed
4. Provide training on standards
5. Adjust enforcement rules

## Resources

- [EditorConfig Guide](https://editorconfig.org/)
- [StyleCop Analyzers](https://github.com/DotNetAnalyzers/StyleCopAnalyzers)
- [ESLint Documentation](https://eslint.org/)
- [Prettier Documentation](https://prettier.io/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Husky Documentation](https://typicode.github.io/husky/)

---

**Last Updated:** November 4, 2025
**Version:** 1.0

Enforce standards consistently across all codebases!
