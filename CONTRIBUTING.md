# Contributing to Project Templates

Thank you for considering contributing to **Project Templates**! We appreciate your interest in improving this collection of production-ready architectural templates. We welcome contributions in many forms, whether it's adding new templates, improving documentation, fixing bugs, or sharing best practices.

## Ways to Contribute

There are many ways you can contribute to Project Templates:

### 📝 Documentation
- Improve existing documentation
- Add examples or tutorials
- Clarify architecture explanations
- Fix typos and grammar
- Add diagrams or visual explanations

### 🎨 New Templates
- Add templates for new languages/frameworks
- Improve existing templates
- Add new architectural patterns
- Refactor and optimize templates
- Add example features to templates

### 🐛 Bug Reports
- Report issues you find
- Provide detailed reproduction steps
- Share error messages and logs
- Suggest fixes

### 💡 Enhancements
- Suggest new features
- Propose template improvements
- Share best practices
- Improve build/test setup

### ✅ Code Review
- Review pull requests from others
- Provide constructive feedback
- Help maintain code quality
- Share architectural insights

## Getting Started

### Prerequisites

- **Git** - For version control
- **GitHub Account** - To create forks and PRs
- Language/Framework SDKs for templates you're working on:
  - **.NET 9 SDK** for .NET templates
  - **Node.js 18+** for React templates (coming soon)

### Step-by-Step Process

#### 1. Fork the Repository

```bash
# Click "Fork" button on GitHub
# https://github.com/entelect-incubator/Project-Templates
```

#### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/Project-Templates.git
cd Project-Templates
```

#### 3. Add Upstream Remote

```bash
git remote add upstream https://github.com/entelect-incubator/Project-Templates.git
git remote -v  # Verify both origin and upstream are configured
```

#### 4. Create a Feature Branch

```bash
# Update main branch first
git fetch upstream
git rebase upstream/master

# Create descriptive branch name
git checkout -b feat/add-react-template
# or: git checkout -b fix/typo-in-docs
# or: git checkout -b docs/improve-architecture-guide
```

**Branch Naming Convention:**
- `feat/` - New feature or template
- `fix/` - Bug fix
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding/improving tests
- `chore/` - Build, CI, or tooling

#### 5. Make Your Changes

```bash
# Edit files
# Add examples
# Create templates
# Update documentation
```

#### 6. Test Your Changes

For .NET templates:
```bash
cd backend/.NET/[YourTemplate]
dotnet build
dotnet test
```

For documentation:
- Preview markdown files
- Check all links work
- Verify formatting

#### 7. Commit with Clear Messages

```bash
# Good commit messages
git commit -m "feat: add React useCallback hook example"
git commit -m "docs: clarify CQRS pattern explanation"
git commit -m "fix: correct connection string in template"
git commit -m "refactor: improve error handling in repository"

# Avoid vague messages
# ❌ git commit -m "updates"
# ❌ git commit -m "WIP"
# ❌ git commit -m "bug"
```

**Commit Message Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

Example:
```
feat(architecture): add vertical slice architecture guide

- Added detailed explanation of vertical slice pattern
- Included pros and cons comparison
- Added project structure example
- Added decision framework

