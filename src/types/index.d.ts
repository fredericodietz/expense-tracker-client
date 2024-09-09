import { Categories } from './common';

export interface BillType {
  id: number;
  name: string;
  amountDue?: string | null;
  dueDay: number;
  category: Categories;
  Payments: Payment[];
}

export interface Payment {
  id: number;
  amountPaid: number;
  billId: id;
  paymentDate: string;
}

export interface StatsReport {
  late: Stats;
  today: Stats;
  tomorrow: Stats;
  week: Stats;
}

export interface Stats {
  paid: BillType[];
  unpaid: BillType[];
}
