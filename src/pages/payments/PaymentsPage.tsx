import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  DollarSign, ArrowUpRight, ArrowDownLeft, 
  History, CreditCard, Plus, Send 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { API_BASE_URL } from '../../config';
import API from '../../api/axios'; // Import the new middleman

export const PaymentsPage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      if (!user?.id) return;
      const res = await API.get(`${API_BASE_URL}/api/payments/history/${user.id}`);
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching payments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [user?.id]);

  const handleDeposit = async () => {
    const amountStr = window.prompt("Enter amount to deposit ($):");
    if (!amountStr || isNaN(Number(amountStr))) return;

    const amount = Number(amountStr);

    try {
      await API.post('${API_BASE_URL}/api/payments/mock-deposit', {
        userId: user?.id,
        amount: amount,
        description: "Funds added via Dashboard"
      });
      
      alert(`Successfully deposited $${amount}`);
      await refreshUser(); // Sync Global Balance
      fetchHistory(); 
    } catch (err) {
      alert("Deposit failed");
    }
  };

  const handleWithdraw = async () => {
    const amountStr = window.prompt("Enter amount to withdraw ($):");
    if (!amountStr || isNaN(Number(amountStr))) return;

    const amount = Number(amountStr);

    if (amount > (user?.balance || 0)) {
      alert(`Insufficient balance! You only have $${user?.balance}`);
      return;
    }

    try {
      await API.post('${API_BASE_URL}/api/payments/withdraw', {
        userId: user?.id,
        amount: amount,
        description: "Withdrawal to external account"
      });
      
      alert(`Successfully withdrew $${amount}`);
      await refreshUser(); 
      fetchHistory(); 
    } catch (err: any) {
      alert(err.response?.data?.error || "Withdrawal failed");
    }
  };

  // ✅ NEW: Handle Transfer Logic
  const handleTransfer = async () => {
    const email = window.prompt("Enter recipient email address:");
    if (!email) return;

    const amountStr = window.prompt("Enter amount to transfer ($):");
    if (!amountStr || isNaN(Number(amountStr))) return;

    const amount = Number(amountStr);

    if (amount > (user?.balance || 0)) {
      alert(`Insufficient balance! You only have $${user?.balance}`);
      return;
    }

    try {
      await API.post('${API_BASE_URL}/api/payments/transfer', {
        senderId: user?.id,
        recipientEmail: email,
        amount: amount,
        description: "Investment Transfer"
      });
      
      alert(`Successfully transferred $${amount} to ${email}`);
      await refreshUser(); 
      fetchHistory(); 
    } catch (err: any) {
      alert(err.response?.data?.error || "Transfer failed");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments & Finance</h1>
          <p className="text-gray-600">Manage your wallet and transaction history</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            leftIcon={<ArrowDownLeft size={18} />}
            onClick={handleWithdraw}
          >
            Withdraw
          </Button>
          
          {/* ✅ ADDED TRANSFER BUTTON */}
          <Button 
            variant="outline" 
            className="border-primary-600 text-primary-600"
            leftIcon={<Send size={18} />}
            onClick={handleTransfer}
          >
            Transfer
          </Button>

          <Button leftIcon={<Plus size={18} />} onClick={handleDeposit}>
            Add Funds
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary-600 text-black border-none">
          <CardBody>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-primary-600 text-sm font-medium">Available Balance</p>
                <h2 className="text-3xl font-bold mt-1">
                  ${user?.balance?.toLocaleString() || '0.00'}
                </h2>
              </div>
              <div className="p-2 bg-white/20 rounded-lg">
                <DollarSign size={24} />
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-success-100 rounded-lg mr-4">
                <ArrowUpRight size={20} className="text-success-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Deposits</p>
                <p className="text-xl font-bold text-gray-900">
                  ${transactions
                    .filter(t => t.type === 'deposit')
                    .reduce((acc, t) => acc + t.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-accent-100 rounded-lg mr-4">
                <History size={20} className="text-accent-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Transactions</p>
                <p className="text-xl font-bold text-gray-900">{transactions.length}</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
        </CardHeader>
        <CardBody className="p-0">
          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading history...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactions.map((tx) => (
                    <tr key={tx._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{tx.description}</td>
                      <td className={`px-6 py-4 font-bold ${
                        tx.type === 'deposit' || tx.type === 'payment' ? 'text-success-600' : 'text-error-600'
                      }`}>
                        {tx.type === 'deposit' || tx.type === 'payment' ? '+' : '-'}${tx.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={tx.status === 'Completed' ? 'success' : 'warning'}>{tx.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(tx.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};