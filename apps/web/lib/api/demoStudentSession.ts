import { loginUser } from './authApi';

const DEFAULT_DEMO_STUDENT_EMAIL = 'student@test.com';
const DEFAULT_DEMO_STUDENT_PASSWORD = 'password123';

function getDemoStudentCredentials() {
  return {
    email: process.env.DEMO_STUDENT_EMAIL ?? DEFAULT_DEMO_STUDENT_EMAIL,
    password: process.env.DEMO_STUDENT_PASSWORD ?? DEFAULT_DEMO_STUDENT_PASSWORD,
  };
}

export async function getDemoStudentAccessToken() {
  const credentials = getDemoStudentCredentials();
  const response = await loginUser(credentials);

  return response.access_token;
}
