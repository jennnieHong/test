import React from 'react'

export default function MobileStock({params, onNavigate}){
    return (
        <div className="p-4">
            <div style={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>
                <h3>재고 현황</h3>
                <button onClick={()=>onNavigate('dashboard')} style={{fontSize:12, padding:'4px 8px'}}>대시보드로</button>
            </div>
            
            {params && (
                <div style={{background:'#e3f2fd', padding:10, borderRadius:8, marginBottom:15, border:'1px solid #90caf9'}}>
                    <strong>수신된 파라미터:</strong>
                    <pre style={{margin:0, fontSize:12}}>{JSON.stringify(params, null, 2)}</pre>
                </div>
            )}
            <p>재고 목록이 표시될 화면입니다.</p>
            <ul>
                <li>Apple (10) <button onClick={()=>onNavigate('stock_detail', {item:'Apple'})} style={{marginLeft:10, fontSize:11}}>상세</button></li>
                <li>Banana (20) <button onClick={()=>onNavigate('stock_detail', {item:'Banana'})} style={{marginLeft:10, fontSize:11}}>상세</button></li>
                <li>Orange (5) <button onClick={()=>onNavigate('stock_detail', {item:'Orange'})} style={{marginLeft:10, fontSize:11}}>상세</button></li>
            </ul>
        </div>
    )
}
