import React from 'react';
import './CommonComponents.css';

/**
 * LoadingOverlay Component
 * A full-page overlay with a spinner to block interaction during heavy API calls.
 * @param {boolean} show - Whether to show the overlay
 * @param {string} message - Optional message to display below the spinner
 */
export default function LoadingOverlay({ show, message = '데이터를 불러오는 중입니다...' }) {
  if (!show) return null;

  return (
    <div className="common-loading-overlay">
      <div className="loading-content">
        <div className="large-spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
}
