import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'
import SystemManagement from '../pages/menuScreens/SystemManagement'
import PurchaseManagement from '../pages/menuScreens/PurchaseManagement'
import Inventory from '../pages/menuScreens/Inventory'
import Production from '../pages/menuScreens/Production'
import SampleGuide from '../pages/SampleGuide'

function DefaultScreen({node}){
  return (
    <div>
      <h3>{node.name}</h3>
      <p>코드: {node.code} / 레벨: {node.level}</p>
      {node.children && node.children.length>0 && (
        <div>
          <h4>하위 메뉴</h4>
          <ul>
            {node.children.map(c=> <li key={c.id}>{c.name}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function Content(){
  const { id } = useParams()
  const [node, setNode] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(!id) return
    setLoading(true)
    api.get(`/menus/${id}`).then(r=> setNode(r.data)).catch(e=> setNode(null)).finally(()=>setLoading(false))
  },[id])

  if(loading) return <div>로딩중...</div>
  if(!node) return <div>메뉴를 찾을 수 없습니다.</div>

  // map menu code to screen component
  const map = {
    'L001': ({node}) => <div><h2>{node.name}</h2><p>대메뉴 개요 화면입니다.</p></div>,
    'L002': ({node}) => <div><h2>{node.name}</h2><p>대메뉴 B 개요</p></div>,
    'M011': SystemManagement,
    'M012': PurchaseManagement,
    'M021': Inventory,
    'M031': Production,
    'S0101': Inventory,
    'S0102': Inventory,
    'S0121': ({node}) => <div><h2>{node.name}</h2><p>소메뉴 상세</p></div>,
    'S0211': ({node}) => <div><h2>{node.name}</h2><p>소메뉴 상세</p></div>,
    'S0311': SampleGuide
  }

  const Screen = map[node.code] || DefaultScreen

  return (
    <div>
      <div className="breadcrumb">
        <span>현재: </span>
        <span>{node.name}</span>
        {node.parentId && <span> / ID: {node.parentId}</span>}
      </div>
      <Screen node={node} />
    </div>
  )
}
