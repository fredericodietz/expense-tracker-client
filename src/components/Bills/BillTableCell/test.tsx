import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BillTableCell from '.';
import { Categories } from '../../../types/common';

describe('<BillTableCell />', () => {
  beforeAll(() => {
    const mockDate = new Date(2024, 7, 7);
    vi.setSystemTime(mockDate);
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe('Mark as paid', () => {
    it('Should display that the bill is already paid', () => {
      const paidBill = {
        id: 1,
        name: 'paid bill',
        due_day: 3,
        is_paid: true,
        category: Categories.Education,
        amount_due: 100
      };
      render(
        <BillTableCell
          bill={paidBill}
          handleMarkAsPaid={() => false}
          handleEdit={() => false}
          handleDelete={() => false}
        />
      );
      const paidIcon = screen.getByTestId('status-paid');
      expect(paidIcon).toBeInTheDocument();
      const unpaidIcon = screen.queryByTestId('status-unpaid');
      expect(unpaidIcon).not.toBeInTheDocument();
      const lateIcon = screen.queryByTestId('status-late');
      expect(lateIcon).not.toBeInTheDocument();
      const markAsPaidButton = screen.queryByTestId('mark-as-paid-button');
      expect(markAsPaidButton).not.toBeInTheDocument();
    });

    it('Should display the bill as late', () => {
      const paidBill = {
        id: 1,
        name: 'paid bill',
        due_day: 3,
        is_paid: false,
        category: Categories.Education,
        amount_due: 100
      };
      render(
        <BillTableCell
          bill={paidBill}
          handleMarkAsPaid={() => false}
          handleEdit={() => false}
          handleDelete={() => false}
        />
      );
      const paidIcon = screen.queryByTestId('status-paid');
      expect(paidIcon).not.toBeInTheDocument();
      const unpaidIcon = screen.queryByTestId('status-unpaid');
      expect(unpaidIcon).not.toBeInTheDocument();
      const lateIcon = screen.queryByTestId('status-late');
      expect(lateIcon).toBeInTheDocument();
      const markAsPaidButton = screen.queryByTestId('mark-as-paid-button');
      expect(markAsPaidButton).toBeInTheDocument();
    });

    it('Should display the bill as unpaid', () => {
      const paidBill = {
        id: 1,
        name: 'paid bill',
        due_day: 13,
        is_paid: false,
        category: Categories.Education,
        amount_due: 100
      };
      render(
        <BillTableCell
          bill={paidBill}
          handleMarkAsPaid={() => false}
          handleEdit={() => false}
          handleDelete={() => false}
        />
      );
      const paidIcon = screen.queryByTestId('status-paid');
      expect(paidIcon).not.toBeInTheDocument();
      const unpaidIcon = screen.queryByTestId('status-unpaid');
      expect(unpaidIcon).toBeInTheDocument();
      const lateIcon = screen.queryByTestId('status-late');
      expect(lateIcon).not.toBeInTheDocument();
      const markAsPaidButton = screen.queryByTestId('mark-as-paid-button');
      expect(markAsPaidButton).toBeInTheDocument();
    });
  });
});
