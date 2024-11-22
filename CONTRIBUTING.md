# Contribution Guide

## 🌟 Welcome to NutriPlanner App!

We're excited to receive contributions from the community! This document provides guidelines for contributing to the NutriPlanner project.

## 📝 How to Contribute

### 1. Setting Up the Environment

1. Fork the project
2. Clone your fork:
   ```bash
   git clone https://github.com/thejoaomoura/nutri-planner.git
   ```
3. Add the original repository as upstream:
   ```bash
   git remote add upstream https://github.com/original-owner/nutri-planner.git
   ```

### 2. Creating a New Feature

1. Create a new branch from main:
   ```bash
   git checkout -b feature/feature-name
   ```
2. Make your changes
3. Follow the project's coding standards
4. Write or update tests if necessary

### 3. Commits

- Use clear and descriptive commit messages
- Follow the conventional commits pattern:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation changes
  - `style:` for code formatting
  - `refactor:` for refactoring
  - `test:` for adding/modifying tests
  - `chore:` for maintenance tasks

Example:
```bash
git commit -m "feat: add calorie validation to form"
```

### 4. Pull Requests

1. Update your branch with the latest changes from main:
   ```bash
   git pull upstream main
   ```
2. Resolve any conflicts
3. Push to your fork:
   ```bash
   git push origin feature/feature-name
   ```
4. Open a Pull Request with:
   - Clear and descriptive title
   - Detailed description of changes
   - Reference to related issues
   - Screenshots (if applicable)

## 🔍 Coding Standards

### TypeScript
- Use explicit types
- Avoid `any`
- Document complex functions

### React
- Use functional components
- Implement error handling
- Follow hook best practices
- Keep components small and focused

### Style
- Use TailwindCSS for styling
- Follow the project's design system
- Maintain responsiveness

## ✅ Pull Request Checklist

- [ ] Code follows project standards
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] Build passes without errors
- [ ] Lint passes without errors
- [ ] TypeScript compiles without errors

## 🚫 What to Avoid

- Don't commit directly to main
- Don't ignore coding standards
- Don't add unnecessary dependencies
- Don't leave console.logs in the code
- Don't ignore error handling

## 📝 Additional Notes

- Be respectful and professional
- Help other contributors
- Report bugs using issues
- Suggest improvements through discussions
- Keep documentation up-to-date

## 📞 Support

If you need help:
1. Check the documentation
2. Look for similar issues
3. Open a new issue
4. Contact the maintainers

---

We appreciate your contribution to making NutriPlanner even better! 🚀
