document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const data = await fetch('/login/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const result = await data.json();

        if (result.message === '로그인 성공') {
            await updateUIWithAuthStatus(); // 로그인 후 UI 업데이트
            alert(result.message);
            window.location.href = '/';
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('로그인 에러:', error);
        alert('로그인 처리 중 에러가 발생했습니다.');
    }
});