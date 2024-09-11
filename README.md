# Bill Tracker App

**Stay on top of your recurring bills with ease.**
This app helps you track your monthly payments and sends timely reminders to keep you organized and avoid late fees.

## Features:

- **Weekly Alerts**: Receive a summary of all bills due in the current week.
- **Due Day Alerts**: Get notified on the exact day a bill is due.
- **Late Payment Alerts**: Forgot to pay? It’ll send hourly reminders until it's taken care of.

## Dashboard Overview:

- See an at-a-glance report of what’s due today, tomorrow, and later in the week, as well as any overdue bills.
- Visualize your bill status with a chart displaying paid, late, and upcoming bills for the week.

## How to Use:

1. **Add a Bill**: Click the blue "Add New" button to create a bill. Input the bill name, select the due day, category, and fixed amount (if applicable).
2. **Manage Payments**: Easily mark bills as paid with the dollar icon (`$`), and your dashboard will reset every month for the next cycle.
3. **Edit or Delete**: Use the pencil (`✏️`) to edit or the trash can (`🗑️`) to delete bills.

This app simplifies managing your recurring expenses, ensuring you’re always on top of your payments.

---

## Tech Stack

- **Vite** – High-performance build tool and development server, enabling fast hot-module replacement for an optimized development experience.
- **React** – Component-based JavaScript library for building dynamic user interfaces with declarative state management.
- **TypeScript** – Statically-typed JavaScript that enhances code quality, reduces runtime errors, and improves developer productivity with better tooling.
- **MUI (Material UI)** – A comprehensive React component library providing pre-built, customizable components that adhere to Material Design principles, ensuring consistent and accessible UI.
- **Vitest** – A fast unit testing framework tailored for Vite that integrates seamlessly with modern frontend workflows.
- **Playwright** – Powerful, cross-browser end-to-end testing framework that automates modern web testing with rich debugging features and parallel test execution.
- **ESLint** – Linting tool for identifying problematic patterns in your code, enforcing coding standards, and maintaining a clean codebase.
- **Prettier** – Opinionated code formatter that ensures consistent code style across the project, removing debates over code style issues.
- **Husky** – Git hooks that prevent commits unless all tests pass and linting issues are resolved, maintaining high-quality code throughout the repository.
- **EditorConfig** – Defines consistent coding styles across various IDEs and editors, ensuring collaboration with uniform conventions.

## Running the App Locally

This app consists of two main components: the **client** and the **server**. The backend is included as a Git submodule, so there's no need to clone it separately. Follow these steps to set it up and run it on your local machine.

### 1. Initialize Git Submodule

1. After cloning the main repository, initialize the backend submodule:

   ```bash
   git submodule update --init --recursive
   ```

2. Navigate to the server directory and start the server with Docker:
   ```bash
   cd server
   docker compose up
   ```

You can check the server repository here [https://github.com/fredericodietz/expense-tracker-server](https://github.com/fredericodietz/expense-tracker-server)

---

### 2. Client App

1. Create a `.env` file based on the provided `.env.example`:

   ```bash
   cp .env.example .env
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Run the client application in development mode:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to [http://localhost:5173/](http://localhost:5173/) to use the app.

---

## Testing:

The project follows a comprehensive testing approach, covering unit, integration, and end-to-end testing to ensure robust functionality.

### Unit and Component Testing

Unit and component tests are powered by **Vitest**, allowing for fast, isolated testing of both individual logic functions and React components. This ensures that each part of the application behaves correctly in isolation. To run the unit and component tests, use:

```bash
npm run test
```

To generate code coverage reports for unit tests:

```bash
npm run coverage
```

This will provide a detailed breakdown of test coverage, ensuring all critical paths are thoroughly tested.

### Linting

The project enforces strict linting rules with **ESLint**. To verify code quality and ensure adherence to best practices, run:

```bash
npm run lint
```

This will highlight any potential errors or inconsistencies in the codebase, promoting clean and maintainable code.

### End-to-End Testing

For full-system testing, **Playwright** is used to simulate user interactions and validate the app's behavior in different browsers. To execute end-to-end tests with an interactive UI:

```bash
npx playwright test --ui
```

This opens an interactive interface where you can visualize the execution of tests, inspect the app's behavior, and debug any issues.

---

## Pre-Commit Quality Control

The project uses **Husky** and **lint-staged** to enforce pre-commit checks, ensuring that only well-tested and properly linted code is committed, maintaining high-quality standards throughout the development process.

### Husky & lint-staged Setup

**Husky** triggers Git hooks, and in combination with **lint-staged**, it ensures that only files affected by changes are linted and tested before committing. This prevents bad commits if the code does not meet the required quality standards.

Before committing, **Husky** runs the following tasks:

1. **Linting the Code**: The modified files are checked to meet the project’s coding standards using **ESLint** with caching and auto-fixing enabled:

   ```bash
   eslint --cache --fix
   ```

2. **Running Unit & Component Tests**: Executes tests relevant to the staged changes, ensuring no breaking changes are introduced. This is done using:

   ```bash
   npm test -- related --run
   ```

   If any tests fail or linting errors occur, the commit is blocked until the issues are resolved.

### How it Works:

- When you attempt to commit, **lint-staged** focuses only on the files you’re staging and runs the linting and testing processes on them.
- If both linting and testing pass, the commit proceeds. Otherwise, you’ll receive feedback on the errors to fix before trying again.

By running **ESLint** with the `--cache --fix` option and only related tests with `npm test -- related --run`, this setup ensures faster, more efficient pre-commit checks while enforcing best practices across the codebase.

This configuration ensures that every commit meets linting and testing requirements, maintaining code quality and minimizing the chances of introducing bugs.

---

## Securing Dependencies

### **Socket.dev**

- **[Socket.dev](https://socket.dev/)** is integrated to monitor dependencies for potential supply chain risks, detecting vulnerabilities and preventing malicious code from being introduced via third-party libraries.
- It provides additional security by alerting on suspicious or unsafe packages, ensuring that only trusted dependencies are used.

---

## Next steps (not in order)

### 1. **Authentication**

- Implement user authentication and authorization.

### 2. **GitHub Actions**

- Set up automated workflows using **GitHub Actions** for continuous integration (CI).
- Automate running linting, testing, and build processes on every push or pull request.
- Ensure actions trigger deployment processes for a streamlined production pipeline.

### 3. **Deployment**

- Prepare the app for deployment in production environments.
- Configure environment-specific settings for backend services and security.
- Use **Docker** for containerization to simplify deployment across different platforms and environments.

### 4. **Send Emails**

- Implement functionality to send reminders for due bills.
- Ensure reliable delivery of weekly, due day, and late payment alerts via email notifications.

### 5. **Visual Regression Testing**

- Introduce visual regression testing to safeguard the UI against unintended changes.
- Capture and compare visual snapshots to detect any variations in appearance across different states or updates.

### 6. **UI Improvements**

- Enhance the UI for better user experience and usability.
- Focus on accessibility improvements, including keyboard navigation, color contrast, and screen reader support.
- Improve mobile responsiveness and performance across various device sizes.
