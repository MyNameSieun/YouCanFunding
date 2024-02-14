import { auth, db } from '../firebase';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import React, { useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from 'components/common/Navbar';
import styled from 'styled-components';

function SignUp({ activeNavTab, setActiveNavTab }) {
  // 닉네임
  const [nickname, setNickname] = useState('');
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);
  const [isNicknameCheckButtonClicked, setIsNicknameCheckButtonClicked] = useState(false);
  const [isNicknameValidCondition, setIsNicknameValidCondition] = useState(true);
  const [isNicknameLengthValid, setIsNicknameLengthValid] = useState(true);

  // 이메일
  const [email, setEmail] = useState('');
  const [emailConfirmation, setEmailConfirmation] = useState('');
  const [isEmailMatching, setIsEmailMatching] = useState('true');
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  const [isEmailCheckButtonClicked, setIsEmailCheckButtonClicked] = useState(false);
  const [isEmailValidCondition, setIsEmailValidCondition] = useState(true);

  // 비밀번호
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isPasswordMatching, setIsPasswordMatching] = useState('true');
  const [isPasswordValidCondition, setIsPasswordValidCondition] = useState(true);
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(true);

  const navigate = useNavigate();

  // 닉네임
  const handleNicknameChange = (event) => {
    const newNickname = event.target.value;

    // 닉네임 유효성 검사
    // 닉네임 길이 검사
    const nicknameLengthValid = newNickname.length >= 2 && newNickname.length <= 10;

    // 닉네임 조건 검사
    const nicknameValidCondition = /^[a-zA-Z0-9가-힣]+$/.test(newNickname);

    setNickname(newNickname);
    setIsNicknameLengthValid(nicknameLengthValid);
    setIsNicknameValidCondition(nicknameValidCondition);
  };

  // 닉네임 중복 확인
  const handleNicknameCheckAvailability = async () => {
    try {
      const nicknameQuery = query(collection(db, 'users'), where('nickname', '==', nickname));
      const nicknameSnapshot = await getDocs(nicknameQuery);

      // 중복된 닉네임 존재 시 상태 업데이트
      setIsNicknameAvailable(nicknameSnapshot.empty);
      setIsNicknameCheckButtonClicked(true);
    } catch (error) {
      console.error('error checking nickname availability', error);
    }
  };

  // 닉네임 중복 버튼 활성화 여부
  const isNicknameCheckButtonEnabled = isNicknameLengthValid && isNicknameValidCondition;

  // 이메일
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;

    // 이메일 유효성 검사
    const emailValidCondition = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);

    setEmail(newEmail);
    setIsEmailValidCondition(emailValidCondition);
  };

  // 이메일 중복 확인
  const handleEmailCheckAvailability = async () => {
    try {
      const emailQuery = query(collection(db, 'users'), where('email', '==', email));
      const emailSnapshot = await getDocs(emailQuery);

      // 중복된 이메일 존재 시 상태 업데이트
      setIsEmailAvailable(emailSnapshot.empty);
      setIsEmailCheckButtonClicked(true);
    } catch (error) {
      console.error('error checking email availability', error);
    }
  };

  const handleEmailConfirmationChange = (event) => {
    setEmailConfirmation(event.target.value);
    // 이메일 일치 여부 검사
    setIsEmailMatching(event.target.value === email);
  };

  // 비밀번호
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;

    // 비밀번호 유효성 검사
    // 비밀번호 길이 검사
    const passwordLengthValid = newPassword.length >= 8 && newPassword.length <= 20;

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
    setIsPasswordLengthValid(passwordLengthValid);
    setIsPasswordValidCondition(passwordValidCondition);
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

      // 닉네임 길이에 대한 유효성 검사
      if (!isNicknameLengthValid) {
        alert('닉네임은 2글자 이상, 10글자 이하로 입력해 주세요.');
        return;
      }

      // 닉네임 조건에 대한 유효성 검사
      if (!isNicknameValidCondition) {
        alert('닉네임은 한글, 영문 대소문자, 숫자로만 작성해 주세요.');
      }

      // 이메일 중복 확인 여부 검사
      if (!isEmailCheckButtonClicked || !isEmailAvailable) {
        alert('이메일 주소 중복 확인을 해주세요.');
        return;
      }

      // 이메일 유효성 검사
      if (!isEmailValidCondition) {
        alert('유효하지 않은 이메일 형식입니다.');
        return;
      }

      // 비밀번호 길이에 대한 유효성 검사
      if (!isPasswordLengthValid) {
        alert('비밀번호는 8글자 이상, 20글자 이하로 입력해 주세요.');
        return;
      }

      // 비밀번호 복잡성 조건에 대한 유효성 검사
      if (!isPasswordValidCondition) {
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
      console.log('Error with signUp', errorCode, errorMessage);
    }
  };

  // 구글로 회원가입
  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider(); // provider를 구글로 설정
      provider.addScope('email');
      const userCredential = await signInWithPopup(auth, provider);
      console.log('userCredential', userCredential);

      const user = userCredential.user;
      console.log('user', user);
      const existingUserQuery = query(collection(db, 'users'), where('email', '==', user.email));
      const existingUserSnapshot = await getDocs(existingUserQuery);

      if (existingUserSnapshot.empty) {
        // 중복된 사용자가 없으면 사용자 정보 Firestore에 저장
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          nickname: user.displayName,
          email: user.email
        });

        console.log('user', user);

        alert('회원가입 및 로그인이 완료되었습니다.');
        navigate('/');
      } else {
        alert('이미 사용 중인 이메일 주소입니다.');
        await signOut(auth);
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorMessage.includes('already in use by an existing account')) {
        // 이미 가입된 이메일인 경우
        alert('이미 깃허브 계정으로 가입된 이메일 주소입니다.');
      } else {
        console.error('Error with Google signUp:', errorCode, errorMessage);
      }
    }
  };

  // 깃허브로 회원가입
  const handleGithubSignUp = async () => {
    try {
      const provider = new GithubAuthProvider(); // provider를 깃허브로 설정
      provider.addScope('user');
      const userCredential = await signInWithPopup(auth, provider);
      console.log(userCredential);

      const user = userCredential.user;
      console.log(user);
      const existingUserQuery = query(collection(db, 'users'), where('email', '==', user.email));
      const existingUserSnapshot = await getDocs(existingUserQuery);

      if (existingUserSnapshot.empty) {
        // 중복된 사용자가 없으면 사용자 정보 Firestore에 저장
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          nickname: user.displayName,
          email: user.email
        });

        console.log('user', user);

        alert('회원가입 및 로그인이 완료되었습니다.');
        navigate('/');
      } else {
        alert('이미 사용 중인 이메일 주소입니다.');
        await signOut(auth);
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorMessage.includes('already in use by an existing account')) {
        // 이미 가입된 이메일인 경우
        alert('이미 구글 계정으로 가입된 이메일 주소입니다.');
      } else {
        console.error('Error with Github signUp:', errorCode, errorMessage);
      }
    }
  };

  return (
    <>
      <Navbar activeNavTab={activeNavTab} setActiveNavTab={setActiveNavTab} />
      <Body>
        <SignUpContainer>
          <SignUpTitle>이메일로 회원가입</SignUpTitle>

          <SignUpToLogin>
            <p>이미 계정이 있으신가요? &nbsp;</p>
            <a href="/login"> 기존 계정으로 로그인 &gt;</a>
          </SignUpToLogin>

          <SignUpForm onSubmit={handleSignUp}>
            <SignUpInput>
              <label>닉네임</label>
              <br />
              <NicknameInput>
                <input
                  type="text"
                  value={nickname}
                  placeholder="닉네임을 입력해주세요."
                  required
                  onChange={handleNicknameChange}
                />
                <button
                  type="button"
                  onClick={handleNicknameCheckAvailability}
                  disabled={!isNicknameCheckButtonEnabled}
                >
                  중복 확인
                </button>
              </NicknameInput>
              {!isNicknameLengthValid && <p>닉네임은 2자 이상, 10자 이하로 입력해 주세요.</p>}
              {isNicknameLengthValid && !isNicknameValidCondition && (
                <p>한글, 영문 대소문자, 숫자로만 작성해 주세요.</p>
              )}
              {isNicknameCheckButtonClicked && (
                <>{isNicknameAvailable ? <p>사용 가능한 닉네임입니다.</p> : <p>이미 사용 중인 닉네임입니다.</p>}</>
              )}
              <br />
              <label>이메일 주소</label>
              <br />
              <EmailInput>
                <input
                  type="email"
                  value={email}
                  placeholder="이메일 주소를 입력해주세요."
                  required
                  onChange={handleEmailChange}
                />
                <button type="button" onClick={handleEmailCheckAvailability}>
                  중복 확인
                </button>
              </EmailInput>
              {!isEmailValidCondition && <p>유효하지 않은 이메일 형식입니다.</p>}
              {isEmailCheckButtonClicked && (
                <>
                  {isEmailAvailable ? <p>사용 가능한 이메일 주소입니다.</p> : <p>이미 사용 중인 이메일 주소입니다.</p>}
                </>
              )}
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
              {!isPasswordLengthValid && <p>비밀번호는 8자 이상, 20자 이하로 입력해 주세요.</p>}
              {isPasswordLengthValid && !isPasswordValidCondition && (
                <p>숫자, 영문 대소문자, 특수문자 중 2가지 이상을 조합해 주세요.</p>
              )}
              <input
                type="password"
                value={passwordConfirmation}
                placeholder="비밀번호를 확인합니다."
                required
                onChange={handlePasswordConfirmationChange}
              />
              {!isPasswordMatching && <p>비밀번호가 일치하지 않습니다.</p>}
            </SignUpInput>

            <SignUpButton type="submit">회원가입</SignUpButton>
          </SignUpForm>

          <SignUpWithOtherMethod>
            <SignUpWithOtherMethodPTag>
              <hr />
              <p>다른 방법으로 회원가입</p>
              <hr />
            </SignUpWithOtherMethodPTag>

            <SignUpWithOtherMethodButtonSet>
              <button onClick={handleGoogleSignUp}>구글로 회원가입</button>
              <button onClick={handleGithubSignUp}>깃허브로 회원가입</button>
            </SignUpWithOtherMethodButtonSet>
          </SignUpWithOtherMethod>
        </SignUpContainer>
      </Body>
    </>
  );
}

