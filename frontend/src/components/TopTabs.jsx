import React from 'react'

export default function TopTabs({tabs, onClose, onSelect, activeId, onCloseAll}){
  return (
    <div className="top-tabs">
      <div className="tabs-list">
        {tabs.map(t=> (
          <div className={`tab ${activeId===t.id? 'active': ''}`} key={t.id}>
            <button className="tab-link" onClick={()=>onSelect && onSelect(t.id)} style={{background:'none',border:'none',cursor:'pointer'}}>{t.name}</button>
            <button className="tab-close" onClick={()=>onClose(t.id)}>x</button>
          </div>
        ))}
      </div>
      <div className="tabs-actions">
        <button className="tab-close-all" onClick={()=>onCloseAll && onCloseAll()}>모두 닫기</button>
      </div>
    </div>
  )
}
