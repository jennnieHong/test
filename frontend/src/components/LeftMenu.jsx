import React, {useState} from 'react'
import { useTranslation } from '../i18n/LanguageContext'

function TreeNode({node, onOpen, activeId, depth = 0}){
  const [expanded, setExpanded] = useState(true)
  const { t } = useTranslation()
  const hasChildren = node.children && node.children.length > 0
  const isActive = activeId === node.id

  // Attempt to translate based on code, fallback to name
  const displayName = node.code ? t(`menu.${node.code.toLowerCase().replace(/-/g, '_')}`) : node.name
  const label = displayName === `menu.${node.code?.toLowerCase().replace(/-/g, '_')}` ? node.name : displayName

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
        <span className="menu-text">{label}</span>
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
  const { t } = useTranslation()

  return (
    <aside className={`leftmenu ${collapsed ? 'collapsed' : ''} ${show ? 'show' : ''}`}>
      <div className="leftmenu-header">
        <h4>{t('menu.system_menu')}</h4>
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
