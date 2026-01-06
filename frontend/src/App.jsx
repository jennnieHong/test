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

export default function App({isMobile}){
  const [menus,setMenus] = useState([])
  const [openTabs,setOpenTabs] = useState([])
  const [alert, setAlert] = useState(null)
  const [detail, setDetail] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    api.get('/menus').then(r=>setMenus(r.data)).catch(e=>setAlert('메뉴 로드 실패'))
  },[])

  function openMenu(node){
    setOpenTabs(prev=>{
      if(prev.find(t=>t.id===node.id)) return prev
      return [...prev, {id:node.id, name:node.name}]
    })
    navigate(`/menu/${node.id}`)
  }

  if(isMobile) return <MobileApp />

  return (
    <div className="app">
      <LeftMenu menus={menus} onOpen={openMenu} />
      <div className="main">
        <TopTabs tabs={openTabs} onClose={(id)=>setOpenTabs(t=>t.filter(x=>x.id!==id))} onSelect={(id)=>navigate(`/menu/${id}`)} />
        <div className="content">
          <Routes>
            <Route path="/login" element={<Login onLogin={()=>navigate('/dashboard')} />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/menu/:id" element={<Content />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
      {alert && <AlertPopup message={alert} onClose={()=>setAlert(null)} />}
      {detail && <DetailPopup data={detail} onClose={()=>setDetail(null)} />}
    </div>
  )
}
