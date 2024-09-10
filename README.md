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
