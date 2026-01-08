import React, {useState} from 'react'
import Login from './Login'
import ConfirmPopup from '../components/ConfirmPopup'
import DetailPopup from '../components/DetailPopup'
import MultiSelectPopup from '../components/MultiSelectPopup'

function MobileDashboard(){
  return <div className="p-4"><h3>모바일 대시보드</h3><p>주요 지표 요약...</p></div>
}

import MobileStock from './mobile/MobileStock'
import NavTestScreen from './mobile/NavTestScreen'

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
    const [expanded, setExpanded] = useState(false)
    const hasChildren = node.children && node.children.length > 0
    const isActive = activeView === String(node.id)

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
                    background: isActive ? '#f1f5f9' : 'none',
                    borderRadius: 8,
                    marginBottom: 4,
                    cursor: 'pointer'
                }}
            >
                <div style={{display:'flex', alignItems:'center', gap: 8}}>
                    {!hasChildren && <span style={{fontSize: 10, opacity: 0.5}}>•</span>}
                    <span style={{
                        fontSize: 15,
                        color: isActive ? '#1565c0' : '#334155',
                        fontWeight: isActive ? '600' : '500'
                    }}>
                        {node.name}
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

function MobileMenu({menus, onNavigate, onClose, activeView, nickname, userInfo}){
    return (
        <div className="mobile-menu-overlay" onClick={onClose} style={{
            position:'fixed', top:0, left:0, width:'100%', height:'100dvh', 
            background:'rgba(0,0,0,0.4)', zIndex:1000,
            backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)'
        }}>
            <div className="mobile-menu-sidebar" onClick={e=>e.stopPropagation()} style={{
                width:'80%', height:'100%', background:'white', padding:'20px', display:'flex', flexDirection:'column',
                boxShadow:'2px 0 12px rgba(0,0,0,0.15)', animation: 'slideIn 0.3s ease-out'
            }}>
                <style>{`
                    @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
                `}</style>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20, paddingBottom:15, borderBottom:'1px solid #eee'}}>
                    <div>
                        <div style={{fontSize:18, fontWeight:'bold', color:'#1565c0'}}>{nickname || '관리자'}</div>
                        <div style={{fontSize:12, color:'#666'}}>{userInfo?.department || '소속없음'} ({userInfo?.roles || 'USER'})</div>
                    </div>
                    <button onClick={onClose} style={{background:'none', border:'none', fontSize:24, color:'#334155', padding:0, lineHeight:1}}>✕</button>
                </div>
                <h4 style={{marginBottom:15, color:'#1e293b', fontSize:14, textTransform:'uppercase', letterSpacing:'0.5px'}}>시스템 메뉴</h4>
                <div style={{flex:1, overflowY:'auto'}}>
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
            </div>
        </div>
    )
}

export default function MobileApp({nickname, userInfo: parentUserInfo, menus}){
  const [logged, setLogged] = useState(!!(localStorage.getItem('token')))
  const [userInfo, setUserInfo] = useState(parentUserInfo || JSON.parse(localStorage.getItem('userInfo') || 'null'))
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

  if(!logged) return <Login onLogin={()=>setLogged(true)} />

  function performLogout(){
      localStorage.removeItem('nickname')
      setLogged(false)
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
  }

  return (
      <div className="mobile-app" style={{height:'100dvh', display:'flex', flexDirection:'column', overflow:'hidden'}}>
        <header className="mobile-header" style={{
            height:50, minHeight:50, background:'#1565c0', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 15px', color:'white'
        }}>
            <div style={{display:'flex', alignItems:'center'}}>
                <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:'none', border:'none', color:'white', fontSize:20, marginRight:10}}>
                    {menuOpen ? '✕' : '☰'}
                </button>
                <span style={{fontWeight:'bold', fontSize:16, marginRight:10}}>LIVE STOCK</span>
                
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
                로그아웃
            </button>
        </header>

        {menuOpen && <MobileMenu menus={menus} onNavigate={(id)=>handleNavigate(id)} onClose={()=>setMenuOpen(false)} activeView={currentViewId} nickname={nickname} userInfo={userInfo} />}

        <div className="mobile-content" style={{flex:1, overflow:'auto'}}>
            {screens[currentViewId]}
        </div>

        {showLogoutConfirm && (
            <ConfirmPopup 
                message="로그아웃 하시겠습니까?" 
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
