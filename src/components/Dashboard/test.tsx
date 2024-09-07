import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Dashboard from '.';

test('Display title', async () => {
  render(<Dashboard />);
  expect(
    screen.getByRole('heading', {
      name: 'Expense Tracker App'
    })
  ).toBeInTheDocument();
});
