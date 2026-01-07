import React, { useState } from 'react'
import axios from 'axios'

export default function AdminSeed(){
  const [user, setUser] = useState('admin')
  const [pass, setPass] = useState('admin')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  async function runSeed(){
    setLoading(true)
    setStatus(null)
    try{
      const res = await axios.post('http://localhost:8080/api/admin/seed', null, { auth: { username: user, password: pass } })
      setStatus({ok:true, text: res.data})
    }catch(e){
      const msg = e.response?.data || e.message
      setStatus({ok:false, text: String(msg)})
    }finally{ setLoading(false) }
  }

  return (
    <div className="screen">
      <h2>Admin Seed</h2>
      <p>Reapply `data.sql` to the backend database. Use only in development.</p>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <input value={user} onChange={e=>setUser(e.target.value)} placeholder="username" />
        <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="password" type="password" />
        <button onClick={runSeed} disabled={loading}>{loading? 'Running...' : 'Run Seed'}</button>
      </div>
      {status && (
        <div style={{marginTop:12,color: status.ok? 'green':'crimson'}}>
          {status.text}
        </div>
      )}
    </div>
  )
}
