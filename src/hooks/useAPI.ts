import { useState } from 'react';
import { BillType } from '../types';
import { useBillsContext } from '../context/BillsContext';

interface UseAPI {
  isLoading: boolean;
  error: string | null;
  listBills: () => void;
  createBill: (newBill: Omit<BillType, 'id'>) => void;
  handleUpdateBill: (updatedBill: BillType) => void;
  handleDeleteBill: (id: number) => void;
  handlePayBill: (id: number, amountPaid: string) => void;
}

const useAPI = (): UseAPI => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { initBills, addBill, deleteBill, markAsPaid, updateBill } =
    useBillsContext();

  const baseUrl = `${import.meta.env.VITE_API_URL}/bills`;

  const listBills = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(baseUrl);
      const data = await response.json();
      initBills(data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch bills');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createBill = async (newBill: Omit<BillType, 'id'>) => {
    setIsLoading(true);
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBill)
      });
      if (response.ok) {
        const createdBill = await response.json();
        addBill(createdBill);
        setError(null);
      } else {
        setError('Failed to create bill');
      }
    } catch (error) {
      setError('Failed to create bill');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayBill = async (id: number, amountPaid: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/${id}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amountPaid,
          paymentDate: new Date(),
          billId: id
        })
      });
      if (response.ok) {
        const payment = await response.json();
        markAsPaid(id, payment);
        setError(null);
      } else {
        setError('Failed to mark as paid');
      }
    } catch (error) {
      setError('Failed to mark as paid');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBill = async (updatedBill: BillType) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/${updatedBill.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBill)
      });
      if (response.ok) {
        updateBill(updatedBill);
        setError(null);
      } else {
        setError('Failed to update bill');
      }
    } catch (error) {
      setError('Failed to update bill');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBill = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        deleteBill(id);
        setError(null);
      } else {
        setError('Failed to delete bill');
      }
    } catch (error) {
      setError('Failed to delete bill');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    listBills,
    createBill,
    handleUpdateBill,
    handleDeleteBill,
    handlePayBill
  };
};

export default useAPI;
