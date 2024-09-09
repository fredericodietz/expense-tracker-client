import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import BillTableCell from '.';
import { Categories } from '../../../types/common';
import { BillType } from '../../../types';

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
      const today = new Date();
      const paidBill: BillType = {
        id: 1,
        name: 'paid bill',
        dueDay: 3,
        category: Categories.Education,
        amountDue: '100',
        Payments: [
          {
            id: 1,
            amountPaid: 65,
            paymentDate: today.toISOString(),
            billId: 1
          }
        ]
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
      const paidBill: BillType = {
        id: 1,
        name: 'paid bill',
        dueDay: 3,
        category: Categories.Education,
        amountDue: '100',
        Payments: []
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
      const paidBill: BillType = {
        id: 1,
        name: 'paid bill',
        dueDay: 13,
        category: Categories.Education,
        amountDue: '100',
        Payments: []
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
