import React, { useState } from 'react';
import SelectBox from '../components/common/SelectBox';
import InputBox from '../components/common/InputBox';
import DatePicker from '../components/common/DatePicker';
import CodeInput from '../components/common/CodeInput';
import RadioBox from '../components/common/RadioBox';
import CheckBox from '../components/common/CheckBox';
import Button from '../components/common/Button';

export default function ComponentDemo() {
  const [selectVal, setSelectVal] = useState('A');
  const [inputVal, setInputVal] = useState('');
  const [dateVal, setDateVal] = useState('');
  const [rangeVal, setRangeVal] = useState({ from: '', to: '' });
  const [codeVal, setCodeVal] = useState('');
  const [radioVal, setRadioVal] = useState('1');
  const [checkVal, setCheckVal] = useState(false);

  const options = [
    { value: 'ALL', label: '전체' },
    { value: 'A', label: '옵션 A' },
    { value: 'B', label: '옵션 B' },
    { value: 'NONE', label: '선택안함' },
  ];

  return (
    <div className="screen">
      <h2>공통 컴포넌트 데모</h2>
      <p style={{marginBottom: 24, color: '#666'}}>재사용 가능한 검색 조건 및 폼 컴포넌트 가이드</p>

      <section style={{marginBottom: 40}}>
        <h3>0. Button (Common Component)</h3>
        <div style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="search">Search</Button>
          <Button variant="reset">Reset</Button>
        </div>
        <div style={{display: 'flex', gap: 10, marginTop: 15}}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        <div style={{display: 'flex', gap: 10, marginTop: 15, alignItems: 'center'}}>
          <Button disabled={true}>Disabled</Button>
          <Button loading={true}>Loading</Button>
          <label><input type="checkbox" checked={checkVal} onChange={e=>setCheckVal(e.target.checked)} /> 연동 테스트용 체크박스</label>
          <Button disabled={checkVal}>상태 연동 버튼</Button>
        </div>
      </section>

      <section style={{marginBottom: 40}}>
        <h3>1. SelectBox (Custom Div)</h3>
        <SelectBox 
          label="상태" 
          options={options} 
          value={selectVal} 
          onChange={setSelectVal} 
        />
        <SelectBox 
          label="사이즈(SM)" 
          size="sm"
          options={options} 
          value={selectVal} 
          onChange={setSelectVal} 
          hasButton={true}
          buttonText="조회"
        />
      </section>

      <section style={{marginBottom: 40}}>
        <h3>2. InputBox</h3>
        <InputBox 
          label="사용자명" 
          value={inputVal} 
          onChange={setInputVal} 
          placeholder="이름을 입력하세요" 
        />
        <InputBox 
          label="검색어" 
          value={inputVal} 
          onChange={setInputVal} 
          hasButton={true}
          buttonText="검색"
          onButtonClick={() => alert('Searching: ' + inputVal)}
        />
      </section>

      <section style={{marginBottom: 40}}>
        <h3>3. DatePicker</h3>
        <DatePicker label="단일일자" value={dateVal} onChange={setDateVal} />
        <DatePicker label="기간선택" type="range" value={rangeVal} onChange={setRangeVal} />
        <DatePicker label="월선택" type="month" value={dateVal} onChange={setDateVal} />
      </section>

      <section style={{marginBottom: 40}}>
        <h3>4. CodeInput + Name</h3>
        <CodeInput 
          label="거래처" 
          code={codeVal} 
          name={codeVal === '1001' ? '삼성전자' : ''} 
          onCodeChange={setCodeVal}
          onSearchClick={() => alert('Search Popup!')}
        />
      </section>

      <section style={{marginBottom: 40}}>
        <h3>5. Radio & Checkbox</h3>
        <RadioBox 
          label="구분" 
          options={[
            {value: '1', label: '개인'},
            {value: '2', label: '법인'}
          ]} 
          value={radioVal} 
          onChange={setRadioVal} 
        />
        <CheckBox 
          label="사용여부" 
          text="활성화" 
          checked={checkVal} 
          onChange={setCheckVal} 
        />
      </section>
    </div>
  );
}
