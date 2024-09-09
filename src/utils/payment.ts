import { BillType, Payment, Stats } from '../types';

export const isPaid = (payments: Payment[]): boolean => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  if (payments?.length === 0) {
    return false;
  }

  return payments.some((payment: Payment) => {
    const paymentDate = new Date(payment.paymentDate);
    const paymentYear = paymentDate.getFullYear();
    const paymentMonth = paymentDate.getMonth();
    return currentYear === paymentYear && currentMonth === paymentMonth;
  });
};

export const paymentReport = (bills: BillType[]): Stats => {
  const paid = bills.filter((bill) => isPaid(bill.Payments));
  const unpaid = bills.filter((bill) => !isPaid(bill.Payments));
  return { paid, unpaid };
};
