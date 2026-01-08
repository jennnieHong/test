import React, { useState } from 'react'
import AlertPopup from '../components/AlertPopup'
import ConfirmPopup from '../components/ConfirmPopup'
import DetailPopup from '../components/DetailPopup'
import MultiSelectPopup from '../components/MultiSelectPopup'

import { useNavigate } from 'react-router-dom'

export default function SampleGuide(){
  const navigate = useNavigate()
  const [alertMsg, setAlertMsg] = useState(null)
  const [confirmMsg, setConfirmMsg] = useState(null)
  const [detailData, setDetailData] = useState(null)
  const [multiDetailData, setMultiDetailData] = useState(null)
  const [lastAction, setLastAction] = useState('')

  return (
    <div className="sample-guide">
      <h2>샘플 가이드 (C-1-1)</h2>
      <p>개발자들을 위한 UI 컴포넌트 사용 예시입니다.</p>

      <div style={{display:'flex', gap:'20px', marginTop:'20px'}}>
        {/* Alert Test */}
        <div className="card">
          <h4>Alert Popup</h4>
          <p>단순 알림 메시지를 표시합니다.</p>
          <button onClick={()=>setAlertMsg('테스트 알림입니다.')} className="login-btn" style={{fontSize:14, padding:'8px 16px'}}>Alert 열기</button>
        </div>

        {/* Confirm Test */}
        <div className="card">
          <h4>Confirm Popup</h4>
          <p>사용자 확인/취소를 요청합니다.</p>
          <button 
            onClick={()=>setConfirmMsg('작업을 진행하시겠습니까?')} 
            className="login-btn" 
            style={{fontSize:14, padding:'8px 16px', background:'#28a745'}}>
            Confirm 열기
          </button>
        </div>

        {/* Navigation Test */}
        <div className="card">
          <h4>화면 이동 테스트</h4>
          <p>파라미터와 함께 다른 화면으로 이동합니다.</p>
          <button 
            onClick={()=> navigate('/menu/101', {state: { source: 'sampleGuide', item: 'Apple' }})}
            className="login-btn" 
            style={{fontSize:14, padding:'8px 16px', background:'#ff9800', border:'none', cursor:'pointer'}}>
             재고화면으로 이동 (item=Apple)
          </button>
        </div>

        {/* Detail Test */}
        <div className="card">
          <h4>Detail Popup (Data Flow)</h4>
          <p>API에서 데이터를 가져와 선택 후 반환합니다.</p>
          <button 
            onClick={()=>{
                setLastAction('과일 목록 로딩중...')
                import('../api').then(module => {
                    module.default.get('/samples/fruits')
                      .then(r => {
                          setDetailData({
                              title: '과일 선택', 
                              options: r.data
                          })
                          setLastAction('과일 목록을 불러왔습니다.')
                      })
                      .catch(e => setLastAction('데이터 로드 실패'))
                })
            }} 
            className="login-btn" 
            style={{fontSize:14, padding:'8px 16px', background:'#6f42c1'}}>
            과일 선택 (API)
          </button>
          {/* Display selected value */}
          <div style={{marginTop:10, fontSize:13, color:'#555'}}>
              선택된 과일: <strong>{typeof lastAction==='string' && lastAction.startsWith('과일 선택:') ? lastAction.split(':')[1] : '(없음)'}</strong>
          </div>
          <div style={{marginTop:10, borderTop:'1px solid #eee', paddingTop:10}}>
              <button 
                onClick={()=>{
                    setLastAction('다중 선택 로딩중...')
                    import('../api').then(module => {
                        module.default.get('/samples/fruits')
                        .then(r => {
                            setMultiDetailData({
                                title: '과일 다중 선택', 
                                options: r.data
                            })
                            setLastAction('목록을 불러왔습니다.')
                        })
                        .catch(e => setLastAction('데이터 로드 실패'))
                    })
                }} 
                className="login-btn" 
                style={{fontSize:14, padding:'8px 16px', background:'#00897b'}}>
                과일 다중 선택
              </button>
          </div>
        </div>
      </div>

      <div style={{marginTop:'20px', padding:'10px', background:'#f0f0f0', borderRadius:'5px'}}>
        <strong>마지막 상태:</strong> {lastAction || '대기중'}
      </div>

      {/* Render Popups */}
      {alertMsg && <AlertPopup message={alertMsg} onClose={()=>setAlertMsg(null)} />}
      
      {confirmMsg && (
        <ConfirmPopup 
          message={confirmMsg} 
          onConfirm={()=>{ setLastAction('확인됨 ('+new Date().toLocaleTimeString()+')'); setConfirmMsg(null) }} 
          onCancel={()=>{ setLastAction('취소됨 ('+new Date().toLocaleTimeString()+')'); setConfirmMsg(null) }} 
        />
      )}

      {detailData && (
        <DetailPopup 
            data={detailData} 
            onClose={()=>setDetailData(null)} 
            onSelect={(val)=> setLastAction('과일 선택:'+val)}
        />
      )}

      {multiDetailData && (
        <MultiSelectPopup 
            data={multiDetailData} 
            onClose={()=>setMultiDetailData(null)} 
            onSelect={(vals)=> setLastAction('과일 다중 선택: [' + vals.join(', ') + ']')}
        />
      )}
    </div>
  )
}
