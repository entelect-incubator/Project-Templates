<img align="left" width="116" height="116" src="logo.png" />

# Project Templates - Polyglot Scaffolding for Greenfield Projects

<br/>

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg)](CONTRIBUTING.md)

A comprehensive, modern, and scalable collection of **production-ready templates** for building full-stack applications. This repository provides curated architectural patterns and best practices for multiple technology stacks, enabling teams to quickly bootstrap new projects with confidence and consistency.

Whether you're building a backend API, frontend application, or full-stack solution, **Project Templates** offers battle-tested architectures that promote clean code, maintainability, and scalability from day one.

## 🎯 Why Project Templates?

- **🏗️ Production-Ready Architectures** - Multiple architectural patterns (Layered, Clean, Vertical Slice) for different use cases
- **🛠️ Polyglot Support** - Templates for .NET, React, and more—all in one place
- **📚 Best Practices** - Industry-standard patterns and technologies curated from real-world experience
- **🚀 Quick Start** - Clone a template and start developing immediately with a solid foundation
- **📖 Well-Documented** - Comprehensive documentation and examples included with each template
- **🤝 Community Driven** - Contributions and feedback from experienced developers
- **⚡ Scalable Design** - Architectures that grow with your application

## 📁 Repository Structure

```
project-templates/
├── backend/
│   ├── .NET/
│   │   ├── 1.LayeredArchitecture/
│   │   ├── 2.CleanArchitecture/
│   │   └── 3.VerticalSliceArchitecture/
│   └── [More languages coming soon]
├── frontend/
│   ├── React/
│   └── [More frameworks coming soon]
├── ARCHITECTURE.md          # Detailed architecture patterns
├── GETTING_STARTED.md       # Quick start guide
├── CONTRIBUTING.md          # Contribution guidelines
└── README.md                # This file
```

## 🚀 Quick Start

### Choose Your Technology Stack

#### Backend - .NET

**3 Architectural Patterns Available:**

