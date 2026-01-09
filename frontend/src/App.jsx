import React, {useEffect, useState} from 'react'
import LeftMenu from './components/LeftMenu'
import TopTabs from './components/TopTabs'
import AlertPopup from './components/AlertPopup'
import DetailPopup from './components/DetailPopup'
import ConfirmPopup from './components/ConfirmPopup'
import Content from './components/Content'
import api from './api'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MobileApp from './pages/MobileApp'
import AdminSeed from './pages/AdminSeed'
import SignUp from './pages/SignUp'
import AdminDashboard from './pages/AdminDashboard'
import Permissions from './pages/Permissions'
import ComponentDemo from './pages/ComponentDemo'
import SearchSample from './pages/SearchSample'
import SearchLayoutSample from './pages/SearchLayoutSample'
import ApiSample from './pages/ApiSample'
import MultiApiSample from './pages/MultiApiSample'
import { useTranslation } from './i18n/LanguageContext'
import { useTheme } from './theme/ThemeContext'

export default function App({isMobile}){
  const [userInfo, setUserInfo] = useState(() => {
    try {
      const stored = localStorage.getItem('userInfo');
      return stored ? JSON.parse(stored) : null;
    } catch (e) { return null; }
  });
  const [nickname, setNickname] = useState(() => {
    try {
      const stored = localStorage.getItem('userInfo');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.nickname || '';
      }
      return '';
    } catch (e) { return ''; }
  });

  const [menus,setMenus] = useState([])
  const [openTabs,setOpenTabs] = useState([])
  const [activeId,setActiveId] = useState(null)
  
  const { t, lang, setLang } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [alert, setAlert] = useState(null)
  const [detail, setDetail] = useState(null)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const navigate = useNavigate()

  // Determine if we should show the full app layout
  const isAuthenticated = !!nickname;

  useEffect(()=>{
    if (isAuthenticated) {
      api.get('/menus').then(r=>{
        const allMenus = r.data;
        const filtered = filterMenus(allMenus, isMobile);
        setMenus(filtered);
      }).catch(e=>setAlert('메뉴 로드 실패'))
    } else {
      setMenus([]); // Clear menus when logged out
    }
  },[isAuthenticated, isMobile])

  function filterMenus(nodes, isMobile) {
    if (!nodes) return [];
    return nodes
      .filter(node => {
        const type = node.deviceType;
        if (isMobile) return type === 'MOBILE' || type === 'BOTH';
        return type === 'PC' || type === 'BOTH';
      })
      .map(node => ({
        ...node,
        children: filterMenus(node.children, isMobile)
      }));
  }

  function openMenu(node){
    setOpenTabs(prev=>{
      const exists = prev.find(t=>t.id===node.id)
      if(exists) return prev // keep original opening order
      return [...prev, {id:node.id, name:node.name}]
    })
    setActiveId(node.id)
    navigate(`/menu/${node.id}`)
  }

  function handleLogout(){
    setShowLogoutConfirm(true)
  }

  function confirmLogout(){
    setShowLogoutConfirm(false)
    // clear UI state and navigate to login
    setOpenTabs([])
    setActiveId(null)
    // clear any stored auth info
    try { 
      localStorage.removeItem('token'); 
      localStorage.removeItem('userInfo');
      localStorage.removeItem('nickname');
      sessionStorage.clear(); 
    } catch(e){}
    setNickname('')
    setUserInfo(null)
    navigate('/login')
  }


  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token) {
      setNickname('')
      setUserInfo(null)
      return
    }

    // Try to get from localStorage first for immediate UI update
    const stored = localStorage.getItem('userInfo')
    if(stored){
      const parsed = JSON.parse(stored)
      setNickname(parsed.nickname || '')
      setUserInfo(parsed)
    }

    // Always fetch fresh info from server to verify token and get latest details
    api.get('/auth/me')
      .then(r => {
        const data = r.data
        setNickname(data.nickname || '')
        setUserInfo(data)
        localStorage.setItem('userInfo', JSON.stringify(data))
      })
      .catch(e => {
        console.error("Token invalid or server error", e)
        // If 401, interceptor should handle it, but we can be explicit
        if(e.response && e.response.status === 401) {
          confirmLogout()
        }
      })
  },[]) // Run once on mount

  const [tabletMenuOpen, setTabletMenuOpen] = useState(false)

  const isAuthPath = ['/login', '/signup'].includes(window.location.pathname);

  // 1. Root redirect
  if (window.location.pathname === '/') {
    return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
  }

  // 2. Prevent logged-in users from staying on login/signup pages
  if (isAuthenticated && isAuthPath) {
    return <Navigate to="/dashboard" replace />;
  }

  // 3. Force unauthenticated users to login, except if they are at signup
  if (!isAuthenticated && !isAuthPath) {
    return <Navigate to="/login" replace />;
  }

  // 4. Render Public Layout (only for unauthenticated users at login/signup)
  if (!isAuthenticated) {
    return (
      <div className="app-public" style={{height:'100dvh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)', color:'var(--text)', position:'relative'}}>
        {/* Floating Controls for Public View */}
        <div style={{position:'absolute', top:20, right:20, display:'flex', gap:12, alignItems:'center', background: 'rgba(0,0,0,0.05)', padding:'8px 12px', borderRadius:20}}>
          <select 
            value={lang} 
            onChange={(e)=>setLang(e.target.value)}
            style={{background:'none', border:'none', color:'inherit', fontSize:13, cursor:'pointer', fontWeight:600}}
          >
            <option value="ko" style={{color:'#000'}}>KO</option>
            <option value="en" style={{color:'#000'}}>EN</option>
          </select>
          <button 
            onClick={toggleTheme}
            style={{background:'none', border:'none', color:'inherit', cursor:'pointer', fontSize:18, display:'flex', alignItems:'center', padding:0}}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        <Routes>
          <Route path="/login" element={<Login onLogin={(info)=>{ 
            if(info) { setNickname(info.nickname); setUserInfo(info); }
            navigate('/dashboard') 
          }} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        {alert && <AlertPopup message={alert} onClose={()=>setAlert(null)} />}
      </div>
    );
  }

  // 3. Authenticated and at a private route
  if(isMobile) return <MobileApp nickname={nickname} userInfo={userInfo} menus={menus} onLogout={confirmLogout} />

  // PC Private Layout
  return (
    <div className="app">
      {/* Tablet overlay to close menu */}
      {tabletMenuOpen && (
        <div className="tablet-overlay" onClick={()=>setTabletMenuOpen(false)}></div>
      )}
      <header className="app-header">
        <div style={{display:'flex', alignItems:'center'}}>
            <button className="tablet-toggle" onClick={()=>setTabletMenuOpen(!tabletMenuOpen)}>☰</button>
            <div className="brand">LIVE STOCK</div>
        </div>
        <div className="user-area">
          <div style={{display:'flex',alignItems:'center',gap:16}}>
            {/* Theme & Language Controls */}
            <div className="header-controls" style={{display:'flex', alignItems:'center', gap:8}}>
              <select 
                className="lang-select" 
                value={lang} 
                onChange={(e)=>setLang(e.target.value)}
                style={{background:'rgba(255,255,255,0.1)', color:'#fff', border:'1px solid rgba(255,255,255,0.2)', borderRadius:4, padding:'2px 4px', fontSize:11, cursor:'pointer'}}
              >
                <option value="ko" style={{color:'#000'}}>KO</option>
                <option value="en" style={{color:'#000'}}>EN</option>
              </select>
              <button 
                className="theme-toggle-btn" 
                onClick={toggleTheme}
                style={{background:'none', border:'none', color:'#fff', cursor:'pointer', fontSize:18, padding:0, display:'flex', alignItems:'center'}}
                title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>

            <div style={{display:'flex', gap:10, alignItems:'center', borderLeft:'1px solid rgba(255,255,255,0.2)', paddingLeft:12}}>
              <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
                 <div style={{fontSize:12,fontWeight:'bold',color:'#fff'}}>{nickname || '관리자'}</div>
                 <div style={{fontSize:10,color:'#fff',opacity:0.7}}>{userInfo?.department || t('common.department')} ({userInfo?.roles || 'USER'})</div>
              </div>
              <button className="logout-btn" onClick={handleLogout}>{t('common.logout')}</button>
            </div>
          </div>
        </div>
      </header>

      <div className="app-body">
        <div className={`leftmenu-wrapper ${tabletMenuOpen ? 'show' : ''}`}>
             {/* We can't easily wrapper without changing CSS selector .leftmenu which is component root. 
                 So I will modify LeftMenu to take a prop. 
              */}
            <LeftMenu menus={menus} onOpen={(n)=>{ openMenu(n); setTabletMenuOpen(false); }} show={tabletMenuOpen} activeId={activeId} />
        </div>
        <div className="main">
          <TopTabs
            tabs={openTabs}
            activeId={activeId}
            onClose={(id)=>{
              const newTabs = openTabs.filter(x=>x.id!==id)
              setOpenTabs(newTabs)
              if(activeId===id) {
                if(newTabs.length > 0) {
                  const last = newTabs[newTabs.length - 1]
                  setActiveId(last.id)
                  navigate(`/menu/${last.id}`)
                } else {
                  setActiveId(null)
                  navigate('/dashboard')
                }
              } else if(newTabs.length === 0) {
                navigate('/dashboard')
              }
            }}
            onCloseAll={()=>{ setOpenTabs([]); setActiveId(null); navigate('/dashboard') }}
            onSelect={(id)=>{ setActiveId(id); navigate(`/menu/${id}`) }}
          />
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login onLogin={(info)=>{ 
                if(info) {
                  setNickname(info.nickname); 
                  setUserInfo(info);
                }
                navigate('/dashboard') 
              }} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/menu/:id" element={<Content />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/permissions" element={<Permissions />} />
              <Route path="/admin/seed" element={<AdminSeed />} />
              <Route path="/admin/demo" element={<ComponentDemo />} />
              <Route path="/admin/sample" element={<SearchSample />} />
              <Route path="/admin/layout" element={<SearchLayoutSample />} />
              <Route path="/admin/api-sample" element={<ApiSample />} />
              <Route path="/admin/multi-api" element={<MultiApiSample />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </div>
      </div>

      {alert && <AlertPopup message={alert} onClose={()=>setAlert(null)} />}
      {detail && <DetailPopup data={detail} onClose={()=>setDetail(null)} />}
      {showLogoutConfirm && <ConfirmPopup message="로그아웃 하시겠습니까?" onConfirm={confirmLogout} onCancel={()=>setShowLogoutConfirm(false)} />}
    </div>
  )
}
