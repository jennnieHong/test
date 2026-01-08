import React, {useState, useRef, useEffect} from 'react'

export default function MultiSelectPopup({data, onClose, onSelect}){
  const [selected, setSelected] = useState([])
  const [pos, setPos] = useState({x:0, y:0})
  const isDragging = useRef(false)
  const dragStart = useRef({x:0, y:0})

  useEffect(()=>{
    const onMove = (e) => {
      if(!isDragging.current) return
      const dx = e.clientX - dragStart.current.x
      const dy = e.clientY - dragStart.current.y
      setPos(prev => ({x: prev.x + dx, y: prev.y + dy}))
      dragStart.current = {x: e.clientX, y: e.clientY}
    }
    const onUp = () => {
      isDragging.current = false
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  },[])

  function toggle(item){
    if(selected.includes(item)){
      setSelected(selected.filter(i=>i!==item))
    }else{
      setSelected([...selected, item])
    }
  }

  function confirm(){
    onSelect(selected)
    onClose()
  }

  return (
    <div className="overlay">
      <div className="popup" style={{minWidth:'300px', transform: `translate(${pos.x}px, ${pos.y}px)`}}>
        <h3
          style={{cursor:'move', userSelect:'none', borderBottom:'1px solid #eee', paddingBottom:'10px', marginBottom:'15px'}}
          onMouseDown={e => {
            isDragging.current = true
            dragStart.current = {x: e.clientX, y: e.clientY}
          }}
        >
          {data.title}
        </h3>
        <p style={{marginBottom:10, fontSize:13, color:'#666'}}>사용 가능한 항목을 선택하세요.</p>
        <div style={{maxHeight:'300px', overflowY:'auto', textAlign:'left', border:'1px solid #eee', padding:10, borderRadius:8, marginBottom:20}}>
          {data.options.map(o=> (
            <label key={o} style={{display:'flex', alignItems:'center', padding:'8px', borderBottom:'1px solid #f9f9f9', cursor:'pointer'}}>
              <input 
                type="checkbox" 
                checked={selected.includes(o)} 
                onChange={()=>toggle(o)}
                style={{marginRight:10}}
              />
              {o}
            </label>
          ))}
        </div>
        <div style={{display:'flex', justifyContent:'center', gap:10}}>
            <button className="primary" onClick={confirm}>선택 완료 ({selected.length})</button>
            <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  )
}
