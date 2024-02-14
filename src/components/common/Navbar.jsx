import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { auth } from '../../firebase';
import { useEffect, useState } from 'react';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트 될 때 로그인 상태를 확인하고 업데이트
    const checkLoginStatus = () => {
      // 현재 로그인된 사용자 정보 가져오기
      const currentUser = auth.currentUser;
      setIsLoggedIn(!!currentUser); // 객체의 존재 여부를 부울 값으로 취급하고자 함
    };

    checkLoginStatus();

    // 로그인 상태를 주기적으로 확인하고 업데이트
    // auth.onAuthStateChanged : 사용자의 인증 상태가 변경될 때마다 콜백 함수를 호출
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // isLoggedIn 상태를 업데이트
    });

    return () => unsubscribe(); // cleanup 함수
  }, []); // 의존 배열을 빈 배열로 설정해 마운트 될 때 한 번만 실행되도록

  const handleLogout = () => {
    setIsLoggedOut(true);
  };

  const handleTabActivation = () => {
    setActiveNavTab('inProgress');
  };

  return (
    <NavContainer>
      <NavBar>
        <LeftNav>
          <Logo>
            <Link to="/main">
              <Tab activeNavTab={activeNavTab === 'inProgress'} onClick={() => setActiveNavTab('inProgress')}>
                유캔<ColorBlue>FUN</ColorBlue>딩
              </Tab>
            </Link>
          </Logo>
          <>
            <NavLink to="/main">
              <Tab activeNavTab={activeNavTab === 'scheduled'} onClick={() => setActiveNavTab('scheduled')}>
                펀딩 예정
              </Tab>
            </NavLink>
            <Link to="/main">
              <Tab activeNavTab={activeNavTab === 'completed'} onClick={() => setActiveNavTab('completed')}>
                펀딩 종료
              </Tab>
            </Link>
          </>
        </LeftNav>
        <RightNav>
          {isLoggedIn ? (
            <>
              {isLoggedOut ? (
                <>
                  {/* navlink 사용 */}
                  <AuthLink to={'/login'}>
                    <Tab>로그인</Tab>
                  </AuthLink>
                  <AuthLink to={'/signup'}>
                    <Tab>회원가입</Tab>
                  </AuthLink>
                </>
              ) : (
                <>
                  <Logout onLogout={handleLogout} />
                  <AuthLink to={'/mypage'}>
                    <Tab>마이페이지</Tab>
                  </AuthLink>
                </>
              )}
            </>
          ) : (
            <>
              <AuthLink to={'/login'}>
                <Tab activeNavTab={activeNavTab === 'login'} onClick={() => setActiveNavTab('login')}>
                  로그인
                </Tab>
              </AuthLink>
              <AuthLink to={'/signup'}>
                <Tab activeNavTab={activeNavTab === 'signup'} onClick={() => setActiveNavTab('signup')}>
                  회원가입
                </Tab>
              </AuthLink>
            </>
          )}
          <Link to={'/register'}>
            <Addbtn onClick={handleTabActivation}>프로젝트 등록</Addbtn>
          </Link>
        </RightNav>
      </NavBar>
    </NavContainer>
  );
}

export default Navbar;
