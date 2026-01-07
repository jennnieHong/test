import React, {useState} from 'react'
import api from '../api'

export default function SignUp(){
  const [form, setForm] = useState({username:'',password:'',email:''})
  const [msg, setMsg] = useState(null)

  function change(e){ setForm({...form, [e.target.name]: e.target.value}) }
  function submit(e){
    e.preventDefault()
    setMsg(null)
    api.post('/auth/signup', form)
      .then(r=>{
        setMsg('가입이 완료되었습니다. 로그인 페이지로 이동합니다.')
        setTimeout(()=> window.location.href = '/login', 1200)
      })
      .catch(err=>{
        const m = err?.response?.data?.error || '가입에 실패했습니다.'
        setMsg(m)
      })
  }

  return (
    <div className="signup-page screen">
      <h2>회원가입</h2>
      <form onSubmit={submit} className="signup-form">
        <input name="username" placeholder="아이디" value={form.username} onChange={change} />
        <input name="email" placeholder="이메일" value={form.email} onChange={change} />
        <input name="password" placeholder="비밀번호" type="password" value={form.password} onChange={change} />
        <button>회원가입</button>
      </form>
      {msg && <div className="info">{msg}</div>}
    </div>
  )
}
