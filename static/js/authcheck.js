
// // 페이지 로드 시 로그인 상태 확인
// document.addEventListener('DOMContentLoaded', () => {
//     updateUIWithAuthStatus();
// });

// // 세션 상태 확인 함수 추가
// async function checkLoginStatus() {
//     try {
//       const response = await fetch('/api/auth/status');
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('세션 상태 확인 중 에러:', error);
//       return { isLoggedIn: false, user: null };
//     }
//   }
  
//   // UI 업데이트 함수
//   async function updateUIWithAuthStatus() {
//     const logoutBtn = document.getElementById('logoutBtn');
//     const loginBtn = document.getElementById('loginBtn');
//     const signupBtn = document.getElementById('signupBtn');
//     const userInfo = document.getElementById('userInfo');
    
//     const { isLoggedIn, user } = await checkLoginStatus();
    
//     if (isLoggedIn) {
//     //   loginForm.style.display = 'none';
//       logoutBtn.style.display = 'block';
//       userInfo.value = `환영합니다, ${user.username}님!`;
//       userInfo.style.display = 'block';
//       loginBtn.style.display = 'none';
//       signupBtn.style.display = 'none';
//     } else {
//       loginBtn.style.display = 'block';
//       signupBtn.style.display = 'block';
//       logoutBtn.style.display = 'none';
//       userInfo.style.display = 'none';
//     }
//   }
  
//   // 페이지 로드 시 상태 확인
//   document.addEventListener('DOMContentLoaded', () => {
//     updateUIWithAuthStatus();
//   });
  
// // 페이지 로드 시 로그인 상태 확인 실행
// checkLoginStatus();