import React, {useState, useRef, useEffect} from 'react'

export default function DetailPopup({data,onClose,onSelect}){
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

  return (
    <div className="overlay">
      <div className="popup" style={{transform: `translate(${pos.x}px, ${pos.y}px)`}}>
        <h3 
          style={{cursor:'move', userSelect:'none', borderBottom:'1px solid #eee', paddingBottom:'10px', marginBottom:'15px'}}
          onMouseDown={e => {
            isDragging.current = true
            dragStart.current = {x: e.clientX, y: e.clientY}
          }}
        >
          {data.title}
        </h3>
        <ul>
          {data.options.map(o=> (
            <li key={o}>
              <button onClick={()=>{
                if(onSelect) onSelect(o)
                else alert('선택:'+o)
                onClose()
              }}>{o}</button>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  )
}
