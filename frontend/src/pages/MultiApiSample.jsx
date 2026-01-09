import React, { useState } from 'react';
import LoadingOverlay from '../components/common/LoadingOverlay';
import Button from '../components/common/Button';

export default function MultiApiSample() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  // Simulate multiple API calls
  const fetchData = async () => {
    setLoading(true);
    setResults([]);

    // Simulate 3 concurrent API calls with different delays
    const api1 = new Promise((resolve) => setTimeout(() => resolve('마스터 데이터 로드 완료'), 1500));
    const api2 = new Promise((resolve) => setTimeout(() => resolve('사용자 권한 확인 완료'), 2500));
    const api3 = new Promise((resolve) => setTimeout(() => resolve('시스템 설정 동기화 완료'), 1000));

    try {
      const responses = await Promise.all([api1, api2, api3]);
      setResults(responses);
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen scrollable">
      {/* 전역 로딩 오버레이 */}
      <LoadingOverlay show={loading} message="대용량 데이터를 처리하고 있습니다..." />

      <div className="page-header">
        <h2>다중 API 연동 샘플</h2>
        <p>여러 개의 독립된 API를 호출할 때 <code>Promise.all</code>과 전역 로딩 바를 결합하여 처리하는 방식입니다.</p>
      </div>

      <div style={{ background: '#f8fafc', padding: 24, borderRadius: 12, border: '1px solid #e2e8f0', marginBottom: 24 }}>
        <h4>📌 시나리오</h4>
        <ul style={{ color: '#475569', lineHeight: 1.6 }}>
          <li>한 화면 진입 시 마스터 코드, 사용자 정보, 공지사항 등 3건 이상의 데이터를 동시에 가져와야 하는 경우</li>
          <li>모든 데이터가 완벽히 로드되기 전까지 화면 조작을 막고자 할 때 사용</li>
        </ul>
        
        <div style={{ marginTop: 20 }}>
          <Button variant="primary" size="lg" onClick={fetchData} disabled={loading}>
            다중 데이터 요청 시작
          </Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ 
            padding: 20, 
            background: 'white', 
            borderRadius: 12, 
            border: '1px solid #e2e8f0',
            minHeight: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: results[i-1] ? '#1565c0' : '#94a3b8',
            fontWeight: results[i-1] ? '600' : '400'
          }}>
            {results[i-1] || `API ${i} 대기 중...`}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40, padding: 20, background: '#1e293b', borderRadius: 12 }}>
        <h4 style={{ color: '#94a3b8', marginBottom: 16 }}>💡 Implementation Logic</h4>
        <pre style={{ color: '#f8fafc', fontSize: 13, lineHeight: '1.5' }}>
{`const fetchData = async () => {
  setLoading(true); // 1. 전역 로딩 시작
  
  try {
    // 2. 여러 API를 병렬로 실행
    const [res1, res2, res3] = await Promise.all([
      fetch('/api/master'),
      fetch('/api/user'),
      fetch('/api/settings')
    ]);
    
    // 3. 결과 처리
    setData({ res1, res2, res3 });
  } finally {
    setLoading(false); // 4. 모든 요청이 끝나면 로딩 종료
  }
};`}
        </pre>
      </div>
    </div>
  );
}
