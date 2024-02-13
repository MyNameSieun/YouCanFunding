import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { useState } from 'react';
import Logout from '../Logout';
const NavContainer = styled.div`
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 19px;
`;
const ColorBlue = styled.span`
  color: var(--main-color);
`;
const NavBar = styled.ul`
  display: flex;
  align-items: center;
  height: 120px;
  width: 100%;
  justify-content: space-between;
`;

const Logo = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin-right: 34px;
`;

const Tab = styled.span`
  cursor: pointer;
  margin-right: 24px;
  color: ${(props) => (props.activeNavTab ? 'black' : '#878f97')};
`;

const LeftNav = styled.li`
  font-size: 22px;
  font-weight: bold;
  text-decoration: none;

  & li {
    display: inline-block;
    margin-right: 30px;
  }
`;

const RightNav = styled.li`
  font-size: 17px;
  font-weight: 550;
`;
const AuthLink = styled(Link)`
  margin-right: 20px;
  color: #8d8d8d !important;
`;
const Addbtn = styled.span`
  color: white;
  background-color: #3867d6;
  padding: 15px 16px;
  border-radius: 9px;
  &:hover {
    background-color: #0056b3;
  }
`;
function Navbar({ activeNavTab, setActiveNavTab }) {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = () => {
    setIsLoggedOut(true);
  };

  // 현재 로그인된 사용자 정보 가져오기
  const currentUser = auth.currentUser;

  return (
    <NavContainer>
      <NavBar>
        <LeftNav>
          <Logo>
            <Link to="/main">
              <Tab>
                유캔<ColorBlue>FUN</ColorBlue>딩
              </Tab>
            </Link>
          </Logo>
          <>
            <Link to="/main">
              <Tab>펀딩 예정</Tab>
            </Link>
            <Link to="/main">
              <Tab>펀딩 종료</Tab>
            </Link>
          </>
        </LeftNav>
        <RightNav>
          {currentUser ? (
            <>
              {isLoggedOut ? (
                <>
                  <AuthLink to={'/login'}>
                    <span>로그인</span>
                  </AuthLink>
                  <AuthLink to={'/signup'}>
                    <span>회원가입</span>
                  </AuthLink>
                </>
              ) : (
                <>
                  <Logout onLogout={handleLogout} />
                  <AuthLink to={'/mypage'}>
                    <span>마이페이지</span>
                  </AuthLink>
                </>
              )}
            </>
          ) : (
            <>
              <AuthLink to={'/login'}>
                <span>로그인</span>
              </AuthLink>
              <AuthLink to={'/signup'}>
                <span>회원가입</span>
              </AuthLink>
            </>
          )}
          <Link to={'/register'}>
            <Addbtn>프로젝트 등록</Addbtn>
          </Link>
        </RightNav>
      </NavBar>
    </NavContainer>
  );
}

export default Navbar;
