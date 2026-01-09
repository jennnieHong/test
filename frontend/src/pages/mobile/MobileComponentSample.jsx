import React, { useState } from 'react';
import SelectBox from '../../components/common/SelectBox';
import InputBox from '../../components/common/InputBox';
import DatePicker from '../../components/common/DatePicker';
import Button from '../../components/common/Button';
import SearchPanel from '../../components/common/SearchPanel';
import CheckBox from '../../components/common/CheckBox';
import RadioBox from '../../components/common/RadioBox';
import MobileCard from '../../components/common/MobileCard';

/**
 * MobileComponentSample Component
 * Shows how common components adapt to mobile layout.
 */
export default function MobileComponentSample() {
  const [filters, setFilters] = useState({
    type: 'ALL',
    keyword: '',
    date: '',
    confirm: false,
    option: '1'
  });

  const handleSearch = () => {
    alert('모바일 검색 시작: ' + JSON.stringify(filters));
  };

  return (
    <div className="p-4" style={{ paddingBottom: 80 }}>
      <div className="page-header" style={{ marginBottom: 20 }}>
        <h3 style={{ margin: 0 }}>모바일 공통 컴포넌트</h3>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
          컴퓨터와 동일한 컴포넌트를 모바일 환경에 최적화하여 사용합니다.
        </p>
      </div>

      {/* 모바일 최적화 검색 영역 */}
      <SearchPanel onSearch={handleSearch} onReset={() => setFilters({ type: 'ALL', keyword: '', date: '', confirm: false, option: '1' })}>
        <SelectBox 
          label="상태 구분" 
          options={[{value:'ALL', label:'전체'}, {value:'W', label:'대기'}, {value:'P', label:'진행'}]}
          value={filters.type}
          onChange={(val) => setFilters({...filters, type: val})}
        />
        <InputBox 
          label="검색어" 
          value={filters.keyword} 
          onChange={(val) => setFilters({...filters, keyword: val})}
          placeholder="검색어를 입력하세요"
        />
        <DatePicker 
          label="조회 일자" 
          value={filters.date} 
          onChange={(val) => setFilters({...filters, date: val})}
        />
      </SearchPanel>

      <section style={{ marginTop: 30 }}>
        <h4 style={{ marginBottom: 15, borderLeft: '4px solid #1565c0', paddingLeft: 10 }}>기타 입력 요소</h4>
        
        <MobileCard title="등록 정보 설정" headerAction={<span style={{fontSize:12, color:'#1565c0'}}>필수입력</span>}>
          <RadioBox 
            label="수신 설정" 
            options={[{value:'1', label:'SMS'}, {value:'2', label:'Email'}]}
            value={filters.option}
            onChange={(val) => setFilters({...filters, option: val})}
          />
          <div style={{ marginTop: 15 }}>
            <CheckBox 
              label="개인정보 승인" 
              text="동의함" 
              checked={filters.confirm}
              onChange={(val) => setFilters({...filters, confirm: val})}
            />
          </div>
        </MobileCard>
      </section>

      <div style={{ marginTop: 24 }}>
        <Button variant="primary" size="lg" style={{ width: '100%', height: 48 }}>
          저장하기
        </Button>
      </div>

      <div style={{ marginTop: 40, padding: 16, background: '#f8fafc', borderRadius: 12, fontSize: 13, color: '#475569' }}>
        <strong>💡 모바일 UI 가이드</strong>
        <ul style={{ paddingLeft: 18, marginTop: 8 }}>
          <li>모바일에서는 라벨을 입력창 위에 배치하여 가독성을 높입니다.</li>
          <li>버튼은 터치하기 쉽도록 높이(Height)를 충분히(48px 이상) 확보합니다.</li>
          <li>입력 필드는 화면 너비에 맞게 100%로 확장됩니다.</li>
        </ul>
      </div>
    </div>
  );
}
