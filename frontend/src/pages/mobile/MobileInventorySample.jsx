import React from 'react';

/**
 * MobileInventorySample Component
 * A sample screen for inventory management on mobile.
 */
export default function MobileInventorySample() {
  const categories = [
    { name: '원자재', count: 124, color: '#3b82f6' },
    { name: '반제품', count: 45, color: '#f59e0b' },
    { name: '완제품', count: 89, color: '#10b981' },
    { name: '소모품', count: 210, color: '#6366f1' },
  ];

  return (
    <div className="p-4">
      <h3 style={{ marginBottom: 20 }}>창고 재고 요약</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {categories.map(cat => (
          <div key={cat.name} style={{ 
            background: 'white', 
            padding: 16, 
            borderRadius: 12, 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>{cat.name}</div>
            <div style={{ fontSize: 20, fontWeight: 'bold', color: cat.color }}>{cat.count.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fffbeb', padding: 16, borderRadius: 12, border: '1px solid #fde68a', marginBottom: 20 }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#92400e', fontSize: 15 }}>⚠️ 재고 부족 알림</h4>
        <p style={{ margin: 0, fontSize: 13, color: '#b45309' }}>
          품목 'A-201' 외 3건이 안전 재고 미만입니다.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="mobile-action-btn" style={{
            padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, textAlign: 'left', fontWeight: '500'
        }}>📦 입고 등록</button>
        <button className="mobile-action-btn" style={{
            padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, textAlign: 'left', fontWeight: '500'
        }}>📤 출고 등록</button>
        <button className="mobile-action-btn" style={{
            padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, textAlign: 'left', fontWeight: '500'
        }}>🔍 실사 등록</button>
      </div>
    </div>
  );
}
