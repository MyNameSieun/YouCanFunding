import { auth, db } from '../firebase';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from 'components/common/Navbar';
import styled from 'styled-components';

function Login({ activeNavTab, setActiveNavTab }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 에러 메시지 상태 추가
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // 로그인
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // 현재 로그인된 사용자 정보 가져오기
      const currentUser = auth.currentUser;

      if (currentUser) {
        alert('이미 로그인되어 있습니다.');
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      alert('로그인 되었습니다.');
      navigate('/main');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error with login', errorCode, errorMessage);
      // 에러 메시지 표시
      setErrorMessage('이메일 주소 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.');
      setPassword('');
    }
  };

  // 비밀번호 찾기
  const handleForgotPassword = async () => {
    try {
      // 이메일이 비어있는지 확인
      if (!email) {
        setErrorMessage('이메일 주소를 입력해주세요.');
        return;
      }

      // 해당 이메일로 가입된 사용자의 정보 가져오기
      const signInMethod = await fetchSignInMethodsForEmail(auth, email);
      // 가입된 정보가 없는 경우 에러 메시지 표시
      if (signInMethod.length === 0) {
        setErrorMessage('존재하지 않는 이메일 주소입니다. 다시 확인해주세요.');
        return;
      }

      setIsLoading(true);

      await sendPasswordResetEmail(auth, email);
      alert('비밀번호 재설정 이메일이 전송되었습니다. 이메일을 확인해주세요.');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error with password reset', errorCode, errorMessage);

      // 이메일이 올바르지 않는 경우 에러 메시지 표시
      if (errorCode === 'auth/invalid-email') {
        setErrorMessage('이메일 형식이 올바르지 않습니다 .다시 확인해주세요.');
      } else {
        setErrorMessage('비밀번호 재설정 이메일을 전송하는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 구글로 로그인
  const handleGoogleLogin = async () => {
    try {
      // 현재 로그인된 사용자 정보 가져오기
      const currentUser = auth.currentUser;

      // 로그아웃 상태인 경우에만
      if (currentUser) {
        alert('이미 로그인되어 있습니다.');
        return;
      }

      const provider = new GoogleAuthProvider(); // provider를 구글로 설정
      const userCredential = await signInWithPopup(auth, provider);

      const user = userCredential.user;
      const existingUserQuery = query(collection(db, 'users'), where('email', '==', user.email));
      const existingUserSnapshot = await getDocs(existingUserQuery);

      if (existingUserSnapshot.empty) {
        // 중복된 사용자가 없으면 사용자 정보 Firestore에 저장
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          nickname: user.displayName,
          email: user.email
        });
      }

      console.log('user', userCredential.user);

      alert('로그인 되었습니다.');
      navigate('/main');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error with Google signUp:', errorCode, errorMessage);
    }
  };

  // 깃허브로 로그인
  const handleGithubLogin = async () => {
    try {
      // 현재 로그인된 사용자 정보 가져오기
      const currentUser = auth.currentUser;

      // 로그아웃 상태인 경우에만
      if (currentUser) {
        alert('이미 로그인되어 있습니다.');
        return;
      }

      const provider = new GithubAuthProvider(); // provider를 구글로 설정
      const userCredential = await signInWithPopup(auth, provider);

      const user = userCredential.user;
      const existingUserQuery = query(collection(db, 'users'), where('email', '==', user.email));
      const existingUserSnapshot = await getDocs(existingUserQuery);

      if (existingUserSnapshot.empty) {
        // 중복된 사용자가 없으면 사용자 정보 Firestore에 저장
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          nickname: user.displayName,
          email: user.email
        });
      }

      console.log('user', userCredential.user);

      alert('로그인 되었습니다.');
      navigate('/main');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error with Github signUp:', errorCode, errorMessage);
    }
  };

  return (
    <>
      <Navbar />
      <Body>
        <LoginContainer>
          <LoginTitle>이메일로 로그인</LoginTitle>

          <div>
            <LoginToSignUp>
              <p>아직 계정이 없으신가요? &nbsp;</p>
              <a href="/signup">회원가입 &gt;</a>
            </LoginToSignUp>
            <ResetPassword>
              <p>혹시 비밀번호를 잊으셨나요? </p>
              <button onClick={handleForgotPassword} disabled={isLoading}>
                비밀번호 재설정 &gt;
              </button>
            </ResetPassword>
          </div>

          <LoginForm onSubmit={handleLogin}>
            <LoginInput>
              <label>이메일 주소</label>
              <br />
              <input
                type="email"
                value={email}
                placeholder="이메일 주소를 입력해주세요."
                required
                onChange={handleEmailChange}
              />
              <br />
              <label>비밀번호</label>
              <br />
              <input
                type="password"
                value={password}
                placeholder="비밀번호를 입력해주세요."
                required
                onChange={handlePasswordChange}
              />
            </LoginInput>

            <LoginButton type="submit">로그인</LoginButton>
            {/* 에러 메시지 표서 */}
            {errorMessage && <LoginErrorMessage>{errorMessage}</LoginErrorMessage>}
          </LoginForm>

          <LoginWithOtherMethod>
            <LoginWithOtherMethodPTag>
              <hr />
              <p>다른 방법으로 로그인</p>
              <hr />
            </LoginWithOtherMethodPTag>

            <LoginWithOtherMethodButtonSet>
              <button onClick={handleGoogleLogin}>구글로 로그인</button>
              <button onClick={handleGithubLogin}>깃허브로 로그인</button>
            </LoginWithOtherMethodButtonSet>
          </LoginWithOtherMethod>
        </LoginContainer>
      </Body>
    </>
  );
}

