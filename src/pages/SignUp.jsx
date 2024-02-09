import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [nicknameError, setNicknameError] = useState('');
  const navigate = useNavigate();

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
    // 닉네임 유효성 검사
    // 특수문자 불가능, 글자 길이 제한
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // 이메일 유효성 검사
    // 이메일 형식
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // const handleConfirmPasswordChange = (event) => {
  //   setConfirmPassword(event.target.value);
  // };

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      // Firebase Authentication으로 회원가입
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // 사용자의 UID 가져오기
      const userId = userCredential.user.uid;

      // 사용자 정보 Firestore에 저장
      await addDoc(collection(db, 'users'), {
        uid: userId,
        nickname,
        email
      });

      console.log('user', userCredential.user);

      alert('회원가입이 완료되었습니다.');
      navigate('/main');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      //  switch (error.code) {
      //   case 'auth/invalid-email':
      //   case 'auth/email-already-in-use':
      //     setEmailError(error.message);
      //     break;
      //   case 'auth/weak-password':
      //     setPasswordError(error.message);
      //     break;
      //   default:
      //     // Handle other errors
      //     break;
      // }
      console.log('error with signUp', errorCode, errorMessage);
    }
  };

  return (
    <div>
      <h2>이메일로 회원가입</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <input
            type="text"
            value={nickname}
            placeholder="닉네임을 입력해주세요."
            required
            onChange={handleNicknameChange}
          />
          <br />
          <input
            type="email"
            value={email}
            placeholder="이메일 주소를 입력해주세요."
            required
            onChange={handleEmailChange}
          />
          <br />
          <input
            type="password"
            value={password}
            placeholder="비밀번호를 입력해주세요."
            required
            onChange={handlePasswordChange}
          />
          <br />
          {/* <input
            type="password"
            value={confirmPassword}
            placeholder="비밀번호 확인"
            required
            onChange={handleConfirmPasswordChange}
          /> */}
        </div>

        <button type="submit">회원가입</button>
      </form>
      <div>
        <p>다른 방법으로 회원가입</p>
        <button>구글로 회원가입</button>
        <button>애플로 회원가입</button>
      </div>
      <div>
        <p>이미 계정이 있으신가요?</p>
        <a href="/login">기존 계정으로 로그인하기</a>
      </div>
    </div>
  );
}

export default SignUp;
