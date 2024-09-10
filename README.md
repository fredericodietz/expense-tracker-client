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

- **Vite** – Fast development environment for the frontend.
- **React** – JavaScript library for building user interfaces.
- **TypeScript** – Strongly typed programming language.
- **MUI** – Material UI for styling React components.
- **Vitest** – Unit testing framework.
- **Playwright** – End-to-end testing framework.
- **ESLint** – Linting tool for maintaining code quality.
- **Prettier** – Code formatting tool.
- **Husky**: Git hooks to ensure all tests pass and only well-linted code is committed.
- **EditorConfig**: Maintains consistent coding styles across different editors and IDEs.

## Running the App Locally

This app consists of two main components: the **client** and the **server**. Follow the steps below to set it up and run it on your local machine.

### 1. Backend Server

1. Clone the server repository:
   ```bash
   git clone https://github.com/fredericodietz/expense-tracker-server
   ```
2. Navigate into the server directory:
   ```bash
   cd expense-tracker-server
   ```
3. Start the server and the database using Docker:
   ```bash
   docker compose up app db
   ```

#### Seed Data (Optional)

If you want to populate the database with some sample data, run the following command:

```bash
docker compose up seed
```

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

### Testing

You can perform several testing-related tasks as follows:

- **Run unit tests**:

  ```bash
  npm run test
  ```

- **Lint the code** to ensure it adheres to style guidelines:

  ```bash
  npm run lint
  ```

- **Check code coverage** from tests:
  ```bash
  npm run coverage
  ```

### End-to-End Testing

Run Playwright’s end-to-end tests with the interactive UI:

```bash
npx playwright test --ui
```

---

By following these instructions, you can set up the app locally, run it, and ensure everything is working with proper tests in place.
