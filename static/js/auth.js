// 페이지 로드 시 로그인 상태 확인
document.addEventListener('DOMContentLoaded', () => {
    updateUIWithAuthStatus();
});

// 세션 상태 확인 함수 추가
async function checkLoginStatus() {
    try {
      const response = await fetch('/api/auth/status');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('세션 상태 확인 중 에러:', error);
      return { isLoggedIn: false, user: null };
    }
  }
  
  // 로그아웃 함수
async function logout() {
    try {
        const response = await fetch('/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || '로그아웃 실패');
        }

        return data;
    } catch (error) {
        console.error('로그아웃 에러:', error);
        throw error;
    }
}

  // UI 업데이트 함수
  async function updateUIWithAuthStatus() {
    const logoutBtn = document.getElementById('logoutBtn');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const mypageBtn = document.getElementById('mypageBtn');
    
    const { isLoggedIn, user } = await checkLoginStatus();
    
    if (isLoggedIn) {
    //   loginForm.style.display = 'none';
      logoutBtn.style.display = 'block';
    //   userInfo.value = `환영합니다, ${user.username}님!`;
      mypageBtn.style.display = 'block';
      loginBtn.style.display = 'none';
      signupBtn.style.display = 'none';
    } else {
      loginBtn.style.display = 'block';
      signupBtn.style.display = 'block';
      logoutBtn.style.display = 'none';
      mypageBtn.style.display = 'none';
    }

    logoutBtn.addEventListener('click', async () => {
        try {
            const result = await logout();
            alert(result.message || '로그아웃 성공');
            await updateUIWithAuthStatus();
            document.location.reload('/');
        } catch (error) {
            alert(error.message || '로그아웃 중 오류가 발생했습니다.');
        }
    });

    mypageBtn.addEventListener('click', async () => {
        const data = await fetch('/api/auth/userinfo',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }}
        );
        const userinfo = await data.json();
        window.location.href = '/mypage';
    });
  }
  

