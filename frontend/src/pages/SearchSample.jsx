import React, { useState } from 'react';
import SelectBox from '../components/common/SelectBox';
import InputBox from '../components/common/InputBox';
import DatePicker from '../components/common/DatePicker';
import CodeInput from '../components/common/CodeInput';
import RadioBox from '../components/common/RadioBox';
import CheckBox from '../components/common/CheckBox';

/**
 * SearchSample Component
 * A realistic example of a search filter bar in a business application.
 */
export default function SearchSample() {
  const today = new Date().toISOString().split('T')[0];
  
  const [filters, setFilters] = useState({
    status: 'ACTIVE',
    keyword: '',
    period: { from: today, to: today },
    customerCode: '',
    customerName: '',
    type: 'ALL',
    useYn: true
  });

  const statusOptions = [
    { value: 'ALL', label: '전체' },
    { value: 'ACTIVE', label: '사용중' },
    { value: 'STOP', label: '중지' },
    { value: 'DELETE', label: '삭제' }
  ];

  const handleSearch = () => {
    console.log('Searching with filters:', filters);
    alert('조회 조건이 콘솔에 출력되었습니다.');
  };

  const handleReset = () => {
    setFilters({
      status: 'ALL',
      keyword: '',
      period: { from: '', to: '' },
      customerCode: '',
      customerName: '',
      type: 'ALL',
      useYn: true
    });
  };

  return (
    <div className="screen scrollable">
      <div className="page-header">
        <h2>실무형 활용 예시 (검색 가이드)</h2>
        <p>공통 컴포넌트를 조합하여 구성한 실제 업무 화면 구성 예시입니다.</p>
      </div>

      {/* 실무형 검색 필터 영역 */}
      <div style={{
        background: '#f8fafc',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        marginBottom: '24px'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '16px' 
        }}>
          {/* 상단 라인 */}
          <SelectBox 
            label="조회상태" 
            options={statusOptions} 
            value={filters.status} 
            onChange={(val) => setFilters({...filters, status: val})} 
          />
          <DatePicker 
            label="조회기간" 
            type="range" 
            value={filters.period} 
            onChange={(val) => setFilters({...filters, period: val})} 
          />
          <CodeInput 
            label="거래처" 
            code={filters.customerCode} 
            name={filters.customerCode === '1001' ? '삼성전자(주)' : filters.customerName}
            onCodeChange={(val) => setFilters({...filters, customerCode: val})}
            onSearchClick={() => alert('거래처 검색 팝업 오픈')}
          />

          {/* 하단 라인 */}
          <InputBox 
            label="검색어" 
            value={filters.keyword} 
            onChange={(val) => setFilters({...filters, keyword: val})} 
            placeholder="품목명, 품목코드 입력..."
            hasButton={true}
            buttonText="초기화"
            onButtonClick={() => setFilters({...filters, keyword: ''})}
          />
          <RadioBox 
            label="구분" 
            options={[{value:'ALL', label:'전체'}, {value:'A', label:'입고'}, {value:'B', label:'출고'}]}
            value={filters.type}
            onChange={(val) => setFilters({...filters, type: val})}
          />
          <CheckBox 
            label="사용여부" 
            text="미사용 포함" 
            checked={filters.useYn} 
            onChange={(val) => setFilters({...filters, useYn: val})} 
          />
        </div>

        {/* 버튼 영역 */}
        <div style={{ 
          marginTop: '20px', 
          paddingTop: '16px', 
          borderTop: '1px dashed #e2e8f0', 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '8px' 
        }}>
          <button className="common-btn" onClick={handleReset} style={{ minWidth: '100px' }}>초기화</button>
          <button className="common-btn" onClick={handleSearch} style={{ 
            minWidth: '100px', 
            background: 'var(--common-primary)', 
            color: 'white', 
            borderColor: 'var(--common-primary)' 
          }}>조회</button>
        </div>
      </div>

      {/* 결과 테이블 예시 */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead style={{ background: '#f1f5f9' }}>
            <tr>
              <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>번호</th>
              <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>품목코드</th>
              <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>품목명</th>
              <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>규격</th>
              <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>단위</th>
              <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>현재고</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3,4,5].map(i => (
              <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px' }}>{i}</td>
                <td style={{ padding: '12px 16px' }}>ITEM-00{i}</td>
                <td style={{ padding: '12px 16px' }}>테스트 품목 {i}</td>
                <td style={{ padding: '12px 16px' }}>100*100*50</td>
                <td style={{ padding: '12px 16px' }}>EA</td>
                <td style={{ padding: '12px 16px' }}>{i * 10}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
