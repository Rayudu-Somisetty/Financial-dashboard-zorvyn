# Zorvyn Finance Dashboard 💰

A premium, interactive finance dashboard built with **React + Vite** featuring rich data visualizations, role-based access control simulation, dark/light theme, and comprehensive state management.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### Core
- **Dashboard Overview** – Summary cards (Balance, Income, Expenses), Balance Trend chart, Spending Breakdown donut chart, Recent Transactions
- **Transactions** – Sortable table with search, category/type/date filters, add/edit/delete (admin), CSV export
- **Insights** – Highest spending category, savings rate, daily average, income vs expenses ratio, monthly trends
- **Role-Based UI** – Toggle between Admin (full CRUD) and Viewer (read-only) via sidebar button
- **State Management** – React Context API with `useReducer` for transactions, filters, sorting, role, and theme

### Enhancements
- 🌙 **Dark/Light Mode** – Full theme toggle with smooth CSS transitions
- 💾 **Data Persistence** – Transactions, theme, and role saved to `localStorage`
- 📥 **CSV Export** – Download filtered transactions as a `.csv` file
- 🎬 **Animations** – Fade-in, staggered card entries, hover micro-interactions
- 📱 **Fully Responsive** – Desktop sidebar collapses to mobile bottom navigation

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Bundler | Vite 8 |
| Charts | Recharts |
| Icons | Lucide React |
| Routing | React Router DOM v7 |
| Styling | Vanilla CSS (custom properties + glassmorphism) |
| State | Context API + useReducer |
| Persistence | localStorage |

---

## 🚀 Setup & Run

```bash
# Clone the repository
git clone https://github.com/Rayudu-Somisetty/Financial-dashboard-zorvyn.git
cd Financial-dashboard-zorvyn

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard/          # SummaryCards, BalanceTrendChart, SpendingBreakdownChart, RecentTransactions
│   ├── Transactions/       # TransactionTable, TransactionForm
│   ├── Insights/           # InsightCards, MonthlyComparisonChart
│   └── Layout/             # Sidebar, Header
├── context/
│   └── AppContext.jsx      # Global state (useReducer + Context)
├── data/
│   └── mockData.js         # 57 transactions, helpers for analytics
├── pages/
│   ├── DashboardPage.jsx
│   ├── TransactionsPage.jsx
│   └── InsightsPage.jsx
├── App.jsx                 # Router + Layout
├── main.jsx                # Entry point
└── index.css               # Design system (themes, glassmorphism, animations)
```

---

## 🎨 Design Approach

1. **Glassmorphism** – Cards use `backdrop-filter: blur()` with subtle borders for a modern, layered look
2. **Custom Color System** – HSL-based palette with CSS custom properties for seamless dark/light switching
3. **Typography** – Inter font from Google Fonts for crisp readability
4. **Micro-interactions** – Hover lifts, staggered fade-ins, smooth chart transitions
5. **Mobile-first responsive** – Sidebar → bottom nav on mobile, grid layouts collapse gracefully

---

## 🔐 Role-Based UI

| Feature | Admin | Viewer |
|---------|-------|--------|
| View Dashboard | ✅ | ✅ |
| View Transactions | ✅ | ✅ |
| Add Transaction | ✅ | ❌ |
| Edit Transaction | ✅ | ❌ |
| Delete Transaction | ✅ | ❌ |
| Toggle Role/Theme | ✅ | ✅ |

Switch roles using the **Admin/Viewer** toggle in the sidebar footer.

---

## 📊 Mock Data

The app ships with **57 transactions** spanning November 2025 – March 2026 across 12 categories (Salary, Freelance, Food, Shopping, Rent, etc.), providing realistic data for all visualizations and insights.

---

## 🧩 State Management

All application state is managed through a single `AppContext` using `useReducer`:

- **Transactions** – Full CRUD (add, update, delete)
- **Filters** – Search, category, type, date range
- **Sorting** – Column-based with ascending/descending toggle
- **Role** – "admin" or "viewer" (persisted)
- **Theme** – "dark" or "light" (persisted)

Changes to transactions, theme, and role are automatically saved to `localStorage` and restored on page reload.

---

## 📝 License

MIT
