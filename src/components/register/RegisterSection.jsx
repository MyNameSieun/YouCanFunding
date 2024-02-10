import React, { useState } from 'react';
import {
  ProjectFundingPeriodContainer,
  ProjectInfoContainer,
  ProjectInfoInput,
  ProjectInfoListContainer,
  ProjectInfoTextArea,
  ProjectInfoTitle,
  RegisterContainer,
  RegisterSectionTitle
} from 'styles/registerSection/RegisterSectionStyle';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function RegisterSection() {
  // 목표 금액
  const [targetPrice, setTargetPrice] = useState(0);
  // 펀딩 시작일
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // 입력한 금액에 ,를 추가하는 함수
  const changeTargetPrice = (event) => {
    const rawValue = event.target.value;
    // 숫자외에는 입력이 되지 않도록 설정
    const formattedValue = rawValue.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const resultValue = Number(formattedValue.replace(/,/g, ''));
    setTargetPrice(resultValue);
  };

  const changeStartDate = (event) => {
    console.log(event.target);
    console.log(event.target.value);
    console.log(typeof event.target.value);
    setStartDate(event.target.value);
  };
  const changeEndDate = (event) => {
    console.log(event.target);
    console.log(event.target.value);
    console.log(typeof event.target.value);
    setEndDate(event.target.value);
  };

  return (
    <RegisterContainer>
      <RegisterSectionTitle>프로젝트를 생성하세요!!</RegisterSectionTitle>
      <ProjectInfoListContainer>
        {/* 카테고리 선택 메뉴 */}
        <ProjectInfoContainer>
          <ProjectInfoTitle>카테고리</ProjectInfoTitle>
          카테고리 버튼 리스트
        </ProjectInfoContainer>
        {/* 제목 입력 메뉴 */}
        <ProjectInfoContainer>
          <ProjectInfoTitle>제목</ProjectInfoTitle>
          <ProjectInfoInput placeholder="제목을 입력하세요." />
        </ProjectInfoContainer>
        {/* 상품 개요 입력 메뉴 */}
        <ProjectInfoContainer>
          <ProjectInfoTitle>상품 개요</ProjectInfoTitle>
          <ProjectInfoTextArea placeholder="개요를 입력하세요." />
        </ProjectInfoContainer>
        {/* 목표 금액 입력 메뉴 */}
        <ProjectInfoContainer>
          <ProjectInfoTitle>목표 금액</ProjectInfoTitle>
          <div>
            <ProjectInfoInput value={targetPrice.toLocaleString('ko-KR')} onChange={changeTargetPrice} /> 원
          </div>
        </ProjectInfoContainer>
        {/* 펀딩 기간 설정 메뉴 */}
        <ProjectInfoContainer>
          <ProjectInfoTitle>펀딩 기간</ProjectInfoTitle>
          <ProjectFundingPeriodContainer>
            시작일 : <ProjectInfoInput type="date" value={startDate} onChange={changeStartDate} />
            종료일 : <ProjectInfoInput type="date" value={endDate} onChange={changeEndDate} />
          </ProjectFundingPeriodContainer>
        </ProjectInfoContainer>
        {/* 상세 설명 입력 메뉴 */}
        <ProjectInfoContainer>
          <ProjectInfoTitle>상세 설명</ProjectInfoTitle>
          <ReactQuill />
        </ProjectInfoContainer>
      </ProjectInfoListContainer>
    </RegisterContainer>
  );
}

export default RegisterSection;
