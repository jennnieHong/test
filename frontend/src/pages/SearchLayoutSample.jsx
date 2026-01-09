import React, { useState } from 'react';
import SearchPanel from '../components/common/SearchPanel';
import SelectBox from '../components/common/SelectBox';
import InputBox from '../components/common/InputBox';
import DatePicker from '../components/common/DatePicker';
import CodeInput from '../components/common/CodeInput';

export default function SearchLayoutSample() {
  const today = new Date().toISOString().split('T')[0];
  const [filters, setFilters] = useState({
    category: 'ALL',
    keyword: '',
    date: { from: today, to: today },
    userCode: '',
    userName: ''
  });

  const handleSearch = () => {
    console.log('Search Layout Sample:', filters);
    alert('SearchPanel을 통한 조회가 실행되었습니다.');
  };

  const handleReset = () => {
    setFilters({
      category: 'ALL',
      keyword: '',
      date: { from: today, to: today },
      userCode: '',
      userName: ''
    });
  };

  return (
    <div className="screen scrollable">
      <div className="page-header">
        <h2>레이아웃 공통화 샘플</h2>
        <p><code>SearchPanel</code> 컴포넌트를 사용하여 검색 영역의 레이아웃과 버튼을 표준화한 예시입니다.</p>
      </div>

      <div style={{marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8}}>
        <input type="checkbox" id="disableSearch" onChange={(e) => setFilters({...filters, searchDisabled: e.target.checked})} />
        <label htmlFor="disableSearch">조회 버튼 비활성화 테스트</label>
      </div>

      <SearchPanel onSearch={handleSearch} onReset={handleReset} searchDisabled={filters.searchDisabled}>
        <SelectBox 
          label="카테고리" 
          options={[{value:'ALL', label:'전체'}, {value:'PN', label:'공정'}, {value:'QC', label:'품질'}]}
          value={filters.category}
          onChange={(val) => setFilters({...filters, category: val})}
        />
        <DatePicker 
          label="작업일자" 
          type="range" 
          value={filters.date} 
          onChange={(val) => setFilters({...filters, date: val})} 
        />
        <CodeInput 
          label="담당자" 
          code={filters.userCode}
          name={filters.userCode === 'ADMIN' ? '관리자' : filters.userName}
          onCodeChange={(val) => setFilters({...filters, userCode: val})}
          onSearchClick={() => alert('사용자 팝업')}
        />
        <InputBox 
          label="비고" 
          placeholder="검색어 입력" 
          value={filters.keyword} 
          onChange={(val) => setFilters({...filters, keyword: val})} 
        />
      </SearchPanel>

      <div className="dummy-content" style={{
        marginTop: 40,
        height: 300,
        border: '2px dashed #cbd5e1',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#94a3b8'
      }}>
        데이터 그리드 영역
      </div>
    </div>
  );
}
