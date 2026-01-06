import React, {useState} from 'react'
import Login from './Login'

function MobileDashboard(){
  return (
    <div className="mobile-dashboard">
      <header className="mobile-header">LIVE STOCK</header>
      <div className="mobile-content">모바일 대시보드(간단)</div>
    </div>
  )
}

export default function MobileApp(){
  const [logged, setLogged] = useState(false)

  if(!logged) return <Login onLogin={()=>setLogged(true)} />
  return <MobileDashboard />
}
