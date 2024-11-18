
const express = require('express');
const session = require('express-session');
const appRoot = require('app-root-path');
const bcrypt = require('bcrypt');
const app = express();
app.set('views', `${appRoot}`);
app.set('view engine', 'ejs');
const db = require('./db');

// 미들웨어 설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('html', require('ejs').renderFile);
app.use(express.static('static'));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // HTTPS를 사용하는 경우 true로 설정
    maxAge: 1000 * 60 * 60 * 24 // 24시간
  }
}));

// 로그인 여부 체크 미들웨어
const isAuthenticated = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
};


require('./routes')(app, session, isAuthenticated);

// 로그인 처리
app.post('/login/auth', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    } else {

    // 세션에 사용자 정보 저장
    req.session.isLoggedIn = true;
    req.session.user = {
      id: user.id,
      username: user.username
    };
      return res.json({ message: '로그인 성공' });
    }
  } catch (error) {
    console.error('로그인 에러:', error);
    res.status(500).json({ message: '서버 에러가 발생했습니다.' });
  }
});

// 로그아웃 처리
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: '로그아웃 처리 중 에러가 발생했습니다.' });
    }
    res.json({ message: '로그아웃 성공' });
  });
});

// 회원가입 처리
app.post('/signup/register', async (req, res) => {
    const { username, password } = req.body;
    
    try {
      // 이미 존재하는 사용자인지 확인
      const [existing] = await db.execute(
        'SELECT id FROM users WHERE username = ?',
        [username]
      );
  
      if (existing.length > 0) {
        return res.status(400).json({ message: '이미 존재하는 사용자명입니다.' });
      }
  
      // 비밀번호 해시화
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // 사용자 등록
      const [result] = await db.execute(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword]
      );
  
      res.status(201).json({ message: '회원가입 성공', userId: result.insertId });
    } catch (error) {
      console.error('회원가입 에러:', error);
      res.status(500).json({ message: '서버 에러가 발생했습니다.' });
    }
  });


// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행중입니다.`);
});