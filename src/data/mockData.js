// Categories with their colors for charts
export const CATEGORIES = {
  Salary: { color: '#6366f1', icon: '💰' },
  Freelance: { color: '#8b5cf6', icon: '💻' },
  Investments: { color: '#06b6d4', icon: '📈' },
  Food: { color: '#f59e0b', icon: '🍕' },
  Shopping: { color: '#ec4899', icon: '🛍️' },
  Transport: { color: '#14b8a6', icon: '🚗' },
  Entertainment: { color: '#f97316', icon: '🎬' },
  Utilities: { color: '#64748b', icon: '⚡' },
  Healthcare: { color: '#10b981', icon: '🏥' },
  Education: { color: '#3b82f6', icon: '📚' },
  Rent: { color: '#ef4444', icon: '🏠' },
  Gifts: { color: '#a855f7', icon: '🎁' },
};

export const initialTransactions = [
  { id: 1, date: '2026-03-28', description: 'Monthly Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: 2, date: '2026-03-27', description: 'Grocery Shopping', amount: 85.50, category: 'Food', type: 'expense' },
  { id: 3, date: '2026-03-26', description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', type: 'expense' },
  { id: 4, date: '2026-03-25', description: 'Freelance Web Design', amount: 1200, category: 'Freelance', type: 'income' },
  { id: 5, date: '2026-03-24', description: 'Electric Bill', amount: 120, category: 'Utilities', type: 'expense' },
  { id: 6, date: '2026-03-23', description: 'Uber Ride', amount: 24.50, category: 'Transport', type: 'expense' },
  { id: 7, date: '2026-03-22', description: 'Online Course - React', amount: 49.99, category: 'Education', type: 'expense' },
  { id: 8, date: '2026-03-20', description: 'Dividend Income', amount: 340, category: 'Investments', type: 'income' },
  { id: 9, date: '2026-03-19', description: 'Restaurant Dinner', amount: 62.80, category: 'Food', type: 'expense' },
  { id: 10, date: '2026-03-18', description: 'New Headphones', amount: 149.99, category: 'Shopping', type: 'expense' },
  { id: 11, date: '2026-03-15', description: 'Health Checkup', amount: 200, category: 'Healthcare', type: 'expense' },
  { id: 12, date: '2026-03-14', description: 'Apartment Rent', amount: 1500, category: 'Rent', type: 'expense' },
  { id: 13, date: '2026-03-12', description: 'Birthday Gift for Mom', amount: 75, category: 'Gifts', type: 'expense' },
  { id: 14, date: '2026-03-10', description: 'Freelance Logo Design', amount: 800, category: 'Freelance', type: 'income' },
  { id: 15, date: '2026-03-08', description: 'Gas Station', amount: 55, category: 'Transport', type: 'expense' },

  // February 2026
  { id: 16, date: '2026-02-28', description: 'Monthly Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: 17, date: '2026-02-26', description: 'Winter Jacket', amount: 189.99, category: 'Shopping', type: 'expense' },
  { id: 18, date: '2026-02-24', description: 'Grocery Shopping', amount: 92.30, category: 'Food', type: 'expense' },
  { id: 19, date: '2026-02-22', description: 'Internet Bill', amount: 69.99, category: 'Utilities', type: 'expense' },
  { id: 20, date: '2026-02-20', description: 'Freelance App Dev', amount: 2500, category: 'Freelance', type: 'income' },
  { id: 21, date: '2026-02-18', description: 'Spotify Premium', amount: 9.99, category: 'Entertainment', type: 'expense' },
  { id: 22, date: '2026-02-15', description: 'Apartment Rent', amount: 1500, category: 'Rent', type: 'expense' },
  { id: 23, date: '2026-02-14', description: 'Valentine Dinner', amount: 125, category: 'Food', type: 'expense' },
  { id: 24, date: '2026-02-12', description: 'Taxi to Airport', amount: 45, category: 'Transport', type: 'expense' },
  { id: 25, date: '2026-02-10', description: 'Stock Dividends', amount: 280, category: 'Investments', type: 'income' },
  { id: 26, date: '2026-02-08', description: 'Dentist Visit', amount: 150, category: 'Healthcare', type: 'expense' },
  { id: 27, date: '2026-02-05', description: 'Book Purchase', amount: 34.99, category: 'Education', type: 'expense' },

  // January 2026
  { id: 28, date: '2026-01-30', description: 'Monthly Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: 29, date: '2026-01-28', description: 'Grocery Shopping', amount: 110.25, category: 'Food', type: 'expense' },
  { id: 30, date: '2026-01-25', description: 'Gym Membership', amount: 49.99, category: 'Healthcare', type: 'expense' },
  { id: 31, date: '2026-01-22', description: 'New Year Gift', amount: 50, category: 'Gifts', type: 'expense' },
  { id: 32, date: '2026-01-20', description: 'Freelance Consulting', amount: 1800, category: 'Freelance', type: 'income' },
  { id: 33, date: '2026-01-18', description: 'Movie Tickets', amount: 32, category: 'Entertainment', type: 'expense' },
  { id: 34, date: '2026-01-15', description: 'Apartment Rent', amount: 1500, category: 'Rent', type: 'expense' },
  { id: 35, date: '2026-01-12', description: 'Phone Bill', amount: 85, category: 'Utilities', type: 'expense' },
  { id: 36, date: '2026-01-10', description: 'Gas Station', amount: 48, category: 'Transport', type: 'expense' },
  { id: 37, date: '2026-01-08', description: 'Winter Boots', amount: 129.99, category: 'Shopping', type: 'expense' },
  { id: 38, date: '2026-01-05', description: 'Online Workshop', amount: 99, category: 'Education', type: 'expense' },

  // December 2025
  { id: 39, date: '2025-12-30', description: 'Year-End Bonus', amount: 3000, category: 'Salary', type: 'income' },
  { id: 40, date: '2025-12-28', description: 'Monthly Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: 41, date: '2025-12-25', description: 'Christmas Gifts', amount: 350, category: 'Gifts', type: 'expense' },
  { id: 42, date: '2025-12-22', description: 'Grocery Shopping', amount: 145, category: 'Food', type: 'expense' },
  { id: 43, date: '2025-12-20', description: 'Holiday Dinner', amount: 180, category: 'Food', type: 'expense' },
  { id: 44, date: '2025-12-18', description: 'Freelance Project', amount: 1500, category: 'Freelance', type: 'income' },
  { id: 45, date: '2025-12-15', description: 'Apartment Rent', amount: 1500, category: 'Rent', type: 'expense' },
  { id: 46, date: '2025-12-12', description: 'Heating Bill', amount: 150, category: 'Utilities', type: 'expense' },
  { id: 47, date: '2025-12-10', description: 'Concert Tickets', amount: 85, category: 'Entertainment', type: 'expense' },
  { id: 48, date: '2025-12-08', description: 'Metro Pass', amount: 65, category: 'Transport', type: 'expense' },
  { id: 49, date: '2025-12-05', description: 'Investment Returns', amount: 450, category: 'Investments', type: 'income' },
  { id: 50, date: '2025-12-02', description: 'Winter Coat', amount: 220, category: 'Shopping', type: 'expense' },

  // November 2025
  { id: 51, date: '2025-11-28', description: 'Monthly Salary', amount: 5200, category: 'Salary', type: 'income' },
  { id: 52, date: '2025-11-25', description: 'Thanksgiving Dinner', amount: 95, category: 'Food', type: 'expense' },
  { id: 53, date: '2025-11-22', description: 'Black Friday Shopping', amount: 320, category: 'Shopping', type: 'expense' },
  { id: 54, date: '2025-11-20', description: 'Freelance UI Design', amount: 950, category: 'Freelance', type: 'income' },
  { id: 55, date: '2025-11-15', description: 'Apartment Rent', amount: 1500, category: 'Rent', type: 'expense' },
  { id: 56, date: '2025-11-10', description: 'Water Bill', amount: 45, category: 'Utilities', type: 'expense' },
  { id: 57, date: '2025-11-05', description: 'Flu Medication', amount: 35, category: 'Healthcare', type: 'expense' },
];

// ===== Helper Functions =====

export function getMonthlyData(transactions) {
  const monthMap = {};
  transactions.forEach(t => {
    const month = t.date.substring(0, 7); // YYYY-MM
    if (!monthMap[month]) {
      monthMap[month] = { month, income: 0, expenses: 0 };
    }
    if (t.type === 'income') {
      monthMap[month].income += t.amount;
    } else {
      monthMap[month].expenses += t.amount;
    }
  });

  const sorted = Object.values(monthMap).sort((a, b) => a.month.localeCompare(b.month));

  let balance = 0;
  return sorted.map(m => {
    balance += m.income - m.expenses;
    return {
      ...m,
      label: new Date(m.month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      balance: parseFloat(balance.toFixed(2)),
      income: parseFloat(m.income.toFixed(2)),
      expenses: parseFloat(m.expenses.toFixed(2)),
    };
  });
}

export function getCategoryBreakdown(transactions) {
  const catMap = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      if (!catMap[t.category]) {
        catMap[t.category] = 0;
      }
      catMap[t.category] += t.amount;
    });

  return Object.entries(catMap)
    .map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
      color: CATEGORIES[name]?.color || '#6b7280',
      icon: CATEGORIES[name]?.icon || '📦',
    }))
    .sort((a, b) => b.value - a.value);
}

export function getTotals(transactions) {
  let income = 0;
  let expenses = 0;
  transactions.forEach(t => {
    if (t.type === 'income') income += t.amount;
    else expenses += t.amount;
  });
  return {
    income: parseFloat(income.toFixed(2)),
    expenses: parseFloat(expenses.toFixed(2)),
    balance: parseFloat((income - expenses).toFixed(2)),
  };
}

export function getInsights(transactions) {
  const categoryBreakdown = getCategoryBreakdown(transactions);
  const highestCategory = categoryBreakdown[0] || null;

  const monthlyData = getMonthlyData(transactions);
  const currentMonth = monthlyData[monthlyData.length - 1] || null;
  const prevMonth = monthlyData[monthlyData.length - 2] || null;

  const totals = getTotals(transactions);
  const savingsRate = totals.income > 0
    ? parseFloat(((totals.balance / totals.income) * 100).toFixed(1))
    : 0;

  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const uniqueDays = new Set(expenseTransactions.map(t => t.date)).size;
  const avgDailySpend = uniqueDays > 0
    ? parseFloat((totals.expenses / uniqueDays).toFixed(2))
    : 0;

  const expenseChange = prevMonth && prevMonth.expenses > 0
    ? parseFloat((((currentMonth?.expenses || 0) - prevMonth.expenses) / prevMonth.expenses * 100).toFixed(1))
    : 0;

  const incomeChange = prevMonth && prevMonth.income > 0
    ? parseFloat((((currentMonth?.income || 0) - prevMonth.income) / prevMonth.income * 100).toFixed(1))
    : 0;

  return {
    highestCategory,
    currentMonth,
    prevMonth,
    savingsRate,
    avgDailySpend,
    expenseChange,
    incomeChange,
    totalTransactions: transactions.length,
  };
}
