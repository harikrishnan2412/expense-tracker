import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Sample state for transactions
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'expense', amount: 50, category: 'Food', date: '2024-10-05' },
    { id: 2, type: 'income', amount: 200, category: 'Salary', date: '2024-10-02' },
    { id: 3, type: 'expense', amount: 30, category: 'Transport', date: '2024-10-03' },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: ''
  });

  // Total calculations
  const totalIncome = transactions
    .filter((txn) => txn.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((txn) => txn.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  // Percentage of expenses compared to income
  const expensePercentage = totalIncome === 0 ? 0 : (totalExpense / totalIncome) * 100;

  // Handle adding a transaction
  const handleAddTransaction = (e) => {
    e.preventDefault();
    const newId = transactions.length + 1;
    setTransactions([...transactions, { ...newTransaction, id: newId, amount: parseFloat(newTransaction.amount) }]);
    setNewTransaction({ type: 'expense', amount: '', category: '', date: '' }); // Reset form fields
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Expense Tracker Dashboard</h1>
      </header>

      <div className="dashboard-grid">
        <div className="balance-section">
          <h2>Total Balance: ${totalBalance.toFixed(2)}</h2>
        </div>

        <div className="progress-section">
          <h3>Expense Monitoring</h3>
          <div className="circular-progress">
            <svg>
              <circle className="progress-circle-bg" cx="50" cy="50" r="45" />
              <circle
                className="progress-circle"
                cx="50"
                cy="50"
                r="45"
                strokeDasharray={`${expensePercentage} ${100 - expensePercentage}`}
              />
            </svg>
            <div className="progress-label">{expensePercentage.toFixed(0)}%</div>
          </div>
        </div>

        <div className="transactions-section">
          <h3>Recent Transactions</h3>
          <ul className="transaction-list">
            {transactions.map((txn) => (
              <li key={txn.id} className={txn.type}>
                {txn.date} - {txn.category} - ${txn.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        <div className="add-transaction-section">
          <h3>Add New Transaction</h3>
          <form onSubmit={handleAddTransaction} className="transaction-form">
            <label>
              Type:
              <select
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </label>
            <label>
              Amount:
              <input
                type="number"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                required
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                required
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                required
              />
            </label>
            <button type="submit">Add Transaction</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
