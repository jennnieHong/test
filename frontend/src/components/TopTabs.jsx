import React from 'react'

export default function TopTabs({tabs, onClose, onSelect}){
  return (
    <div className="top-tabs">
      {tabs.map(t=> (
        <div className="tab" key={t.id}>
          <button className="tab-link" onClick={()=>onSelect && onSelect(t.id)} style={{background:'none',border:'none',cursor:'pointer'}}>{t.name}</button>
          <button onClick={()=>onClose(t.id)}>x</button>
        </div>
      ))}
    </div>
  )
}
