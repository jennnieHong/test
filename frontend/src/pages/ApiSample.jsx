import React, { useState } from 'react';
import Button from '../components/common/Button';
import SearchPanel from '../components/common/SearchPanel';
import InputBox from '../components/common/InputBox';

/**
 * ApiSample Component
 * Demonstrates the usage of Button loading/disabled states during API calls.
 */
export default function ApiSample() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ name: '', email: '' });
  const [response, setResponse] = useState(null);

  const handleSimulateApi = async () => {
    if (loading) return; // Prevent double clicks

    setLoading(true);
    setResponse(null);

    // Simulate API delay (2 seconds)
    setTimeout(() => {
      setLoading(false);
      setResponse({
        status: 'success',
        message: '데이터가 성공적으로 저장되었습니다.',
        timestamp: new Date().toLocaleTimeString()
      });
    }, 2000);
  };

  return (
    <div className="screen scrollable">
      <div className="page-header">
        <h2>API 연동 샘플 가이드</h2>
        <p>버튼의 <code>loading</code> 속성을 활용하여 API 요청 중 중복 클릭을 방지하고 사용자에게 피드백을 주는 방식입니다.</p>
      </div>

      <SearchPanel showButtons={false}>
        <InputBox 
          label="성명" 
          value={data.name} 
          onChange={(val) => setData({...data, name: val})} 
          placeholder="이름을 입력하세요"
        />
        <InputBox 
          label="이메일" 
          value={data.email} 
          onChange={(val) => setData({...data, email: val})} 
          placeholder="example@email.com"
        />
      </SearchPanel>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 20 }}>
        {/* API 연동 시 버튼 사용 예시 */}
        <Button 
          variant="primary" 
          size="lg" 
          loading={loading} 
          onClick={handleSimulateApi}
          style={{ minWidth: 150 }}
        >
          서버로 전송
        </Button>

        <Button 
          variant="outline" 
          size="lg" 
          disabled={loading}
          onClick={() => setData({ name: '', email: '' })}
        >
          내용 초기화
        </Button>
      </div>

      {loading && (
        <p style={{ marginTop: 20, color: 'var(--common-primary)', fontWeight: 'bold' }}>
          서버와 통신 중입니다... (버튼의 스피너를 확인하세요)
        </p>
      )}

      {response && (
        <div style={{ 
          marginTop: 24, 
          padding: 20, 
          background: '#f0fdf4', 
          border: '1px solid #bbf7d0', 
          borderRadius: 12,
          color: '#166534'
        }}>
          <h4>✅ 응답 결과</h4>
          <p>{response.message}</p>
          <small>수신 시간: {response.timestamp}</small>
        </div>
      )}

      <div style={{ marginTop: 40, padding: 20, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
        <h4>💡 주요 코드 가이드</h4>
        <pre style={{ background: '#1e293b', color: '#f8fafc', padding: 16, borderRadius: 8, overflowX: 'auto' }}>
{`// 1. 상태 정의
const [loading, setLoading] = useState(false);

// 2. 핸들러 작성
const handleApi = async () => {
    setLoading(true); // 통신 시작 시 true
    try {
        await api.post('/some-endpoint', data);
    } finally {
        setLoading(false); // 통신 종료 시 false (성공/실패 무관)
    }
};

// 3. 컴포넌트 적용
<Button loading={loading} onClick={handleApi}>
    저장하기
</Button>`}
        </pre>
      </div>
    </div>
  );
}
