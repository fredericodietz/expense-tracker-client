import { test, expect } from '@playwright/test';
import { data } from './data';

test('display stats', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-09-09T10:00:00'));

  await page.route('http://localhost:3000/bills', async (route) => {
    await route.fulfill({ json: data });
  });

  await page.goto('/');

  await expect(page).toHaveTitle(/Expense Tracker/);
  await expect(page.getByText('Overview')).toBeVisible();

  const billCell = await page.locator("[data-testid='bill-tablecell']").first();
  await expect(billCell).toBeVisible();

  const lateUnpaid = await page.getByTestId('late-unpaid-bills');
  expect(lateUnpaid).toContainText('2 Unpaid');

  const todayUnpaid = await page.getByTestId('today-unpaid-bills');
  expect(todayUnpaid).toContainText('0 Unpaid');

  const tomorrowUnpaid = await page.getByTestId('tomorrow-unpaid-bills');
  expect(tomorrowUnpaid).toHaveText('1 Unpaid');

  const tomorrowPaid = await page.getByTestId('tomorrow-paid-bills');
  expect(tomorrowPaid).toHaveText('1 Paid');

  const weekUnpaid = await page.getByTestId('this-week-unpaid-bills');
  expect(weekUnpaid).toHaveText('1 Unpaid');
});

test('mark a late bill as paid', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-09-09T10:00:00'));

  await page.route('http://localhost:3000/bills', async (route) => {
    await route.fulfill({ json: data });
  });

  await page.route('http://localhost:3000/bills/4/pay', async (route) => {
    await route.fulfill({
      json: {
        id: 1,
        amountPaid: 1200,
        paymentDate: '2024-09-09T00:00:00.000Z',
        billId: 4
      }
    });
  });

  await page.goto('/');

  const billCell = await page.locator("[data-testid='bill-tablecell']").first();
  await expect(billCell).toBeVisible();

  const lateUnpaid = await page.getByTestId('late-unpaid-bills');
  expect(lateUnpaid).toContainText('2 Unpaid');

  await page.locator("[data-testid='mark-as-paid-button']").first().click();
  await page.getByRole('button', { name: 'Yes' }).click();

  await page.locator("[data-testid='late-unpaid-bills']").waitFor();

  await expect(page.getByTestId('late-unpaid-bills')).toContainText('1 Unpaid');
});

test('delete bill', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-09-09T10:00:00'));

  await page.route('http://localhost:3000/bills', async (route) => {
    await route.fulfill({ json: data });
  });

  await page.route('http://localhost:3000/bills/4', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Bill deleted successfully' })
    });
  });

  await page.goto('/');

  const billCell = await page.locator("[data-testid='bill-tablecell']").first();
  await expect(billCell).toBeVisible();

  const billsList = await page.getByTestId('bill-tablecell').all();
  await expect(billsList).toHaveLength(7);

  const lateUnpaid = await page.getByTestId('late-unpaid-bills');
  expect(lateUnpaid).toContainText('2 Unpaid');

  await page.locator("[data-testid='delete-button']").first().click();
  await page.getByRole('button', { name: 'Yes' }).click();

  await page.locator("[data-testid='late-unpaid-bills']").waitFor();

  await expect(page.getByTestId('late-unpaid-bills')).toContainText('1 Unpaid');

  const newBillsList = await page.getByTestId('bill-tablecell').all();
  await expect(newBillsList).toHaveLength(6);
});

test('add bill', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-09-09T10:00:00'));
  const newData = await page.route(
    'http://localhost:3000/bills',
    async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          json: {
            id: 1,
            name: 'AllSpice',
            amountDue: 10,
            category: 'Utilities',
            dueDay: 10
          }
        });
      } else {
        await route.fulfill({ json: data });
      }
    }
  );

  await page.goto('/');

  const billCell = await page.locator("[data-testid='bill-tablecell']").first();
  await expect(billCell).toBeVisible();

  const billsList = await page.getByTestId('bill-tablecell').all();
  await expect(billsList).toHaveLength(7);

  await page.locator("[data-testid='add-new-button']").click();
  await page.getByPlaceholder('Bill').fill('AllSpice');
  await page.getByLabel('Due Day *').fill('10');
  await page.getByLabel('Amount').fill('10');
  await page.getByRole('button', { name: 'Add' }).click();

  await page.locator("[data-testid='late-unpaid-bills']").waitFor();

  const newBillsList = await page.getByTestId('bill-tablecell').all();
  await expect(newBillsList).toHaveLength(8);
});

test('edit bill', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-09-09T10:00:00'));
  await page.route('http://localhost:3000/bills', async (route) => {
    await route.fulfill({ json: data });
  });
  await page.route('http://localhost:3000/bills/4', async (route) => {
    await route.fulfill();
  });

  await page.goto('/');

  const billCell = await page.locator("[data-testid='bill-tablecell']").first();
  await expect(billCell).toBeVisible();

  await page.locator("[data-testid='edit-button']").first().click();

  await page.getByLabel('Category').click();
  await page.getByText('Transport').click();
  await page.getByRole('button', { name: 'Save' }).click();
  const billCellUpdated = await page
    .locator("[data-testid='bill-tablecell']")
    .first();
  expect(billCellUpdated).toContainText('Transport');
});

test('filter bills', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-09-09T10:00:00'));
  await page.route('http://localhost:3000/bills', async (route) => {
    await route.fulfill({ json: data });
  });

  await page.goto('/');

  const billCell = await page.locator("[data-testid='bill-tablecell']").first();
  await expect(billCell).toBeVisible();

  const billsList = await page.locator("[data-testid='bill-tablecell']").all();
  await expect(billsList).toHaveLength(7);

  await page.getByLabel('Filter').click();
  await page.getByRole('option', { name: 'Paid', exact: true }).click();

  const paidBillsList = await page
    .locator("[data-testid='bill-tablecell']")
    .all();
  await expect(paidBillsList).toHaveLength(1);

  await page.getByLabel('Filter').first().click();
  await page.getByRole('option', { name: 'Unpaid', exact: true }).click();

  const unpaidBillsList = await page
    .locator("[data-testid='bill-tablecell']")
    .all();
  await expect(unpaidBillsList).toHaveLength(6);

  await page.getByLabel('Filter').first().click();
  await page.getByRole('option', { name: 'Late', exact: true }).click();

  const lateBillsList = await page
    .locator("[data-testid='bill-tablecell']")
    .all();
  await expect(lateBillsList).toHaveLength(2);

  await page.getByLabel('Filter').first().click();
  await page.getByRole('option', { name: 'Show all', exact: true }).click();

  const allBillsList = await page
    .locator("[data-testid='bill-tablecell']")
    .all();
  await expect(allBillsList).toHaveLength(7);
});
