import React from 'react';
import './CommonComponents.css';
import Button from './Button';

/**
 * SearchPanel Component
 * Wraps search filters in a styled container with optional Search/Reset buttons.
 * @param {ReactNode} children - The filter components (SelectBox, InputBox, etc.)
 * @param {function} onSearch - Search button click handler
 * @param {function} onReset - Reset button click handler
 * @param {boolean} showButtons - Whether to show the Search/Reset button area
 * @param {string} layout - 'grid' (default) or 'flex'
 * @param {boolean} searchDisabled - Disable search button
 * @param {boolean} resetDisabled - Disable reset button
 */
export default function SearchPanel({
  children,
  onSearch,
  onReset,
  showButtons = true,
  layout = 'grid',
  searchDisabled = false,
  resetDisabled = false
}) {
  return (
    <div className="common-search-panel">
      <div className={`common-search-content ${layout}`}>
        {children}
      </div>
      
      {showButtons && (
        <div className="common-search-buttons">
          {onReset && (
            <Button variant="reset" onClick={onReset} disabled={resetDisabled}>
              초기화
            </Button>
          )}
          {onSearch && (
            <Button variant="search" onClick={onSearch} disabled={searchDisabled}>
              조회
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
