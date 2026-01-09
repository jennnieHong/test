import React from 'react';

/**
 * MobileProductionSample Component
 * A sample screen for production management on mobile.
 */
export default function MobileProductionSample() {
  const mockJobs = [
    { id: 'JOB-001', item: '모터 조립', status: '진행중', qty: 50 },
    { id: 'JOB-002', item: '센서 장착', status: '대기', qty: 100 },
    { id: 'JOB-003', item: '최종 검수', status: '완료', qty: 30 },
  ];

  return (
    <div className="p-4">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ margin: 0 }}>생산 현황</h3>
        <span style={{ fontSize: 12, background: '#e0e7ff', color: '#4338ca', padding: '4px 8px', borderRadius: 12 }}>
          오늘의 작업
        </span>
      </div>

      <div className="production-list" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {mockJobs.map(job => (
          <div key={job.id} style={{ 
            background: 'white', 
            padding: 16, 
            borderRadius: 12, 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            borderLeft: `4px solid ${job.status === '진행중' ? '#3b82f6' : job.status === '완료' ? '#10b981' : '#94a3b8'}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontWeight: 'bold' }}>{job.item}</span>
              <span style={{ fontSize: 12, color: '#64748b' }}>{job.id}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: '#475569' }}>목표 수량: {job.qty}</span>
              <span style={{ 
                fontSize: 12, 
                fontWeight: '600',
                color: job.status === '진행중' ? '#3b82f6' : job.status === '완료' ? '#10b981' : '#64748b'
              }}>
                {job.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button style={{
        marginTop: 24,
        width: '100%',
        padding: '12px',
        background: '#1565c0',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        fontWeight: 'bold'
      }}>
        신규 작업 등록
      </button>
    </div>
  );
}
