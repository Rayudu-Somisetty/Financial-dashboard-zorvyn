import { X, Mail, Cake, Briefcase, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import './ProfileModal.css';

export default function ProfileModal({ isOpen, onClose, user, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    role: '',
    initials: '',
  });

  useEffect(() => {
    if (!user) return;
    setFormData({
      name: user.name || '',
      email: user.email || '',
      age: user.age || '',
      role: user.role || '',
      initials: user.initials || '',
    });
  }, [user]);

  if (!isOpen) return null;

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleEditProfile() {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    const name = formData.name.trim();
    const role = formData.role.trim();
    const email = formData.email.trim();
    const age = Number(formData.age);
    const initials =
      formData.initials.trim().toUpperCase() ||
      name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(part => part[0])
        .join('')
        .toUpperCase();

    if (!name || !email || !role || Number.isNaN(age) || age <= 0) {
      return;
    }

    onSave?.({
      name,
      email,
      age,
      role,
      initials,
    });
    setIsEditing(false);
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      age: user?.age || '',
      role: user?.role || '',
      initials: user?.initials || '',
    });
  }

  return (
    <>
      {/* Backdrop */}
      <div className="profile-modal__backdrop" onClick={onClose} />
      
      {/* Modal */}
      <div className="profile-modal">
        <button
          className="profile-modal__close"
          onClick={onClose}
          aria-label="Close profile"
        >
          <X size={20} />
        </button>

        <div className="profile-modal__header">
          <div className="profile-modal__avatar">
            {user?.initials || 'U'}
          </div>
        </div>

        <div className="profile-modal__content">
          <h2 className="profile-modal__name">{user?.name || 'User'}</h2>
          <p className="profile-modal__role">{user?.role || 'Team Member'}</p>

          <div className="profile-modal__line" />

          {isEditing ? (
            <div className="profile-modal__form">
              <label className="profile-modal__field">
                <span>Full Name</span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                />
              </label>
              <label className="profile-modal__field">
                <span>Email Address</span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                />
              </label>
              <label className="profile-modal__field">
                <span>Age</span>
                <input
                  name="age"
                  type="number"
                  min="1"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter age"
                />
              </label>
              <label className="profile-modal__field">
                <span>Position</span>
                <input
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Enter position"
                />
              </label>
              <label className="profile-modal__field">
                <span>Initials</span>
                <input
                  name="initials"
                  value={formData.initials}
                  onChange={handleInputChange}
                  placeholder="RS"
                  maxLength={2}
                />
              </label>
            </div>
          ) : (
            <div className="profile-modal__info-group">
              <div className="profile-modal__info-item">
                <User size={16} />
                <div className="profile-modal__info-text">
                  <span className="profile-modal__info-label">Full Name</span>
                  <p className="profile-modal__info-value">{user?.name || 'N/A'}</p>
                </div>
              </div>

              <div className="profile-modal__info-item">
                <Mail size={16} />
                <div className="profile-modal__info-text">
                  <span className="profile-modal__info-label">Email Address</span>
                  <p className="profile-modal__info-value">{user?.email || 'user@example.com'}</p>
                </div>
              </div>

              <div className="profile-modal__info-item">
                <Cake size={16} />
                <div className="profile-modal__info-text">
                  <span className="profile-modal__info-label">Age</span>
                  <p className="profile-modal__info-value">{user?.age || '28'} years</p>
                </div>
              </div>

              <div className="profile-modal__info-item">
                <Briefcase size={16} />
                <div className="profile-modal__info-text">
                  <span className="profile-modal__info-label">Position</span>
                  <p className="profile-modal__info-value">{user?.role || 'Product Analyst'}</p>
                </div>
              </div>
            </div>
          )}

          <div className="profile-modal__line" />

          <div className="profile-modal__footer">
            <button
              className="profile-modal__btn profile-modal__btn--primary"
              onClick={handleEditProfile}
            >
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </button>
            <button
              className="profile-modal__btn profile-modal__btn--secondary"
              onClick={isEditing ? handleCancelEdit : onClose}
            >
              {isEditing ? 'Cancel' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