export default Login;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  margin: 50px auto 70px auto;
  padding: 50px 35px;
  border: 1.5px solid rgb(228, 228, 228);
  border-radius: 5px;
  width: 350px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  font-size: 15px;
  font-weight: 500;
`;

const LoginTitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
`;

const LoginToSignUp = styled.div`
  display: flex;
  font-size: 13px;
  margin: 10px auto 7px 0px;

  & a {
    font-weight: 550;
    color: var(--main-color) !important;
  }
`;

const ResetPassword = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  margin: 7px auto 5px 0px;

  & button {
    border: transparent;
    background-color: transparent;
    font-weight: 550;
    color: var(--main-color);
    cursor: pointer;
  }
`;

const LoginInput = styled.div`
  display: flex;
  flex-direction: column;

  & label {
    font-weight: 600;
    font-size: 16px;
    margin-top: 10px;
  }

  & input {
    padding: 10px;
    font-size: 14px;
    border: 1px solid rgb(228, 228, 228);
    border-radius: 5px;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
`;

const LoginButton = styled.button`
  width: 350px;
  margin: 5px auto;
  padding: 13px;
  font-size: 18px;
  font-weight: 700;
  background-color: var(--main-color);
  color: white;
  border: 1.5px solid rgb(228, 228, 228);
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #274eff;
    color: white;
  }
`;

const LoginErrorMessage = styled.p`
  margin-bottom: 5px;
  color: red;
  font-size: 13px;
  line-height: 1.4;
`;

const LoginWithOtherMethod = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;

  & p {
    padding: 10px;
    margin: 5px auto 10px auto;
    font-size: 13px;
  }
`;

const LoginWithOtherMethodPTag = styled.div`
  display: flex;

  & hr {
    margin-top: 20px;
    width: 97px;
    height: 0px;
    border-top: 0.5px solid rgba(0, 0, 0, 0.479);
  }

  & p {
    padding: 10px;
    margin: 5px auto 10px auto;
    font-size: 13px;
    color: #555;
  }
`;

const LoginWithOtherMethodButtonSet = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 350px;

  & button {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 12px;
    border: 1.5px solid rgb(228, 228, 228);
    border-radius: 5px;
    font-size: 14px;
    font-weight: 550;
    cursor: pointer;

    &:hover {
      transition: background-color 0.3s, color 0.3s;
      background-color: rgb(228, 228, 228);
    }
  }
`;
