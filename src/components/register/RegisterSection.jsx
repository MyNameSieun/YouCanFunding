import React, { useEffect, useRef, useState } from 'react';
import {
  AddProjectButton,
  AddProjectButtonContainer,
  ProjectCategoryButton,
  ProjectCategoryContainer,
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
import { data } from 'components/common/categories';
import shortid from 'shortid';
import { db } from '../../firebase';
import { addDoc, collection } from 'firebase/firestore';

function RegisterSection() {
  // input 창 focus용 useRef
  // 제목
  const titleRef = useRef('');
  // 개요
  const summaryRef = useRef('');
  // 목표 금액
  const targetPriceRef = useRef('');
  // 시작일
  const startDateRef = useRef('');
  // 종료일
  const endDateRef = useRef('');
  // 내용
  const contentRef = useRef('');

  /* 상태(state) 리스트 */
  // 프로젝트 목록
  const [projects, setProject] = useState('');
  // 카테고리
  const [category, setCategory] = useState('');
  // 제목
  const [title, setTitle] = useState('');
  // 개요
  const [summary, setSummary] = useState('');
  // 목표 금액
  const [targetPrice, setTargetPrice] = useState(0);
  // 펀딩 시작일
  const [startDate, setStartDate] = useState('');
  // 펀딩 종료일
  const [endDate, setEndDate] = useState('');
  // 내용
  const [content, setContent] = useState('');

  /* onChange 함수 리스트 */
  // 카테고리
  const changeCategory = (event) => {
    event.preventDefault();
    // 버튼이 아닌 곳을 클릭한 경우 아무일도 발생하지 않도록 설정
    if (event.target === event.currentTarget) return;
    setCategory(event.target.innerText);
    // dispatch(selectCategory(event.target.innerText));
  };
  // 제목
  const changeTitle = (event) => {
    setTitle(event.target.value);
  };
  // 개요
  const changeSummary = (event) => {
    setSummary(event.target.value);
  };
  // 목표 금액
  const changeTargetPrice = (event) => {
    const rawValue = event.target.value;
    // 숫자외에는 입력이 되지 않도록 설정 & 입력한 금액에 ,를 추가
    const formattedValue = rawValue.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // 입력한 값을 string에서 number로 변경
    const resultValue = Number(formattedValue.replace(/,/g, ''));
    setTargetPrice(resultValue);
  };

  // 펀딩 시작일
  const changeStartDate = (event) => {
    setStartDate(event.target.value);
  };
  // 펀딩 종료일
  const changeEndDate = (event) => {
    setEndDate(event.target.value);
  };

  /* quill Settings */
  const modules = {
    toolbar: [
      [{ font: [] }, { size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'link', 'image']
    ]
  };

  const formats = [
    'size',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'align',
    'list',
    'bullet',
    'blockquote',
    'link',
    'image'
  ];

  const addProject = async (event) => {
    event.preventDefault();
    // 유효성 검사
    if (!category) {
      return alert('카테고리를 설정하지 않았습니다.');
    } else if (!title) {
      alert('제목을 입력하지 않았습니다.');
      return titleRef.current.focus();
    } else if (!summary) {
      alert('개요를 입력하지 않았습니다.');
      return summaryRef.current.focus();
    } else if (!targetPrice) {
      alert('목표 금액을 설정하지 않았습니다.');
      return targetPriceRef.current.focus();
    } else if (!startDate) {
      alert('시작일을 설정하지 않았습니다.');
      return startDateRef.current.focus();
    } else if (!endDate) {
      alert('종료일을 설정하지 않았습니다.');
      return endDateRef.current.focus();
    } else if (!content) {
      alert('내용이 입력되지 않았습니다.');
      return contentRef.current.focus();
    }
    // 유효성 검사 문제 없을 때 addDoc 수행
    else {
      // 새로운 항목 생성
      const newProject = {
        id: shortid.generate(),
        title,
        summary,
        targetPrice,
        startDate,
        endDate,
        content
      };

      // projects에 새로운 프로젝트 추가
      setProject((prev) => {
        return [...projects, newProject];
      });

      const collectionRef = collection(db, 'projects');
      // firebase db에 새로운 프로젝트 추가
      await addDoc(collectionRef, newProject);
      // 기존 입력창 초기화
      setCategory('');
      setTitle('');
      setSummary('');
      setTargetPrice(0);
      setStartDate('');
      setEndDate('');
      setContent('');
    }
  };

  return (
    <RegisterContainer>
      <RegisterSectionTitle>프로젝트를 생성하세요!!</RegisterSectionTitle>
      <ProjectInfoListContainer>
        {/* 카테고리 선택 메뉴 */}
        <ProjectInfoContainer>
          <ProjectInfoTitle>카테고리</ProjectInfoTitle>
          {/* 카테고리 */}
          <ProjectCategoryContainer value={category} onClick={changeCategory}>
            {data
              .filter((item) => item.category !== '전체')
              .map((item) => (
                <ProjectCategoryButton $activeCategory={category}>{item.category}</ProjectCategoryButton>
              ))}
          </ProjectCategoryContainer>
        </ProjectInfoContainer>
        {/* 제목 입력 메뉴 */}
        <ProjectInfoContainer>
          <ProjectInfoTitle>제목</ProjectInfoTitle>
          <ProjectInfoInput placeholder="제목을 입력하세요." ref={titleRef} value={title} onChange={changeTitle} />
        </ProjectInfoContainer>
        {/* 상품 개요 입력 메뉴 */}
        <ProjectInfoContainer>
          <ProjectInfoTitle>프로젝트 개요</ProjectInfoTitle>
          <ProjectInfoTextArea
            placeholder="개요를 입력하세요."
            ref={summaryRef}
            value={summary}
            onChange={changeSummary}
          />
        </ProjectInfoContainer>
        {/* 목표 금액 입력 메뉴 */}
        <ProjectInfoContainer>
          <ProjectInfoTitle>목표 금액</ProjectInfoTitle>
          <div>
            <ProjectInfoInput
              ref={targetPriceRef}
              value={targetPrice.toLocaleString('ko-KR')}
              onChange={changeTargetPrice}
            />{' '}
            원
          </div>
        </ProjectInfoContainer>
        {/* 펀딩 기간 설정 메뉴 */}
        <ProjectInfoContainer>
          <ProjectInfoTitle>펀딩 기간</ProjectInfoTitle>
          <ProjectFundingPeriodContainer>
            시작일 :{' '}
            <ProjectInfoInput
              type="date"
              max="2099-12-31"
              ref={startDateRef}
              value={startDate}
              onChange={changeStartDate}
            />
            종료일 :{' '}
            <ProjectInfoInput
              type="date"
              min={startDate}
              max="2099-12-31"
              ref={endDateRef}
              value={endDate}
              onChange={changeEndDate}
            />
          </ProjectFundingPeriodContainer>
        </ProjectInfoContainer>
        {/* 상세 내용 입력 메뉴 */}
        <ProjectInfoContainer>
          <ProjectInfoTitle>프로젝트 설명</ProjectInfoTitle>
          <ReactQuill
            id="id"
            className="form-control text-editor"
            style={{ backgroundColor: 'white' }}
            placeholder="내용을 입력하세요."
            modules={modules}
            formats={formats}
            value={content}
            ref={contentRef}
            onChange={setContent}
          />
        </ProjectInfoContainer>
      </ProjectInfoListContainer>
      <AddProjectButtonContainer>
        <AddProjectButton type="submit" onClick={addProject}>
          프로젝트 등록
        </AddProjectButton>
      </AddProjectButtonContainer>
    </RegisterContainer>
  );
}

export default RegisterSection;
