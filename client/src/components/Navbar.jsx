import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import '../styles/navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    setOpen(false);
    navigate('/');
  };

  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={close}>
          <span className="navbar-logo">🇮🇳</span>
          <span className="navbar-title">India Student Guide</span>
        </Link>

        <button
          className="navbar-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          ☰
        </button>

        <nav className={`navbar-links ${open ? 'open' : ''}`}>
          <NavLink to="/" onClick={close} end>
            Home
          </NavLink>
          <NavLink to="/guides" onClick={close}>
            Arrival Guide
          </NavLink>
          <NavLink to="/services" onClick={close}>
            Services
          </NavLink>
          <NavLink to="/faqs" onClick={close}>
            FAQs
          </NavLink>

          {user && (
            <>
              <NavLink to="/dashboard" onClick={close}>
                Dashboard
              </NavLink>
              <NavLink to="/saved" onClick={close}>
                Saved
              </NavLink>
            </>
          )}

          {user && user.role === 'admin' && (
            <NavLink to="/admin" onClick={close}>
              Admin
            </NavLink>
          )}

          {!user && (
            <>
              <NavLink to="/login" onClick={close}>
                Login
              </NavLink>
              <Link
                to="/register"
                className="btn btn-primary btn-sm"
                onClick={close}
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="navbar-user">
              <span className="navbar-user-name">Hi, {user.name.split(' ')[0]}</span>
              <button
                className="btn btn-ghost btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}