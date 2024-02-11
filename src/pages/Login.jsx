import Logout from 'components/common/Logout';
import { auth, db } from '../firebase';
import {
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

function Login() {
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

  return (
    <>
      <Navbar />ㅋ
      <div>
        <h2>이메일로 로그인</h2>
        <form onSubmit={handleLogin}>
          <div>
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
          </div>
          <button type="submit">로그인</button>
          {/* 에러 메시지 표서 */}
          {errorMessage && <p>{errorMessage}</p>}
        </form>
        <div>
          <p>다른 방법으로 로그인</p>
          <button onClick={handleGoogleLogin}>구글로 로그인</button>
          <button>애플로 로그인</button>
        </div>
        <div>
          <button onClick={handleForgotPassword} disabled={isLoading}>
            비밀번호 재설정
          </button>
        </div>
        <div>
          <p>아직 계정이 없으신가요?</p>
          <a href="/signup">회원가입</a>
        </div>
        <Logout />
      </div>
    </>
  );
}

export default Login;
