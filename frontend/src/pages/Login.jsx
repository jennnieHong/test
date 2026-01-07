import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api'
import AlertPopup from '../components/AlertPopup'

export default function Login(){
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(null)
  const navigate = useNavigate()

  function submit(e){
    e.preventDefault()
    setErr(null)
    api.post('/auth/login', { username: id, password: pw })
      .then(()=>{
        navigate('/dashboard')
      })
      .catch(errRes=>{
        // parse backend response for better messaging
        const data = errRes && errRes.response && errRes.response.data ? errRes.response.data : null
        if(data){
          if(data.error === 'locked'){
            setErr(data.message || '계정이 잠겼습니다.')
            return
          }
          if(data.error === 'invalid_password'){
            const left = data.attemptsLeft
            setErr((left!==undefined) ? `비밀번호가 틀렸습니다. 남은 시도: ${left}` : (data.message || '비밀번호가 틀렸습니다.'))
            return
          }
          setErr(data.message || '로그인 실패')
          return
        }
        setErr('로그인 실패')
      })
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
          <div className="login-actions">
            <Link to="/signup" className="signup-link">회원가입</Link>
          </div>
          {err && <div className="login-error">{err}</div>}
        </form>
        {err && <AlertPopup message={err} onClose={()=>setErr(null)} />}
      </div>
    </div>
  )
}
