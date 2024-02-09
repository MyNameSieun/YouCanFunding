import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      setEmail('');
      setPassword('');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error with login', errorCode, errorMessage);
    }
  };

  return (
    <div>
      <h2>로그인 페이지</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input type="email" value={email} placeholder="이메일" required onChange={handleEmailChange} />
          <br />
          <input type="password" value={password} placeholder="비밀번호" required onChange={handlePasswordChange} />
        </div>
        <button type="submit">로그인</button>
      </form>
      <div>
        {/* <a>회원가입</a>
          <a>아이디 찾기</a>
          <a>비밀번호 찾기</a> */}
      </div>
      <div>
        <p>다른 방법으로 로그인</p>
        <button>구글로 로그인</button>
        <button>애플로 로그인</button>
      </div>
    </div>
  );
}

export default Login;