export default SignUp;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpContainer = styled.div`
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

const SignUpTitle = styled.h2`
  font-size: 24px;
  font-weight: 800;
`;

const SignUpToLogin = styled.div`
  display: flex;
  font-size: 13px;
  margin: 10px auto 10px 0px;

  & a {
    font-weight: 550;
    color: var(--main-color) !important;
  }
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 15px;
  font-weight: 500;
`;

const SignUpInput = styled.div`
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
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;
  }

  & button {
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: 550;
    background-color: rgb(228, 228, 228);
    color: black;
    border: 1.5px solid rgb(228, 228, 228);
    border-radius: 5px;
    width: 110px;
    height: 40px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: rgba(228, 228, 228, 0.514);
    }
  }

  & p {
    color: red;
    font-size: 12px;
    margin-bottom: 15px;
  }
`;

const NicknameInput = styled.div`
  display: flex;
`;

const EmailInput = styled.div`
  display: flex;
`;

const SignUpButton = styled.button`
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

const SignUpWithOtherMethod = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const SignUpWithOtherMethodPTag = styled.div`
  display: flex;

  & hr {
    margin-top: 20px;
    width: 90px;
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

const SignUpWithOtherMethodButtonSet = styled.div`
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
    transition: background-color 0.3s, color 0.3s;

    &:hover {
      background-color: rgb(228, 228, 228);
    }
  }
`;
