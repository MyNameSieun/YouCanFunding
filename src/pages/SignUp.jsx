import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [nickname, setNickname] = useState('');
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);
  const [isNicknameCheckButtonClicked, setIsNicknameCheckButtonClicked] = useState(false);
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [isEmailMatching, setIsEmailMatching] = useState('true');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordMatching, setIsPasswordMatching] = useState('true');
  const navigate = useNavigate();

  // 닉네임
  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
    // 닉네임 유효성 검사
    // 특수문자 불가능, 글자 길이 제한
  };

  const handleNicknameCheckAvailability = async () => {
    try {
      // 닉네임 중복 확인
      const nicknameQuery = query(collection(db, 'users'), where('nickname', '==', nickname));
      const nicknameSnapshot = await getDocs(nicknameQuery);

      // 중복된 닉네임 존재 시 상태 업데이트
      setIsNicknameAvailable(nicknameSnapshot.empty);
      setIsNicknameCheckButtonClicked(true);
    } catch (error) {
      console.error('error checking nickname availability', error);
    }
  };

  // 이메일
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailConfirmationChange = (event) => {
    setEmailConfirmation(event.target.value);
    // 이메일 일치 여부 검사
    setIsEmailMatching(event.target.value === email);
  };

  // 비밀번호
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;

    // 비밀번호 조건 검사
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasDigit = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    // 조건 충족 여부 확인
    const passwordValidCondition =
      (hasUpperCase && hasLowerCase) ||
      (hasUpperCase && hasDigit) ||
      (hasUpperCase && hasSpecialChar) ||
      (hasLowerCase && hasDigit) ||
      (hasLowerCase && hasSpecialChar) ||
      (hasDigit && hasSpecialChar);

    setPassword(newPassword);
    setIsPasswordValid(passwordValidCondition);
  };

  const handlePasswordConfirmationChange = (event) => {
    const newPasswordConfirmation = event.target.value;
    // 비밀번호 일치 여부 검사
    setIsPasswordMatching(newPasswordConfirmation === password);
    setPasswordConfirmation(newPasswordConfirmation);
  };

  // 회원가입
  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      // 닉네임 중복 확인 여부 검사
      if (!isNicknameCheckButtonClicked || !isNicknameAvailable) {
        alert('닉네임 중복 확인을 해주세요.');
        return;
      }

      // 비밀번호 복잡성에 대한 유효성 검사
      if (!isPasswordValid) {
        alert('비밀번호는 숫자, 영문 대소문자, 특수문자 중 2가지 이상을 조합해 주세요.');
        return;
      }

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
      navigate('/login');
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
          <label>닉네임</label>
          <br />
          <input
            type="text"
            value={nickname}
            placeholder="닉네임을 입력해주세요."
            required
            onChange={handleNicknameChange}
          />
          <button type="button" onClick={handleNicknameCheckAvailability}>
            중복 확인
          </button>
          {isNicknameCheckButtonClicked && (
            <>{isNicknameAvailable ? <p>사용 가능한 닉네임입니다.</p> : <p>이미 사용 중인 닉네임입니다.</p>}</>
          )}

          <br />
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
          <input
            type="email"
            value={emailConfirmation}
            placeholder="이메일 주소를 확인합니다."
            required
            onChange={handleEmailConfirmationChange}
          />
          {!isEmailMatching && <p>이메일 주소가 일치하지 않습니다.</p>}
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
          <br />
          {!isPasswordValid && <p>숫자, 영문 대소문자, 특수문자 중 2가지 이상을 조합해 주세요.</p>}
          <br />
          <input
            type="password"
            value={passwordConfirmation}
            placeholder="비밀번호를 확인합니다."
            required
            onChange={handlePasswordConfirmationChange}
          />
          {!isPasswordMatching && <p>비밀번호가 일치하지 않습니다.</p>}
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
