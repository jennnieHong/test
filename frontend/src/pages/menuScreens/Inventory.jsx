import { useLocation } from 'react-router-dom'

export default function Inventory({node}){
  const { state } = useLocation()

  const title = node?.name || '물류/재고'
  const items = [
    {id:1,name:'사료',qty:1200,unit:'kg'},
    {id:2,name:'비타민',qty:240,unit:'box'},
    {id:3,name:'사료첨가제',qty:50,unit:'kg'}
  ]
  return (
    <div className="screen">
      <h2>{title}</h2>
      
      {(state) && (
        <div style={{background:'#e3f2fd', padding:'10px', borderRadius:'8px', marginBottom:'20px', border:'1px solid #90caf9'}}>
             <strong>파라미터 수신 확인:</strong><br/>
             Source (State): {state?.source || '-'}<br/>
             Item (State): {state?.item || '-'}
        </div>
      )}

      <div className="grid">
        {items.map(it=> (
          <div className="grid-item" key={it.id}>
            <div className="gi-name">{it.name}</div>
            <div className="gi-qty">{it.qty} {it.unit}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
