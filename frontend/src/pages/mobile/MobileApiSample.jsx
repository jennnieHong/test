import React, { useState } from 'react';
import Button from '../../components/common/Button';
import MobileCard from '../../components/common/MobileCard';
import InputBox from '../../components/common/InputBox';

export default function MobileApiSample() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ title: '', content: '' });
  const [status, setStatus] = useState(null);

  const handleSave = () => {
    if(!data.title) return alert('제목을 입력하세요.');
    
    setLoading(true);
    setStatus(null);

    // Simulate mobile API call
    setTimeout(() => {
      setLoading(false);
      setStatus('저장 완료!');
    }, 2000);
  };

  return (
    <div className="p-4">
      <div className="page-header" style={{ marginBottom: 20 }}>
        <h3 style={{ margin: 0 }}>모바일 API 연동</h3>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
          버튼의 로딩 상태를 활용한 모바일 처리 예시입니다.
        </p>
      </div>

      <MobileCard title="게시글 작성">
        <InputBox 
          label="제목" 
          value={data.title} 
          onChange={(val) => setData({...data, title: val})}
          placeholder="제목을 입력하세요"
        />
        <div style={{ marginTop: 15 }}>
          <label style={{ fontSize: 13, color: '#64748b', fontWeight: '600', display: 'block', marginBottom: 4 }}>내용</label>
          <textarea 
            style={{ 
              width: '100%', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0', minHeight: 120, fontSize: 14,
              outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit'
            }}
            value={data.content}
            onChange={(e) => setData({...data, content: e.target.value})}
            placeholder="내용을 입력하세요"
          />
        </div>
      </MobileCard>

      <div style={{ marginTop: 20 }}>
        <Button 
          variant="primary" 
          size="lg" 
          loading={loading} 
          style={{ width: '100%', height: 50 }}
          onClick={handleSave}
        >
          저장하기
        </Button>
      </div>

      {status && (
        <div style={{ marginTop: 20, textAlign: 'center', color: '#10b981', fontWeight: 'bold' }}>
          ✅ {status}
        </div>
      )}

      <div style={{ marginTop: 40, padding: 16, background: '#f0f9ff', borderRadius: 12, border: '1px solid #bae6fd' }}>
        <p style={{ margin: 0, fontSize: 13, color: '#0369a1', lineHeight: 1.5 }}>
          💡 모바일에서는 통신 중 <strong>중복 클릭 방지</strong>가 매우 중요합니다. <code>loading</code> 속성을 사용하면 버튼이 자동으로 비활성화되며 스피너가 표시되어 사용자 혼란을 줄입니다.
        </p>
      </div>
    </div>
  );
}
