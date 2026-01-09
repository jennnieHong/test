import React from 'react';
import './CommonComponents.css';

/**
 * DatePicker Component
 * @param {string} label - Prefix label text
 * @param {string} type - 'date', 'range', 'month'
 * @param {any} value - Current value (single string or {from, to})
 * @param {function} onChange - Change handler
 */
export default function DatePicker({
  label = '',
  type = 'date',
  value = null,
  onChange = () => {},
  size = 'md'
}) {
  return (
    <div className={`common-form-group ${size}`}>
      {label && <span className="common-label">{label}</span>}
      
      {type === 'range' ? (
        <div className="common-date-range">
          <input
            type="date"
            className="common-input"
            value={value?.from || ''}
            onChange={(e) => {
              const newFrom = e.target.value;
              let newTo = value?.to || '';
              if (newTo && newFrom > newTo) newTo = newFrom;
              onChange({ from: newFrom, to: newTo });
            }}
          />
          <span className="separator">~</span>
          <input
            type="date"
            className="common-input"
            value={value?.to || ''}
            onChange={(e) => {
              const newTo = e.target.value;
              let newFrom = value?.from || '';
              if (newFrom && newTo < newFrom) newFrom = newTo;
              onChange({ from: newFrom, to: newTo });
            }}
          />
        </div>
      ) : (
        <input
          type={type === 'month' ? 'month' : 'date'}
          className="common-input"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
