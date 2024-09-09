import React, { createContext, ReactNode, useContext, useState } from 'react';
import { BillType, StatsReport, Stats, Payment } from '../types';
import { paymentReport } from '../utils/payment';
import { isDayInCurrentWeek, isTomorrow } from '../utils/date';

interface BillContextType {
  bills: BillType[];
  initBills: (bills: BillType[]) => void;
  addBill: (bill: BillType) => void;
  deleteBill: (id: number) => void;
  markAsPaid: (id: number, payment: Payment) => void;
  updateBill: (bill: BillType) => void;
  stats: StatsReport;
}

const statsObj = {
  late: {
    paid: [],
    unpaid: []
  },
  today: {
    paid: [],
    unpaid: []
  },
  tomorrow: {
    paid: [],
    unpaid: []
  },
  week: {
    paid: [],
    unpaid: []
  }
};

export const BillsContext = createContext<BillContextType | undefined>(
  undefined
);

export const BillsProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [bills, setBills] = useState<BillType[]>([]);
  const [stats, setStats] = useState<StatsReport>(statsObj);

  const initBills = (allBills: BillType[]): void => {
    setBills(allBills);
    setupStats(allBills);
  };

  const setupStats = (allBills: BillType[]): void => {
    const now = new Date();
    const currentDayOfWeek = now.getDate();

    const late: Stats = paymentReport(
      allBills.filter((b) => b.dueDay < currentDayOfWeek),
      now
    );

    const today: Stats = paymentReport(
      allBills.filter((b) => b.dueDay === currentDayOfWeek),
      now
    );

    const tomorrowDate = new Date(now);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow: Stats = paymentReport(
      allBills.filter((b) => isTomorrow(b.dueDay)),
      tomorrowDate
    );

    const startOfWeek = new Date();
    startOfWeek.setDate(now.getDate() - currentDayOfWeek);
    const week: Stats = paymentReport(
      allBills.filter((b) => isDayInCurrentWeek(b.dueDay))
    );

    setStats({
      late,
      today,
      tomorrow,
      week
    });
  };

  const addBill = (bill: BillType): void => {
    const newBill = { ...bill, Payments: [] };
    setBills((prev) => {
      const billsList = [...prev, newBill];
      setupStats(billsList);
      return billsList;
    });
  };

  const deleteBill = (id: number) => {
    setBills((prev) => {
      const billsList = prev.filter((b) => b.id !== id);
      setupStats(billsList);
      return billsList;
    });
  };

  const markAsPaid = (id: number, payment: Payment): void => {
    setBills((prev) => {
      const billsList = [...prev];
      const paidBillIndex = billsList.findIndex((b) => b.id === id);
      if (paidBillIndex) {
        billsList[paidBillIndex].Payments.push(payment);
      }
      setupStats(billsList);
      return billsList;
    });
  };

  const updateBill = (updatedBill: BillType): void => {
    setBills((prev) => {
      const billsList = [...prev];
      const oldBillIndex = billsList.findIndex((b) => b.id === updatedBill.id);
      if (oldBillIndex) {
        billsList[oldBillIndex] = updatedBill;
      }
      setupStats(billsList);
      return billsList;
    });
  };

  return (
    <BillsContext.Provider
      value={{
        bills,
        initBills,
        addBill,
        deleteBill,
        markAsPaid,
        updateBill,
        stats
      }}>
      {children}
    </BillsContext.Provider>
  );
};

export const useBillsContext = () => {
  const context = useContext(BillsContext);
  if (context === undefined) {
    throw new Error('useBillsContext must be used within a BillsProvider');
  }
  return context;
};
