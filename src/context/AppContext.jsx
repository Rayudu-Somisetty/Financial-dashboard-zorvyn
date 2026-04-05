import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';

const AppContext = createContext();

const STORAGE_KEY = 'zorvyn-finance-dashboard';

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        transactions: parsed.transactions || initialTransactions,
        theme: parsed.theme || 'dark',
        role: parsed.role || 'admin',
      };
    }
  } catch (e) {
    console.warn('Failed to load saved state:', e);
  }
  return null;
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      transactions: state.transactions,
      theme: state.theme,
      role: state.role,
    }));
  } catch (e) {
    console.warn('Failed to save state:', e);
  }
}

const savedState = loadState();

const initialState = {
  transactions: savedState?.transactions || initialTransactions,
  theme: savedState?.theme || 'dark',
  role: savedState?.role || 'admin',
  filters: {
    search: '',
    category: [],
    type: 'all',
    dateFrom: '',
    dateTo: '',
  },
  sortConfig: {
    key: 'date',
    direction: 'desc',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, [action.payload.key]: action.payload.value } };
    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters };
    case 'SET_SORT':
      return { ...state, sortConfig: action.payload };
    case 'ADD_TRANSACTION': {
      const newTx = {
        ...action.payload,
        id: Math.max(0, ...state.transactions.map(t => t.id)) + 1,
      };
      return { ...state, transactions: [newTx, ...state.transactions] };
    }
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  // Save to localStorage on relevant state changes
  useEffect(() => {
    saveState(state);
  }, [state.transactions, state.theme, state.role]);

  // Derived: filtered + sorted transactions
  const filteredTransactions = getFilteredTransactions(state);

  const value = {
    ...state,
    filteredTransactions,
    dispatch,
    toggleTheme: () => dispatch({ type: 'SET_THEME', payload: state.theme === 'dark' ? 'light' : 'dark' }),
    setRole: (role) => dispatch({ type: 'SET_ROLE', payload: role }),
    setFilter: (key, value) => dispatch({ type: 'SET_FILTER', payload: { key, value } }),
    resetFilters: () => dispatch({ type: 'RESET_FILTERS' }),
    setSort: (key) => {
      const direction = state.sortConfig.key === key && state.sortConfig.direction === 'asc' ? 'desc' : 'asc';
      dispatch({ type: 'SET_SORT', payload: { key, direction } });
    },
    addTransaction: (tx) => dispatch({ type: 'ADD_TRANSACTION', payload: tx }),
    updateTransaction: (tx) => dispatch({ type: 'UPDATE_TRANSACTION', payload: tx }),
    deleteTransaction: (id) => dispatch({ type: 'DELETE_TRANSACTION', payload: id }),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

function getFilteredTransactions(state) {
  let result = [...state.transactions];
  const { search, category, type, dateFrom, dateTo } = state.filters;

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(t =>
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  }
  if (Array.isArray(category) && category.length > 0) {
    result = result.filter(t => category.includes(t.category));
  } else if (typeof category === 'string' && category !== 'all') {
    result = result.filter(t => t.category === category);
  }
  if (type !== 'all') {
    result = result.filter(t => t.type === type);
  }
  if (dateFrom) {
    result = result.filter(t => t.date >= dateFrom);
  }
  if (dateTo) {
    result = result.filter(t => t.date <= dateTo);
  }

  // Sort
  const { key, direction } = state.sortConfig;
  result.sort((a, b) => {
    let aVal = a[key];
    let bVal = b[key];
    if (key === 'amount') {
      aVal = Number(aVal);
      bVal = Number(bVal);
    }
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  return result;
}
