import React from 'react'

export default function NavTestScreen({level, nextLevel, onNavigate, color}){
    return (
        <div className="p-4" style={{borderTop:`5px solid ${color}`}}>
            <h3>화면 {level}</h3>
            <p>이곳은 <strong>{level}단계</strong> 화면입니다.</p>
            <div style={{marginTop:20, padding:15, background:'#f5f5f5', borderRadius:8}}>
                {nextLevel ? (
                    <>
                        <p>다음 단계로 이동하여 히스토리를 쌓습니다.</p>
                        <button 
                            onClick={()=>onNavigate(nextLevel)}
                            style={{padding:'10px 20px', background:color, color:'white', border:'none', borderRadius:4, fontWeight:'bold'}}
                        >
                            {nextLevel} 화면으로 이동 (Forward Push)
                        </button>
                    </>
                ) : (
                    <p>마지막 단계입니다. 헤더의 뒤로가기 버튼을 테스트해보세요.</p>
                )}
            </div>
            <div style={{marginTop:20, fontSize:12, color:'#999'}}>
                현재 화면: {level}<br/>
                히스토리 동작 확인용
            </div>
        </div>
    )
}
