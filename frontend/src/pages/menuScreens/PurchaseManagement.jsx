import React from 'react'

export default function PurchaseManagement({node}){
  const title = node?.name || '구매관리'
  return (
    <div className="screen">
      <h2>{title}</h2>
      <p>구매 주문 목록과 상태를 확인합니다.</p>
      <table className="simple-table">
        <thead><tr><th>No</th><th>주문번호</th><th>거래처</th><th>상태</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>PO-20260101-001</td><td>농장 A</td><td>접수</td></tr>
          <tr><td>2</td><td>PO-20260102-002</td><td>농장 B</td><td>출고중</td></tr>
        </tbody>
      </table>
    </div>
  )
}
