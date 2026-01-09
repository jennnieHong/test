import React from 'react';
import './CommonComponents.css';

/**
 * RadioBox Component
 * @param {string} label - Prefix label text
 * @param {Array} options - [{value, label}, ...]
 * @param {any} value - Current selected value
 * @param {function} onChange - Change handler
 */
export default function RadioBox({
  label = '',
  options = [],
  value = null,
  onChange = () => {},
  size = 'md'
}) {
  return (
    <div className={`common-form-group ${size}`}>
      {label && <span className="common-label">{label}</span>}
      <div className="common-radio-group">
        {options.map((opt, idx) => (
          <label key={idx} className="common-radio-item">
            <input
              type="radio"
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            <span className="radio-text">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
