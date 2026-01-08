import React, {useState} from 'react'

function TreeNode({node, onOpen, activeId, depth = 0}){
  const [expanded, setExpanded] = useState(true)
  const hasChildren = node.children && node.children.length > 0
  const isActive = activeId === node.id

  return (
    <div className="menu-node">
      <div 
        className={`menu-item ${isActive ? 'active' : ''}`} 
        onClick={() => {
          if(hasChildren) setExpanded(!expanded)
          onOpen(node)
        }}
        style={{ paddingLeft: 12 + (depth * 16) }}
      >
        {hasChildren && (
          <span className={`toggle-icon ${expanded ? 'open' : ''}`}>
            {expanded ? '▾' : '▸'}
          </span>
        )}
        {!hasChildren && <span className="leaf-dot">•</span>}
        <span className="menu-text">{node.name}</span>
      </div>
      {hasChildren && expanded && (
        <div className="menu-children">
          {node.children.map(child => (
            <TreeNode key={child.id} node={child} onOpen={onOpen} activeId={activeId} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function LeftMenu({menus,onOpen,show,activeId}){
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`leftmenu ${collapsed ? 'collapsed' : ''} ${show ? 'show' : ''}`}>
      <div className="leftmenu-header">
        <h4>시스템 메뉴</h4>
        <button className="collapse-btn" onClick={()=>setCollapsed(c=>!c)}>{collapsed? '›' : '‹'}</button>
      </div>
      <div className="leftmenu-body">
        {menus && menus.map(node => (
          <TreeNode key={node.id} node={node} onOpen={onOpen} activeId={activeId} />
        ))}
      </div>
    </aside>
  )
}
