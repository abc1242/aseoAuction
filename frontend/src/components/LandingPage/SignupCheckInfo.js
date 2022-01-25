export default function SignupCheckInfo(values) {
  let errors = {}  

  if (!values.email.trim()) {
    errors.email = '이메일을 입력해 주세요';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = '이메일을 확인해 주세요';
  }

  if (!values.password) {
    errors.password = '비밀번호를 입력해 주세요';
  } else if (values.password.length < 8) {
    errors.password = '비밀번호는 최소 8자 이상입니다.';
  }

  if (!values.password2) {
    errors.password2 = '비밀번호를 재입력해 주세요';
  } else if (values.password2 !== values.password) {
    errors.password2 = '비밀번호를 확인해 주세요';
  }

  if(!values.username) {
    errors.username = "닉네임을 확인해 주세요"
  }

  return errors;
}