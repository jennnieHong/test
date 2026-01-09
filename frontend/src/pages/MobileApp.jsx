import React, {useState} from 'react'
import { useTranslation } from '../i18n/LanguageContext'
import { useTheme } from '../theme/ThemeContext'
import ConfirmPopup from '../components/ConfirmPopup'
import DetailPopup from '../components/DetailPopup'
import MultiSelectPopup from '../components/MultiSelectPopup'

function MobileDashboard(){
  return <div className="p-4"><h3>모바일 대시보드</h3><p>주요 지표 요약...</p></div>
}

import MobileStock from './mobile/MobileStock'
import NavTestScreen from './mobile/NavTestScreen'
import MobileProductionSample from './mobile/MobileProductionSample'
import MobileInventorySample from './mobile/MobileInventorySample'
import MobileComponentSample from './mobile/MobileComponentSample'
import MobileApiSample from './mobile/MobileApiSample'
import MobileMultiApiSample from './mobile/MobileMultiApiSample'

// Dummy Detail for Deep Link Test
function StockDetail({params, onBack}){
    return (
        <div className="p-4">
            <button onClick={onBack} style={{marginBottom:15}}>← 목록으로</button>
            <h3>재고 상세: {params.item}</h3>
            <p>상세 정보가 여기에 표시됩니다.</p>
        </div>
    )
}

function MobileSample({onNavigate, onPopup, popupResult}){
    return (
        <div className="p-4">
            <h3>모바일 샘플</h3>
            {popupResult && (
                <div style={{background:'#e8f5e9', padding:10, borderRadius:8, border:'1px solid #c8e6c9', marginBottom:15}}>
                    <strong>선택 결과:</strong> {popupResult}
                </div>
            )}
            <div className="card" style={{padding:15, marginBottom:15}}>
                <h4>팝업 테스트</h4>
                <button 
                 onClick={()=>onPopup({title:'모바일 팝업', options:['Option A','Option B']})}
                 style={{padding:'8px 16px', background:'#4a90e2', color:'white', border:'none', borderRadius:4, width:'100%', marginBottom:10}}
                >
                    옵션 팝업 열기
                </button>
                <button 
                 onClick={()=>onPopup({title:'다중 선택', options:['Apple','Banana','Cherry','Date'], type:'multi'})}
                 style={{padding:'8px 16px', background:'#00897b', color:'white', border:'none', borderRadius:4, width:'100%'}}
                >
                    다중 선택 팝업 열기
                </button>
            </div>
            <div className="card" style={{padding:15}}>
                <h4>화면 전환 테스트</h4>
                <p>실제 '재고 현황' 화면으로 파라미터를 넘기며 이동합니다.</p>
                <button 
                 onClick={()=>onNavigate('stock', { source: 'MobileSample', filter: 'active', timestamp: new Date().toLocaleTimeString() })}
                 style={{padding:'8px 16px', background:'#ff9800', color:'white', border:'none', borderRadius:4, width:'100%'}}
                >
                    재고 현황으로 이동 (With Params)
                </button>
            </div>
        </div>
    )
}

