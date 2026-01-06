import React from 'react'

function Donut(){
  return (
    <div className="donut">
      <div className="donut-inner">0%</div>
    </div>
  )
}

export default function Dashboard(){
  return (
    <div className="dashboard">
      <div className="dash-left">
        <h3>출고 목표 달성율</h3>
        <Donut />
        <h4>입고</h4>
        <div className="chart-placeholder">바 차트 영역</div>
        <h4>출고</h4>
        <div className="chart-placeholder">바 차트 영역</div>
      </div>
      <div className="dash-right">
        <section className="panel">출고정보 (최근)</section>
        <section className="panel">입고정보 (최근)</section>
        <section className="panel">생산정보 (30일)</section>
      </div>
    </div>
  )
}
