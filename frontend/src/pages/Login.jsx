import React, {useState} from 'react'

export default function Login({onLogin}){
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  function submit(e){
    e.preventDefault()
    // placeholder: normally call API
    onLogin && onLogin({id})
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="logo">LIVE STOCK</div>
        <form onSubmit={submit} className="login-form">
          <input placeholder="아이디" value={id} onChange={e=>setId(e.target.value)} />
          <input placeholder="비밀번호" value={pw} onChange={e=>setPw(e.target.value)} type="password" />
          <label className="remember"><input type="checkbox"/> 아이디 저장</label>
          <button className="login-btn">LOGIN</button>
        </form>
      </div>
    </div>
  )
}
