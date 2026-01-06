import React from 'react'
export default function AlertPopup({message,onClose}){
  return (
    <div className="overlay">
      <div className="popup">
        <h3>알림</h3>
        <p>{message}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  )
}
