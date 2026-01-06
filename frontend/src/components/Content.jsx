import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'

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
