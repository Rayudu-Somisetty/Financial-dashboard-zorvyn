import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import InsightsPage from './pages/InsightsPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="app-layout">
          <Sidebar />
          <div className="main-content-wrapper">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/insights" element={<InsightsPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}