Fixes #123
```

#### 8. Push to Your Fork

```bash
git push origin feat/add-react-template
```

#### 9. Create a Pull Request

- Go to your fork on GitHub
- Click "Compare & pull request"
- Fill in the PR template with:
  - Clear description of changes
  - Why this change is needed
  - Testing information
  - Related issues (#123)

#### 10. Respond to Reviews

- Address feedback and suggestions
- Make requested changes
- Communicate clearly
- Re-push to the same branch

#### 11. Celebrate! 🎉

Once approved and merged, your contribution is live!

---

## Contribution Guidelines

### Code Standards

#### .NET Templates

- **Language:** C# 13 (.NET 9)
- **Style:** Microsoft naming conventions
- **Formatting:** Use `dotnet format`
- **Testing:** Write unit tests for new features
- **Dependencies:** Keep dependencies minimal and justified

Example formatting:
```bash
dotnet format
```

#### React Templates (Coming Soon)

- **Language:** TypeScript 5.x
- **Style:** Airbnb style guide
- **Linting:** ESLint + Prettier
- **Testing:** Jest + React Testing Library
- **Package Manager:** npm or yarn

#### Documentation

- **Format:** Markdown (.md)
- **Line Length:** 80-120 characters
- **Headings:** Use ATX-style (#, ##, ###)
- **Code Blocks:** Always specify language
- **Links:** Use relative paths for internal links

### Coding Principles

All contributions should follow these principles:

1. **SOLID Principles**
   - Single Responsibility
   - Open/Closed
   - Liskov Substitution
   - Interface Segregation
   - Dependency Inversion

2. **Keep It Simple**
   - Simple code is better than clever code
   - Make code understandable at first glance
   - Add comments only for "why", not "what"

3. **DRY (Don't Repeat Yourself)**
   - Extract common patterns
   - Reuse code components
   - Consider shared kernel for templates

4. **YAGNI (You Aren't Gonna Need It)**
   - Don't add "just in case" code
   - Implement only what's needed
   - Keep templates focused

5. **Clean Architecture**
   - Follow the template's chosen pattern
   - Maintain clear dependency direction
   - Test business logic independently

### Documentation Standards

- **Clear and Concise** - Easy to understand
- **Examples Included** - Show real usage
- **Up to Date** - Reflects current code
- **Well-Organized** - Logical structure
- **Consistent Style** - Matches existing docs

---

## Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Branch is up-to-date with upstream master
  ```bash
  git fetch upstream
  git rebase upstream/master
  ```

- [ ] Changes are focused and minimal
  - One feature/fix per PR
  - No unrelated changes

- [ ] Code is formatted and clean
  ```bash
  dotnet format  # For .NET
  ```

- [ ] Tests pass
  ```bash
  dotnet test  # For .NET
  ```

- [ ] Tests are added/updated for new code
  - Aim for >80% coverage for new code
  - Test happy path AND edge cases

- [ ] Documentation is updated
  - README.md if needed
  - Inline code comments for complex logic
  - Architecture decisions documented

- [ ] No breaking changes to existing templates
  - If breaking: explain why and update docs

- [ ] Commit messages are clear and descriptive

- [ ] PR description is complete
  - What changed and why
  - How to test
  - Related issues

---

## Review Process

### What Maintainers Look For

✅ **Approved When:**
- Code follows project standards
- Changes are well-tested
- Documentation is complete
- Commit history is clean
- No conflicts with main branch

❌ **May Request Changes For:**
- Architectural concerns
- Test coverage too low
- Documentation missing
- Code style issues
- Performance concerns

### Feedback Loop

1. Maintainer reviews and comments
2. You address feedback
3. Push new commits to same branch
4. Maintainer re-reviews
5. Repeat until approved
6. Merge to master

**Pro Tip:** Small, focused PRs get reviewed faster!

---

## Template Contribution Specifics

### Adding a New Language/Framework

If contributing a new template (e.g., Java, Go, Python):

1. **Follow the Structure**
   - `backend/[Language]/` or `frontend/[Framework]/`
   - Include 1-3 architectural pattern examples
   - Follow naming: `1.LayeredArchitecture/`, etc.

2. **Include Documentation**
   - README.md with pattern explanations
   - Setup/installation instructions
   - Project structure overview
   - Example features

3. **Add Example Features**
   - At least one complete end-to-end example
   - CRUD operations
   - Error handling
   - Validation

4. **Include Tests**
   - Unit tests
   - Integration tests
   - Setup instructions

5. **Provide CI/CD**
   - GitHub Actions workflow (if possible)
   - Build scripts
   - Test configuration

6. **Technology Stack Document**
   - List all dependencies and versions
   - Explain technology choices
   - Include license information

### Improving Existing Templates

When improving a template:

1. **Maintain Backward Compatibility**
   - Don't break existing examples
   - Update documentation
   - Note breaking changes

2. **Test Thoroughly**
   - Ensure template still works
   - Test all examples
   - Verify documentation accuracy

3. **Document Changes**
   - Update README
   - Add migration guide if needed
   - Explain improvements

---

## Common Issues and Help

### "My PR has conflicts"

```bash
# Update your branch
git fetch upstream
git rebase upstream/master

# Fix conflicts in your editor
# Then:
git add .
git rebase --continue
git push origin feat/branch-name --force-with-lease
```

### "CI/CD checks failing"

- Check the GitHub Actions logs
- Run tests locally
- Ensure code is formatted
- Look at linting errors

### "Commit history is messy"

```bash
# Squash commits (if needed)
git rebase -i HEAD~3  # For last 3 commits
# Mark commits as 'squash'
git push origin feat/branch-name --force-with-lease
```

### "I need help with something"

1. Check existing issues/discussions
2. Look at similar PRs/templates
3. Ask in PR comments
4. Reach out to maintainers

---

## Code of Conduct

We are committed to providing a welcoming and inspiring community. Please read and follow our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

In short:
- ✅ Be respectful and inclusive
- ✅ Welcome diverse perspectives
- ✅ Assume good intent
- ✅ Provide constructive feedback
- ❌ No harassment, discrimination, or abuse

---

## Recognition

We recognize and appreciate all contributions! Contributors will be:

- Mentioned in release notes
- Added to contributor list
- Given credit in relevant documentation
- Acknowledged in discussions

---

## License

By contributing to Project Templates, you agree that your contributions will be licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Useful Links

- **GitHub Repository:** https://github.com/entelect-incubator/Project-Templates
- **Issues:** https://github.com/entelect-incubator/Project-Templates/issues
- **Discussions:** https://github.com/entelect-incubator/Project-Templates/discussions
- **Architecture Guide:** [ARCHITECTURE.md](ARCHITECTURE.md)
- **Getting Started:** [GETTING_STARTED.md](GETTING_STARTED.md)

---

## Questions?

- **GitHub Discussions** - General questions
- **GitHub Issues** - Bug reports and feature requests
- **Code of Conduct** - Community guidelines

---

Thank you for contributing to Project Templates! Together, we're making it easier for developers to build amazing applications. 🚀

*Built with ❤️ by the Entelect Incubator team*
