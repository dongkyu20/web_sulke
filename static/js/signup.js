// 회원가입 폼 제출 처리
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('/signup/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        
        if (response.ok) {
            alert(data.message);
            // 회원가입 성공 시 입력 필드 초기화
            document.getElementById('registerForm').reset();
            window.location.href = '/login';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('회원가입 에러:', error);
        alert('회원가입 처리 중 에러가 발생했습니다.');
    }
});
