import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminDashboard(){
  return (
    <div className="screen">
      <h2>관리자 대시보드</h2>
      <p>관리자 전용 기능 모음입니다.</p>
      <div className="admin-cards">
        <div className="card"><Link to="/admin/permissions">화면 권한 부여</Link></div>
        <div className="card"><Link to="/admin/seed">DB 시드 실행</Link></div>
        <div className="card">운영 로그</div>
      </div>
    </div>
  )
}
