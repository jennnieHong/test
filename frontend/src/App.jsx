import React, {useEffect, useState} from 'react'
import LeftMenu from './components/LeftMenu'
import TopTabs from './components/TopTabs'
import AlertPopup from './components/AlertPopup'
import DetailPopup from './components/DetailPopup'
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

export default function App({isMobile}){
  const [menus,setMenus] = useState([])
  const [openTabs,setOpenTabs] = useState([])
  const [activeId,setActiveId] = useState(null)
  const [alert, setAlert] = useState(null)
  const [detail, setDetail] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    api.get('/menus').then(r=>setMenus(r.data)).catch(e=>setAlert('메뉴 로드 실패'))
  },[])

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
    // clear UI state and navigate to login
    setOpenTabs([])
    setActiveId(null)
    // clear any stored auth info
    try { localStorage.clear(); sessionStorage.clear(); } catch(e){}
    navigate('/login')
  }

  if(isMobile) return <MobileApp />

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">LIVE STOCK</div>
        <div className="user-area">
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div style={{fontSize:12,color:'#fff',opacity:0.9}}>관리자</div>
            <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
          </div>
        </div>
      </header>

      <div className="app-body">
        <LeftMenu menus={menus} onOpen={openMenu} />
        <div className="main">
          <TopTabs
            tabs={openTabs}
            activeId={activeId}
            onClose={(id)=>{
              setOpenTabs(t=>t.filter(x=>x.id!==id))
              if(activeId===id) setActiveId(null)
            }}
            onCloseAll={()=>{ setOpenTabs([]); setActiveId(null); navigate('/dashboard') }}
            onSelect={(id)=>{ setActiveId(id); navigate(`/menu/${id}`) }}
          />
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login onLogin={()=>navigate('/dashboard')} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/menu/:id" element={<Content />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/permissions" element={<Permissions />} />
              <Route path="/admin/seed" element={<AdminSeed />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>
        </div>
      </div>

      {alert && <AlertPopup message={alert} onClose={()=>setAlert(null)} />}
      {detail && <DetailPopup data={detail} onClose={()=>setDetail(null)} />}
    </div>
  )
}