function MobileTreeNode({node, onNavigate, onClose, activeView, depth = 0}){
    const { t } = useTranslation()
    const [expanded, setExpanded] = useState(false) 
    const hasChildren = node.children && node.children.length > 0
    const isActive = activeView === String(node.id)

    // Attempt to translate based on code, fallback to name
    const displayName = node.code ? t(`menu.${node.code.toLowerCase().replace(/-/g, '_')}`) : node.name
    const label = displayName === `menu.${node.code?.toLowerCase().replace(/-/g, '_')}` ? node.name : displayName

    return (
        <div className="mobile-menu-node">
            <div 
                className={`mobile-menu-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                    if(hasChildren) setExpanded(!expanded)
                    else {
                        onNavigate(String(node.id))
                        onClose()
                    }
                }}
                style={{
                    padding: '12px 16px',
                    paddingLeft: 16 + (depth * 16),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: isActive ? 'rgba(21, 101, 192, 0.08)' : 'none',
                    borderRadius: 8,
                    marginBottom: 4,
                    cursor: 'pointer'
                }}
            >
                <div style={{display:'flex', alignItems:'center', gap: 8}}>
                    {!hasChildren && <span style={{fontSize: 14, opacity: 0.5}}>•</span>}
                    <span style={{
                        fontSize: 15,
                        color: isActive ? 'var(--primary)' : 'var(--text)',
                        fontWeight: isActive ? '600' : '500'
                    }}>
                        {label}
                    </span>
                </div>
                {hasChildren && (
                    <span style={{ fontSize: 12, color: '#94a3b8', transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                        ▶
                    </span>
                )}
            </div>
            {hasChildren && expanded && (
                <div className="mobile-menu-children" style={{ borderLeft: '1px solid #f1f5f9', marginLeft: 22 }}>
                    {node.children.map(child => (
                        <MobileTreeNode 
                            key={child.id} 
                            node={child} 
                            onNavigate={onNavigate} 
                            onClose={onClose} 
                            activeView={activeView} 
                            depth={depth + 1} 
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

function MobileMenu({show, menus, onNavigate, onClose, activeView, nickname, userInfo}){
    const { t, lang, setLang } = useTranslation()
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="mobile-menu-overlay" onClick={onClose} style={{
            position:'fixed', top:0, left:0, width:'100%', height:'100dvh', 
            background:'rgba(0,0,0,0.5)', zIndex:1000,
            backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
            visibility: show ? 'visible' : 'hidden',
            opacity: show ? 1 : 0,
            transition: 'opacity 0.2s, visibility 0.2s'
        }}>
            <div className="mobile-menu-sidebar" onClick={e=>e.stopPropagation()} style={{
                width:'80%', height:'100%', background:'var(--nav)', padding:'20px', 
                paddingBottom: 'calc(20px + env(safe-area-inset-bottom))',
                display:'flex', flexDirection:'column', boxSizing: 'border-box',
                boxShadow:'2px 0 12px rgba(0,0,0,0.15)',
                transform: show ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.3s ease-out'
            }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20, paddingBottom:15, borderBottom:'1px solid var(--border)'}}>
                    <div>
                        <div style={{fontSize:18, fontWeight:'bold', color:'var(--primary)'}}>{nickname || '관리자'}</div>
                        <div style={{fontSize:12, color:'var(--muted)'}}>{userInfo?.department || t('common.department')} ({userInfo?.roles || 'USER'})</div>
                    </div>
                    <button onClick={onClose} style={{background:'none', border:'none', fontSize:24, color:'var(--text)', padding:0, lineHeight:1}}>✕</button>
                </div>

                <h4 style={{marginBottom:15, color:'var(--muted)', fontSize:12, textTransform:'uppercase', letterSpacing:'1px'}}>{t('menu.system_menu')}</h4>
                
                <div style={{flex:1, overflowY:'auto', marginBottom:20}}>
                    {menus && menus.map(node => (
                        <MobileTreeNode 
                            key={node.id} 
                            node={node} 
                            onNavigate={onNavigate} 
                            onClose={onClose} 
                            activeView={activeView} 
                        />
                    ))}
                </div>

                {/* Mobile Bottom Controls */}
                <div style={{borderTop:'1px solid var(--border)', paddingTop:20, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div style={{display:'flex', gap:10}}>
                        <button 
                            onClick={()=>setLang('ko')} 
                            style={{
                                padding:'6px 12px', borderRadius:6, border:'1px solid '+ (lang==='ko' ? 'var(--primary)' : 'var(--border)'),
                                background: lang==='ko' ? 'var(--primary)' : 'none',
                                color: lang==='ko' ? 'white' : 'var(--text)',
                                fontSize:13, fontWeight:600
                            }}
                        >KO</button>
                        <button 
                            onClick={()=>setLang('en')} 
                            style={{
                                padding:'6px 12px', borderRadius:6, border:'1px solid '+ (lang==='en' ? 'var(--primary)' : 'var(--border)'),
                                background: lang==='en' ? 'var(--primary)' : 'none',
                                color: lang==='en' ? 'white' : 'var(--text)',
                                fontSize:13, fontWeight:600
                            }}
                        >EN</button>
                    </div>
                    <button 
                        onClick={toggleTheme}
                        style={{
                            width:40, height:40, borderRadius:'50%', border:'1px solid var(--border)',
                            background:'none', color:'var(--text)', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center'
                        }}
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function MobileApp({nickname, userInfo, menus, onLogout}){
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  
  // History State: Array of { id: string, params: object }
  const [history, setHistory] = useState([{id:'dashboard', params:null}])
  const [currentIndex, setCurrentIndex] = useState(0)

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  
  // Popup state
  const [detailData, setDetailData] = useState(null)
  const [multiData, setMultiData] = useState(null)
  const [popupResult, setPopupResult] = useState(null)

  // Wrapper for popup trigger to handle different types
  const handlePopup = (data) => {
      setPopupResult(null) // clear previous result
      if(data.type === 'multi') setMultiData(data)
      else setDetailData(data)
  }

  function performLogout(){
      if(onLogout) onLogout();
      setShowLogoutConfirm(false)
  }

  // Navigation Logic
  function handleNavigate(viewId, params=null){
      // Slice history if we are back in time
      const newHistory = history.slice(0, currentIndex + 1)
      newHistory.push({id: viewId, params: params})
      
      setHistory(newHistory)
      setCurrentIndex(newHistory.length - 1)
  }

  function goBack(){
      if(currentIndex > 0){
          setCurrentIndex(currentIndex - 1)
      }
  }

  function goForward(){
      if(currentIndex < history.length - 1){
          setCurrentIndex(currentIndex + 1)
      }
  }

  // Current View
  const currentViewObj = history[currentIndex] || {id:'dashboard'}
  const currentViewId = currentViewObj.id
  const currentParams = currentViewObj.params

  // Simple Screen mapping
  const screens = {
      'dashboard': <MobileDashboard />,
      'stock': <MobileStock params={currentParams} onNavigate={handleNavigate} />,
      'stock_detail': <StockDetail params={currentParams} onBack={goBack} />,
      
      // Nav Sequence Test
      'nav_a': <NavTestScreen level="A" nextLevel="nav_b" onNavigate={handleNavigate} color="#7e57c2" />,
      'nav_b': <NavTestScreen level="B" nextLevel="nav_c" onNavigate={handleNavigate} color="#ef5350" />,
      'nav_c': <NavTestScreen level="C" nextLevel={null} onNavigate={handleNavigate} color="#42a5f5" />,

      'production': <div className="p-4"><h3>생산 관리</h3><p>목록...</p></div>,
      'orders': <div className="p-4"><h3>주문 목록</h3><p>목록...</p></div>,
      'sample': <MobileSample onNavigate={handleNavigate} onPopup={handlePopup} popupResult={popupResult} />,

      // Menu ID Mappings (from data.sql)
      '101': <MobileStock params={currentParams} onNavigate={handleNavigate} />,
      '211': <MobileProductionSample />,
      '311': <MobileInventorySample />,
      '401': <MobileComponentSample />,
      '406': <MobileComponentSample />,
      '407': <MobileApiSample />,
      '408': <MobileMultiApiSample />,
      'G007': <MobileApiSample />,
      'G008': <MobileMultiApiSample />,
  }

  return (
      <div className="mobile-app" style={{height:'100dvh', display:'flex', flexDirection:'column', overflow:'hidden'}}>
        <header className="mobile-header" style={{
            height:50, minHeight:50, background:'var(--header-bg)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 15px', color:'white'
        }}>
            <div style={{display:'flex', alignItems:'center'}}>
                <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:'none', border:'none', color:'white', fontSize:20, marginRight:10}}>
                    {menuOpen ? '✕' : '☰'}
                </button>
                <span style={{fontWeight:'bold', fontSize:16, marginRight:10}}>{t('login.title')}</span>
                
                {/* Navigation Controls */}
                <div style={{display:'flex', gap:5}}>
                    <button onClick={goBack} disabled={currentIndex===0} style={{
                        background:'none', border:'1px solid rgba(255,255,255,0.3)', color:'white', borderRadius:4, padding:'2px 8px',
                        opacity: currentIndex===0 ? 0.3 : 1
                    }}>←</button>
                    <button onClick={goForward} disabled={currentIndex===history.length-1} style={{
                         background:'none', border:'1px solid rgba(255,255,255,0.3)', color:'white', borderRadius:4, padding:'2px 8px',
                         opacity: currentIndex===history.length-1 ? 0.3 : 1
                    }}>→</button>
                </div>
            </div>
            
            <button onClick={()=>setShowLogoutConfirm(true)} style={{background:'#ff6b6b', border:'none', color:'white', borderRadius:4, padding:'4px 8px', fontSize:12}}>
                {t('common.logout')}
            </button>
        </header>

        <MobileMenu show={menuOpen} menus={menus} onNavigate={(id)=>handleNavigate(id)} onClose={()=>setMenuOpen(false)} activeView={currentViewId} nickname={nickname} userInfo={userInfo} />

        <div className="mobile-content" style={{flex:1, overflow:'auto'}}>
            {screens[currentViewId]}
        </div>

        {showLogoutConfirm && (
            <ConfirmPopup 
                message={t('common.confirm_logout') || "로그아웃 하시겠습니까?"} 
                onConfirm={performLogout} 
                onCancel={()=>setShowLogoutConfirm(false)} 
            />
        )}
        
        {detailData && (
            <DetailPopup 
                data={detailData} 
                onClose={()=>setDetailData(null)}
                onSelect={(val)=> setPopupResult('단일 선택: '+val)} 
            />
        )}

        {multiData && (
            <MultiSelectPopup 
                data={multiData} 
                onClose={()=>setMultiData(null)}
                onSelect={(vals)=> setPopupResult('다중 선택: [' + vals.join(', ') + ']')} 
            />
        )}
      </div>
  )
}
