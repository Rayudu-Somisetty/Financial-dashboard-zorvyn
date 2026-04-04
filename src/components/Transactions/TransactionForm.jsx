import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import { X, Save } from 'lucide-react';
import './TransactionForm.css';

const defaultForm = {
  date: new Date().toISOString().split('T')[0],
  description: '',
  amount: '',
  category: 'Food',
  type: 'expense',
};

export default function TransactionForm({ transaction, onClose }) {
  const { addTransaction, updateTransaction } = useApp();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const isEdit = !!transaction;

  useEffect(() => {
    if (transaction) {
      setForm({
        date: transaction.date,
        description: transaction.description,
        amount: String(transaction.amount),
        category: transaction.category,
        type: transaction.type,
      });
    }
  }, [transaction]);

  function validate() {
    const errs = {};
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) errs.amount = 'Enter a valid amount';
    if (!form.date) errs.date = 'Date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      ...form,
      amount: parseFloat(Number(form.amount).toFixed(2)),
    };

    if (isEdit) {
      updateTransaction({ ...data, id: transaction.id });
    } else {
      addTransaction(data);
    }
    onClose();
  }

  const categories = Object.keys(CATEGORIES);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{isEdit ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button className="btn btn-ghost" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="tx-form">
          <div className="tx-form__group">
            <label className="tx-form__label">Description</label>
            <input
              className={`input ${errors.description ? 'input--error' : ''}`}
              type="text"
              placeholder="e.g. Grocery Shopping"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
            {errors.description && <span className="tx-form__error">{errors.description}</span>}
          </div>

          <div className="tx-form__row">
            <div className="tx-form__group">
              <label className="tx-form__label">Amount ($)</label>
              <input
                className={`input ${errors.amount ? 'input--error' : ''}`}
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
              />
              {errors.amount && <span className="tx-form__error">{errors.amount}</span>}
            </div>
            <div className="tx-form__group">
              <label className="tx-form__label">Date</label>
              <input
                className={`input ${errors.date ? 'input--error' : ''}`}
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
              />
              {errors.date && <span className="tx-form__error">{errors.date}</span>}
            </div>
          </div>

          <div className="tx-form__row">
            <div className="tx-form__group">
              <label className="tx-form__label">Category</label>
              <select
                className="select"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{CATEGORIES[c].icon} {c}</option>
                ))}
              </select>
            </div>
            <div className="tx-form__group">
              <label className="tx-form__label">Type</label>
              <div className="tx-form__type-toggle">
                <button
                  type="button"
                  className={`tx-form__type-btn ${form.type === 'expense' ? 'tx-form__type-btn--expense-active' : ''}`}
                  onClick={() => setForm({ ...form, type: 'expense' })}
                >
                  Expense
                </button>
                <button
                  type="button"
                  className={`tx-form__type-btn ${form.type === 'income' ? 'tx-form__type-btn--income-active' : ''}`}
                  onClick={() => setForm({ ...form, type: 'income' })}
                >
                  Income
                </button>
              </div>
            </div>
          </div>

          <div className="tx-form__actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} />
              {isEdit ? 'Update' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