1. **Layered Architecture** [![Status](https://github.com/entelect-incubator/Project-Templates/actions/workflows/layered-clean.yml/badge.svg)](https://github.com/entelect-incubator/Project-Templates/actions/workflows/layered-clean.yml)
   - **Clean Template** - DbContext as UnitOfWork, DbSets as Repositories *(Recommended)*
   - **Template with DataAccess Layer** - Separate database logic from business logic

2. **Clean Architecture** [![Status](https://github.com/entelect-incubator/Project-Templates/actions/workflows/clean.yml/badge.svg)](https://github.com/entelect-incubator/Project-Templates/actions/workflows/clean.yml)
   - Strict separation of concerns with clear dependency direction
   - Best for large, complex projects with long-term maintenance requirements

3. **Vertical Slice Architecture** [![Status](https://github.com/entelect-incubator/Project-Templates/actions/workflows/vertical-slice.yml/badge.svg)](https://github.com/entelect-incubator/Project-Templates/actions/workflows/vertical-slice.yml)
   - End-to-end feature slices across all layers
   - Perfect for agile, iterative development with rapid feature delivery

**Getting Started with .NET:**

```bash
# 1. Install .NET 9 SDK
# https://dotnet.microsoft.com/download

# 2. Clone the template you prefer
cp -r backend/.NET/1.LayeredArchitecture ./your-project

# 3. Navigate to the project
cd your-project

# 4. Follow the backend/.NET README for setup instructions
```

See [backend/.NET/README.md](backend/.NET/README.md) for detailed .NET setup and architecture documentation.

#### Frontend - React

*React templates coming soon - offering production-ready architectural patterns for React applications*

### Technologies

#### .NET Stack

- **.NET 9** - Latest .NET runtime and language features
- **Entity Framework Core 9** - Modern ORM for data access
- **MediatR** - CQRS implementation
- **Feature Management** - Feature flags and toggle management
- **Rate Limiting** - API throttling and protection
- **FluentValidation** - Declarative validation rules
- **Polly** - Resilience and transient fault handling
- **NSwag** - OpenAPI/Swagger integration
- **NUnit, FluentAssertions, Moq** - Testing framework stack

#### React Stack (Coming Soon)

- React 18+
- TypeScript
- Redux or Context API
- Tailwind CSS
- Jest & React Testing Library
- Vite or Next.js

## 📚 Architecture Patterns

### Layered Architecture

**Best For:** Applications where simplicity and rapid adoption are priorities

Layered architecture organizes a system into distinct, modular layers—each responsible for specific functions. This promotes separation of concerns, scalability, and reusability.

**Key Benefits:**
- Simple to understand and adopt
- Clear layer responsibilities
- Flexible technology choices per layer
- Good for team collaboration

**When to Choose Layered over Clean:**
- Quick project startup is critical
- Team has varying experience levels
- Technology flexibility is important
- Project scope is well-defined

---

### Clean Architecture

**Best For:** Large, complex applications with evolving requirements

Clean Architecture, pioneered by Robert C. Martin, enforces a clear, hierarchical structure that minimizes dependencies and allows for interchangeable components. It prioritizes separation of concerns, maintainability, and testability.

**Key Benefits:**
- Strict architectural boundaries
- Framework-agnostic design
- Highly testable code
- Long-term maintainability

**When to Choose Clean over Layered:**
- Complex business logic exists
- Long-term maintenance is critical
- Multiple teams will work on the code
- Strict dependency management is needed

---

### Vertical Slice Architecture

**Best For:** Agile teams delivering features incrementally

Vertical Slice Architecture builds end-to-end slices of functionality across all layers. Associated with Domain-Driven Design and microservices, it emphasizes delivering complete features through the entire stack.

**Key Benefits:**
- Rapid feature delivery
- Holistic understanding of features
- Reduced integration challenges
- Cross-functional collaboration
- Flexibility in technology per feature

**When to Choose Vertical Slice:**
- Agile/iterative development is used
- Rapid feedback is needed
- Features are independent
- Cross-functional teams are working together

---

## 💡 Key Architectural Principles

All templates follow these core principles:

1. **Modularity and Separation of Concerns** - Well-defined responsibilities reduce complexity and improve maintainability

2. **Scalability** - Architecture grows with your application without major refactoring

3. **Reusability** - Components are designed to be reused across features and projects

4. **Testability** - Clear boundaries and dependencies make unit and integration testing straightforward

5. **Collaborative Development** - Different teams work on different areas simultaneously without conflicts

6. **Maintainability** - Clear structure and modular design simplify debugging and maintenance

7. **Adaptability** - Flexible design accommodates technology updates and requirement changes

## 🛠️ Getting Started

### Prerequisites

- **For .NET Templates:** .NET 9 SDK
- **For React Templates:** Node.js 18+, npm/yarn
- Git

### Step-by-Step

1. **Explore the templates** - Browse the available architectures in `backend/.NET/` or `frontend/React/`

2. **Read the architecture documentation** - Start with [ARCHITECTURE.md](ARCHITECTURE.md) to understand the patterns

3. **Review a specific template** - Each template includes its own README with setup instructions

4. **Clone/copy the template** - Use it as your project foundation

5. **Customize for your needs** - Follow the [GETTING_STARTED.md](GETTING_STARTED.md) guide

6. **Start building!** - Refer to the template's documentation as you develop

See the [GETTING_STARTED.md](GETTING_STARTED.md) file for detailed step-by-step instructions.

## 📖 Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Detailed explanation of each architectural pattern, including diagrams and comparisons
- **[GETTING_STARTED.md](GETTING_STARTED.md)** - Complete getting started guide for each template
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guidelines for contributing new templates and improvements
- **[backend/.NET/README.md](backend/.NET/README.md)** - Detailed .NET setup and architecture documentation

## 🎓 Learning Resources

### Architecture Fundamentals

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Layered Architecture](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/ch01.html)
- [Domain-Driven Design by Eric Evans](https://www.domainlanguage.com/ddd/)

### .NET Specific

- [Entity Framework Core Documentation](https://docs.microsoft.com/en-us/ef/core/)
- [MediatR GitHub](https://github.com/jbogard/MediatR)
- [CQRS Pattern](https://martinfowler.com/bliki/CQRS.html)

### React Specific

- [React Documentation](https://react.dev/)
- [Redux Documentation](https://redux.js.org/)
- [React Testing Library](https://testing-library.com/react)

## 🤝 Contributing

We welcome contributions! Whether it's:

- New templates for other languages/frameworks
- Improvements to existing templates
- Better documentation
- Bug fixes
- Examples and tutorials

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

These templates are built on years of experience working with different codebases and learning from the community. Special thanks to:

- Robert C. Martin for Clean Architecture principles
- Eric Evans for Domain-Driven Design
- The .NET and React communities for excellent tooling and libraries
- All contributors and maintainers

## 📞 Support & Discussion

- **Issues** - Report bugs or request features via GitHub Issues
- **Discussions** - Join conversations about architecture and best practices
- **Contributing** - See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines

---

**Happy Coding! 🚀**

*Built with ❤️ by the Entelect Incubator team*
