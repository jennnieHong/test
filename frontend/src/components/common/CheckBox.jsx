import React from 'react';
import './CommonComponents.css';

/**
 * CheckBox Component
 * @param {string} label - Prefix label text (optional)
 * @param {string} text - Suffix label text (optional)
 * @param {boolean} checked - Current checked state
 * @param {function} onChange - Change handler
 */
export default function CheckBox({
  label = '',
  text = '',
  checked = false,
  onChange = () => {},
  size = 'md'
}) {
  return (
    <div className={`common-form-group ${size}`}>
      {label && <span className="common-label">{label}</span>}
      <label className="common-checkbox-item">
        <input
          type="checkbox"
          checked={!!checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        {text && <span className="checkbox-text">{text}</span>}
      </label>
    </div>
  );
}
