import React from 'react'
export default function DetailPopup({data,onClose}){
  return (
    <div className="overlay">
      <div className="popup">
        <h3>{data.title}</h3>
        <ul>
          {data.options.map(o=> <li key={o}><button onClick={()=>{alert('선택:'+o); onClose()}}>{o}</button></li>)}
        </ul>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  )
}
