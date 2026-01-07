import React from 'react'

export default function SystemManagement({node}){
  const title = node?.name || '시스템 관리'
  return (
    <div className="screen">
      <h2>{title}</h2>
      <p>사용자, 권한, 설정을 관리합니다.</p>
      <div className="card-row">
        <div className="card">사용자 관리<br/><button>사용자 추가</button></div>
        <div className="card">권한 관리<br/><button>권한 편집</button></div>
        <div className="card">환경설정<br/><button>설정 열기</button></div>
      </div>
    </div>
  )
}
