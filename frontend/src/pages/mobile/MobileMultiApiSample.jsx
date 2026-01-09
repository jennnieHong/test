import React, { useState } from 'react';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import Button from '../../components/common/Button';
import MobileCard from '../../components/common/MobileCard';

export default function MobileMultiApiSample() {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const fetchBatch = async () => {
    setLoading(true);
    setComplete(false);

    // Simulate batch loading
    const tasks = [
      new Promise(res => setTimeout(res, 1000)),
      new Promise(res => setTimeout(res, 2500)),
      new Promise(res => setTimeout(res, 1800))
    ];

    await Promise.all(tasks);
    setLoading(false);
    setComplete(true);
  };

  return (
    <div className="p-4">
      <LoadingOverlay show={loading} message="모바일 데이터를 동기화 중..." />

      <div className="page-header" style={{ marginBottom: 20 }}>
        <h3 style={{ margin: 0 }}>모바일 다중 API (Overlay)</h3>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
          전체 화면 로딩 바를 사용하여 앱 데이터를 동기화합니다.
        </p>
      </div>

      <MobileCard title="데이터 상태">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>네트워크 동기화</span>
          <span style={{ color: complete ? '#10b981' : '#f59e0b', fontWeight: 'bold' }}>
            {complete ? '최신상태' : '업데이트 필요'}
          </span>
        </div>
      </MobileCard>

      <div style={{ marginTop: 24 }}>
        <Button 
          variant="secondary" 
          size="lg" 
          style={{ width: '100%', height: 50 }}
          onClick={fetchBatch}
          disabled={loading}
        >
          전체 데이터 다시받기
        </Button>
      </div>

      <div style={{ marginTop: 40, padding: 16, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: 15 }}>✨ UX 가이드</h4>
        <ul style={{ paddingLeft: 18, fontSize: 13, color: '#475569', lineHeight: 1.6 }}>
          <li>모바일 앱 로딩 중에는 <strong>반투명 Overlay</strong>를 사용하여 잘못된 터치를 방지합니다.</li>
          <li><code>Promise.all</code>을 사용하여 모든 필수 데이터가 준비된 후에만 화면 잠금을 해제합니다.</li>
          <li>로딩 메시지는 구체적일수록 사용자 불안감을 줄일 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
}
