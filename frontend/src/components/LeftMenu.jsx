import React, {useState} from 'react'

function Tree({nodes, onOpen, activeId}){
  if(!nodes) return null
  return (
    <ul className="menu-tree">
      {nodes.map(n=> (
        <li key={n.id}>
          <div 
            className={`menu-item ${activeId===n.id ? 'active' : ''}`} 
            onClick={()=>onOpen(n)}
          >
            {n.name}
          </div>
          <Tree nodes={n.children} onOpen={onOpen} activeId={activeId} />
        </li>
      ))}
    </ul>
  )
}

export default function LeftMenu({menus,onOpen,show,activeId}){
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`leftmenu ${collapsed ? 'collapsed' : ''} ${show ? 'show' : ''}`}>
      <div className="leftmenu-header">
        <h4>메뉴</h4>
        <button className="collapse-btn" onClick={()=>setCollapsed(c=>!c)}>{collapsed? '›' : '‹'}</button>
      </div>
      <div className="leftmenu-body">
        <Tree nodes={menus} onOpen={onOpen} activeId={activeId} />
      </div>
    </aside>
  )
}
