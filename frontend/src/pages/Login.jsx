import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'  
import { useTranslation } from '../i18n/LanguageContext'
import api from '../api'
import AlertPopup from '../components/AlertPopup'

export default function Login(props){
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(null)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(()=>{
    const token = localStorage.getItem('token')
    const storedNick = localStorage.getItem('nickname')
    if(token && storedNick){
      if(props.onLogin) props.onLogin(storedNick)
      else navigate('/dashboard')
    }
  },[])

  function submit(e){
    e.preventDefault()
    setErr(null)
    api.post('/auth/login', { username: id, password: pw })
      .then((r)=>{
        const { token, userInfo } = r.data
        if(token) localStorage.setItem('token', token)
        if(userInfo) {
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          localStorage.setItem('nickname', userInfo.nickname) // Keep for backward compatibility/minor usage
        }
        
        if(props.onLogin) props.onLogin(userInfo || { nickname: r.data.nickname })
        else navigate('/dashboard')
      })
      .catch(errRes=>{
        // parse backend response for better messaging
        const data = errRes && errRes.response && errRes.response.data ? errRes.response.data : null
        if(data){
          if(data.error === 'locked'){
            setErr(data.message || t('login.err_locked'))
            return
          }
          if(data.error === 'invalid_password'){
            const left = data.attemptsLeft
            setErr((left!==undefined) ? `${t('login.err_invalid_pw')} ${t('login.attempts_left')}: ${left}` : (data.message || t('login.err_invalid_pw')))
            return
          }
          setErr(data.message || t('login.err_failed'))
          return
        }
        setErr(t('login.err_failed'))
      })
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="logo">{t('login.title')}</div>
        <form onSubmit={submit} className="login-form">
          <input placeholder={t('login.username')} value={id} onChange={e=>setId(e.target.value)} />
          <input placeholder={t('login.password')} value={pw} onChange={e=>setPw(e.target.value)} type="password" />
          <label className="remember"><input type="checkbox"/> {t('login.remember_me')}</label>
          <button className="login-btn">{t('login.login_btn')}</button>
          <div className="login-actions">
            <Link to="/signup" className="signup-link">{t('login.signup_link')}</Link>
          </div>
          {err && <div className="login-error">{err}</div>}
        </form>
        {err && <AlertPopup message={err} onClose={()=>setErr(null)} />}
      </div>
    </div>
  )
}
