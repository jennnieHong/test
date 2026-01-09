import React from 'react';
import './CommonComponents.css';

/**
 * CodeInput Component
 * @param {string} label - Prefix label text
 * @param {string} code - Current code value
 * @param {string} name - Current name value (read-only span)
 * @param {function} onCodeChange - Handler for code input
 * @param {function} onSearchClick - Handler for search button/icon
 * @param {boolean} showName - Whether to show the name span on the right
 */
export default function CodeInput({
  label = '',
  code = '',
  name = '',
  onCodeChange = () => {},
  onSearchClick = () => {},
  showName = true,
  size = 'md'
}) {
  return (
    <div className={`common-form-group ${size}`}>
      {label && <span className="common-label">{label}</span>}
      <div className="common-code-wrapper">
        <input
          type="text"
          className="common-input code-input"
          value={code || ''}
          onChange={(e) => onCodeChange(e.target.value)}
        />
        <button className="common-search-btn" onClick={onSearchClick}>
          🔍
        </button>
      </div>
      {showName && (
        <span className="common-code-name">{name || '---'}</span>
      )}
    </div>
  );
}
