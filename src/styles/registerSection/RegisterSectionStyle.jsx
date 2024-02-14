import styled, { css } from 'styled-components';

// 프로젝트 등록 Section (제목 + 실제 등록 section)
const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  gap: 30px;
`;

// 제목: '프로젝트를 생성하세요!!'
const RegisterSectionTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
`;

// 프로젝트 내용을 입력하는 실제 Section
const ProjectInfoListContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  gap: 20px;
`;

// 각 메뉴 section
const ProjectInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// 각 메뉴 제목
const ProjectInfoTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
`;

// 카테고리 section
const ProjectCategoryContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
`;

// 기간 메뉴 section
const ProjectFundingPeriodContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// 등록 버튼 section
const AddProjectButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// 카테고리 button
const ProjectCategoryButton = styled.button`
  margin: 0.5rem;
  padding: 10px;
  background-color: rgba(75, 123, 236, 0.3);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) => {
    if (props.$activeCategory === props.children) {
      return css`
        background-color: rgba(75, 123, 236, 0.8);
        font-weight: bold;
      `;
    }
  }}

  &:hover {
    background-color: rgba(75, 123, 236, 0.5);
    font-weight: bold;
    transform: scale(1.05);
  }
`;

// input 태그
const ProjectInfoInput = styled.input`
  width: 15rem;
  border: none;
  border-radius: 5px;
  padding: 10px;
`;

// textarea 태그
const ProjectInfoTextArea = styled.textarea`
  width: 20rem;
  height: 5rem;
  border: none;
  border-radius: 5px;
  padding: 10px;
  resize: none;
`;

// 등록 button
const AddProjectButton = styled.button`
  width: 180px;
  height: 50px;
  background-color: var(--main-color);
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(75, 123, 236, 0.5);
  }
`;

export {
  RegisterContainer,
  RegisterSectionTitle,
  ProjectInfoListContainer,
  ProjectInfoContainer,
  ProjectInfoTitle,
  ProjectCategoryContainer,
  ProjectCategoryButton,
  ProjectInfoInput,
  ProjectInfoTextArea,
  ProjectFundingPeriodContainer,
  AddProjectButtonContainer,
  AddProjectButton
};
