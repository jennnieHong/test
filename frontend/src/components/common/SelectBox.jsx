import React, { useState, useRef, useEffect } from 'react';
import './CommonComponents.css';
import Button from './Button';

/**
 * SelectBox Component
 * @param {string} label - Prefix label text (optional)
 * @param {Array} options - [{value, label}, ...]
 * @param {any} value - Current selected value
 * @param {function} onChange - Change handler
 * @param {string} size - sm, md (default), lg
 * @param {boolean} hasButton - Whether to show a button on the right
 * @param {string} buttonText - Text for the right button
 * @param {function} onButtonClick - Click handler for the right button
 */
export default function SelectBox({ 
  label = '', 
  options = [], 
  value = null, 
  onChange = () => {}, 
  size = 'md',
  hasButton = false,
  buttonText = '선택',
  onButtonClick = () => {}
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`common-form-group ${size}`} ref={containerRef}>
      {label && <span className="common-label">{label}</span>}
      <div className="common-select-wrapper">
        <div 
          className={`common-select-trigger ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedOption?.label || '선택'}</span>
          <span className="arrow">▾</span>
        </div>
        {isOpen && (
          <div className="common-select-options">
            {options.map((opt, idx) => (
              <div 
                key={idx} 
                className={`common-select-option ${value === opt.value ? 'selected' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {hasButton && (
        <Button onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}
