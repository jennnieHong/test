import React from 'react';
import './CommonComponents.css';

/**
 * Common Button Component
 * @param {string} variant - primary, secondary, outline, danger, search, reset
 * @param {string} size - sm, md (default), lg
 * @param {boolean} disabled - Disabled state
 * @param {boolean} loading - Loading state (shows spinner or text)
 * @param {ReactNode} children - Button text or elements
 * @param {function} onClick - Click handler
 * @param {string} type - button, submit, reset
 * @param {object} style - Custom inline styles
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children,
  onClick,
  type = 'button',
  style = {},
  className = ''
}) {
  const getVariantClass = () => {
    switch (variant) {
      case 'primary': return 'btn-primary';
      case 'secondary': return 'btn-secondary';
      case 'outline': return 'btn-outline';
      case 'danger': return 'btn-danger';
      case 'search': return 'search-submit-btn';
      case 'reset': return 'reset-btn';
      default: return 'btn-primary';
    }
  };

  return (
    <button
      type={type}
      className={`common-btn ${getVariantClass()} ${size} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
    >
      {loading ? <span className="btn-spinner"></span> : children}
    </button>
  );
}
