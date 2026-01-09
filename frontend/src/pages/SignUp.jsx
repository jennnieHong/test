import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import { useTranslation } from '../i18n/LanguageContext'

export default function SignUp(){
  const [form, setForm] = useState({username:'',password:'',email:'', nickname:''})
  const [msg, setMsg] = useState(null)
  const { t } = useTranslation()

  function change(e){ setForm({...form, [e.target.name]: e.target.value}) }
  function submit(e){
    e.preventDefault()
    setMsg(null)
    api.post('/auth/signup', form)
      .then(r=>{
        setMsg(t('signup.success_msg'))
        setTimeout(()=> window.location.href = '/login', 1200)
      })
      .catch(err=>{
        const m = err?.response?.data?.error || t('signup.fail_msg')
        setMsg(m)
      })
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="logo">{t('login.title')}</div>
        <h3>{t('signup.title')}</h3>
        <form onSubmit={submit} className="login-form">
          <input name="username" placeholder={t('login.username')} value={form.username} onChange={change} />
          <input name="nickname" placeholder={t('common.nickname')} value={form.nickname} onChange={change} />
          <input name="email" placeholder="E-mail" value={form.email} onChange={change} />
          <input name="password" placeholder={t('login.password')} type="password" value={form.password} onChange={change} />
          <button className="login-btn">{t('signup.signup_btn')}</button>
          <div className="login-actions">
            <Link to="/login" className="signup-link">{t('login.back_to_login')}</Link>
          </div>
        </form>
        {msg && <div className="info" style={{marginTop:15, color: 'var(--primary)'}}>{msg}</div>}
      </div>
    </div>
  )
}
