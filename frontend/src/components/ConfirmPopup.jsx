import React from 'react'

export default function ConfirmPopup({message, onConfirm, onCancel}){
  return (
    <div className="overlay">
      <div className="popup">
        <h3>확인</h3>
        <p>{message}</p>
        <div style={{display:'flex', justifyContent:'center', gap:'10px', marginTop:'20px'}}>
            <button onClick={onConfirm} style={{padding:'8px 20px', backgroundColor:'#4a90e2', color:'white', border:'none', borderRadius:'4px', cursor:'pointer'}}>확인</button>
            <button onClick={onCancel} style={{padding:'8px 20px', backgroundColor:'#ddd', color:'#333', border:'none', borderRadius:'4px', cursor:'pointer'}}>취소</button>
        </div>
      </div>
    </div>
  )
}
