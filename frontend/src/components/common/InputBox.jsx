import React from 'react';
import './CommonComponents.css';
import Button from './Button';

/**
 * InputBox Component
 * @param {string} label - Prefix label text (optional)
 * @param {string} value - Current value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {string} type - Input type (text, number, etc.)
 * @param {string} size - sm, md (default), lg
 * @param {boolean} hasButton - Whether to show a button on the right
 * @param {string} buttonText - Text for the right button
 * @param {function} onButtonClick - Click handler for the right button
 */
export default function InputBox({
  label = '',
  value = '',
  onChange = () => {},
  placeholder = '',
  type = 'text',
  size = 'md',
  hasButton = false,
  buttonText = '확인',
  onButtonClick = () => {}
}) {
  return (
    <div className={`common-form-group ${size}`}>
      {label && <span className="common-label">{label}</span>}
      <input
        type={type}
        className="common-input"
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {hasButton && (
        <Button onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
