import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // Initial state for transactions (set to empty)
  const [transactions, setTransactions] = useState([]);

  // State for balances (initialized to zero)
  const [balance, setBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);
  
  // State for adding new expenses and incomes
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: '' });
  const [newIncome, setNewIncome] = useState({ description: '', amount: '' });

  // Categories for expenses
  const categories = ['Employee Salary', 'Bill Expense', 'Office Maintenance', 'Others'];
  const [expenseData, setExpenseData] = useState([0, 0, 0, 0]);  // For the pie chart

  // Function to handle deletion of a transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  // Function to add a new expense
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (newExpense.description && newExpense.amount && newExpense.category) {
      const newTransaction = {
        description: newExpense.description,
        id: `#${Math.floor(Math.random() * 100000)}`, // Generate a random ID
        category: newExpense.category,
        card: 'N/A',
        date: new Date().toLocaleString(),
        amount: `Rs. ${newExpense.amount}`,
        type: 'Expense'
      };
      setTransactions([...transactions, newTransaction]);
      setShowAddExpense(false);
      setNewExpense({ description: '', amount: '', category: '' }); // Reset the form

      // Update total expense
      setTotalExpense(prev => prev + parseFloat(newExpense.amount));
      setBalance(prev => prev - parseFloat(newExpense.amount)); // Decrease balance

      // Update Pie chart data based on category
      const updatedExpenseData = [...expenseData];
      const categoryIndex = categories.indexOf(newExpense.category);
      if (categoryIndex >= 0) {
        updatedExpenseData[categoryIndex] += parseFloat(newExpense.amount);
        setExpenseData(updatedExpenseData);  // Update pie chart data
      }
    }
  };

  // Function to add a new income
  const handleAddIncome = (e) => {
    e.preventDefault();
    if (newIncome.description && newIncome.amount) {
      const newTransaction = {
        description: newIncome.description,
        id: `#${Math.floor(Math.random() * 100000)}`, // Generate a random ID
        category: 'Income',
        card: 'N/A',
        date: new Date().toLocaleString(),
        amount: `Rs. ${newIncome.amount}`,
        type: 'Income'
      };
      setTransactions([...transactions, newTransaction]);
      setShowAddIncome(false);
      setNewIncome({ description: '', amount: '' }); // Reset the form

      // Update total income
      setTotalIncome(prev => prev + parseFloat(newIncome.amount));
      setBalance(prev => prev + parseFloat(newIncome.amount)); // Increase balance
    }
  };

  // Bar chart data for Weekly Activity
  const barData = {
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Expense',
        backgroundColor: '#007bff',
        data: transactions.filter(t => t.type === 'Expense').map(() => Math.random() * 20000), // Random data for demo
      },
      {
        label: 'Income',
        backgroundColor: '#28a745',
        data: transactions.filter(t => t.type === 'Income').map(() => Math.random() * 20000), // Random data for demo
      }
    ]
  };

  // Pie chart data for Expense Statistics
  const pieData = {
    labels: categories, // Display the expense categories
    datasets: [
      {
        data: expenseData, // Dynamically updated pie chart data
        backgroundColor: ['#007bff', '#ff6384', '#ffcd56', '#36a2eb'],
      }
    ]
  };

  return (
    <div className="dashboard">
      {/* Main content */}
      <div className="main-content">
        <div className="top-bar">
          <button className="add-expense-btn" onClick={() => setShowAddExpense(true)}>Add Expense</button>
          <button className="add-income-btn" onClick={() => setShowAddIncome(true)}>Add Income</button>
          <div className="user-icon">👤</div>
        </div>

        <div className="cards-container">
          <div className="card">My Balance<br /><strong>Rs. {balance}</strong></div>
          <div className="card">Income<br /><strong>Rs. {totalIncome}</strong></div>
          <div className="card">Expense<br /><strong>Rs. {totalExpense}</strong></div>
          <div className="card">Total Saving<br /><strong>Rs. {balance - totalExpense}</strong></div>
        </div>

        <div className="chart-section">
          <div className="chart-box">
            <h3>Weekly Activity</h3>
            <Bar data={barData} />
          </div>
          <div className="statistics-box">
            <h3>Expense Statistics</h3>
            <Pie data={pieData} />
          </div>
        </div>

        <div className="recent-transactions">
          <h3>Recent Transactions</h3>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Transaction ID</th>
                <th>Category</th>
                <th>Card</th>
                <th>Date & Time</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.description}</td>
                  <td>{transaction.id}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.card}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.amount}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteTransaction(transaction.id)}>Delete</button>
                    {transaction.type === 'download' ? (
                      <button className="download-btn">Download</button>
                    ) : (
                      <button className="add-receipt-btn">Add Receipt</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAddExpense && (
          <div className="add-expense-modal">
            <h3>Add Expense</h3>
            <form onSubmit={handleAddExpense}>
              <input 
                type="text" 
                placeholder="Description" 
                value={newExpense.description} 
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} 
                required 
              />
              <input 
                type="number" 
                placeholder="Amount" 
                value={newExpense.amount} 
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} 
                required 
              />
              <select 
                value={newExpense.category} 
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })} 
                required
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              <button type="submit">Add Expense</button>
              <button type="button" onClick={() => setShowAddExpense(false)}>Cancel</button>
            </form>
          </div>
        )}

        {showAddIncome && (
          <div className="add-income-modal">
            <h3>Add Income</h3>
            <form onSubmit={handleAddIncome}>
              <input 
                type="text" 
                placeholder="Description" 
                value={newIncome.description} 
                onChange={(e) => setNewIncome({ ...newIncome, description: e.target.value })} 
                required 
              />
              <input 
                type="number" 
                placeholder="Amount" 
                value={newIncome.amount} 
                onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })} 
                required 
              />
              <button type="submit">Add Income</button>
              <button type="button" onClick={() => setShowAddIncome(false)}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
