import React from 'react'

export default function Permissions(){
  return (
    <div className="screen">
      <h2>화면 권한 부여</h2>
      <p>이 페이지에서 각 화면(메뉴)에 대해 역할 기반 권한을 설정합니다.</p>
      <div className="panel">
        <p>권한 매핑 예제:</p>
        <ul>
          <li>시스템 관리: ADMIN</li>
          <li>구매관리: USER, PURCHASER</li>
          <li>물류/재고: USER, WAREHOUSE</li>
        </ul>
      </div>
    </div>
  )
}
