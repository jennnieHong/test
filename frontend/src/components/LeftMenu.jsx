import React, {useState} from 'react'

function Tree({nodes, onOpen}){
  if(!nodes) return null
  return (
    <ul className="menu-tree">
      {nodes.map(n=> (
        <li key={n.id}>
          <div className="menu-item" onClick={()=>onOpen(n)}>{n.name}</div>
          <Tree nodes={n.children} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  )
}

export default function LeftMenu({menus,onOpen}){
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`leftmenu ${collapsed ? 'collapsed' : ''}`}>
      <div className="leftmenu-header">
        <h4>메뉴</h4>
        <button className="collapse-btn" onClick={()=>setCollapsed(c=>!c)}>{collapsed? '›' : '‹'}</button>
      </div>
      <div className="leftmenu-body">
        <Tree nodes={menus} onOpen={onOpen} />
      </div>
    </aside>
  )
}
