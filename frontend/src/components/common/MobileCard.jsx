import React from 'react';
import './CommonComponents.css';

/**
 * MobileCard Component
 * A stylized container for mobile screens.
 */
export default function MobileCard({ title, children, style = {}, headerAction }) {
  return (
    <div className="mobile-card" style={style}>
      {(title || headerAction) && (
        <div className="mobile-card-header">
          <span className="mobile-card-title">{title}</span>
          {headerAction && <div className="header-action">{headerAction}</div>}
        </div>
      )}
      <div className="mobile-card-body">
        {children}
      </div>
    </div>
  );
}
