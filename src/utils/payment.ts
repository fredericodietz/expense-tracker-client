import { BillType, Payment, Stats } from '../types';

export const isPaid = (payments: Payment[], day = new Date()): boolean => {
  const currentYear = day.getFullYear();
  const currentMonth = day.getMonth();

  if (payments?.length === 0) {
    return false;
  }

  return payments.some((payment: Payment) => {
    const givenDate = new Date(payment.paymentDate);
    const givenYear = givenDate.getFullYear();
    const givenMonth = givenDate.getMonth();
    return currentYear === givenYear && currentMonth === givenMonth;
  });
};

export const paymentReport = (bills: BillType[], day = new Date()): Stats => {
  const paid = bills.filter((bill) => isPaid(bill.Payments, day));
  const unpaid = bills.filter((bill) => !isPaid(bill.Payments, day));
  return { paid, unpaid };
};
