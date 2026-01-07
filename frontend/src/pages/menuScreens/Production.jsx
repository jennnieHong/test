import React from 'react'

export default function Production({node}){
  const title = node?.name || '생산관리'
  return (
    <div className="screen">
      <h2>{title}</h2>
      <p>생산 지시, 진행 상태를 모니터링 합니다.</p>
      <div className="panel">최근 생산 지시가 없습니다.</div>
    </div>
  )
}
