import Logout from 'components/common/Logout';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 에러 메시지 상태 추가
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
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

  return (
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
        {/*<a>아이디 찾기</a>
          <a>비밀번호 찾기</a> */}
      </div>
      <div>
        <p>다른 방법으로 로그인</p>
        <button>구글로 로그인</button>
        <button>애플로 로그인</button>
      </div>
      <div>
        <p>아직 계정이 없으신가요?</p>
        <a href="/signup">회원가입</a>
      </div>
      <Logout />
    </div>
  );
}

export default Login;
