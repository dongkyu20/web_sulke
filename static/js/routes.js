const db = require('./db');

module.exports = function (app, session, isAuthenticated) {
  app.get('/', function (req, res) {
      res.render('template/index.html');
  });

  app.get('/signup', function (req, res) {
      res.render('template/signup.html');
  });

  app.get('/login', function (req, res) {
      res.render('template/login.html');
  });

  app.get('/projects', isAuthenticated, async (req, res) => {
      try {
          const [projects] = await db.execute("SELECT * FROM posts ORDER BY created_at DESC");
          res.render('template/projects.html', { projects });
      } catch (error) {
          console.error("프로젝트 목록을 가져오는 중 에러:", error);
          res.status(500).send("서버 에러");
      }
  });


  app.get('/view_project', isAuthenticated, (req, res) => {
      const projectDetails = {
          id: 1,
          title: "Project A",
          description: "Detailed Description of Project A",
          created_at: "2024-01-01", 
          username: "User123"
      };

      res.render('template/view_project.html', { project: projectDetails });
  });

  app.get('/projects_plus', isAuthenticated, async (req, res) => {
      try {
          const [projects] = await db.execute("SELECT * FROM post ORDER BY created_at DESC");
          res.render('template/projects_plus.html', { projects });
      } catch (error) {
          console.error("프로젝트 목록을 가져오는 중 에러:", error);
          res.status(500).send("서버 에러");
      }
  });

  app.post('/create_project', isAuthenticated, async (req, res) => {
    const { title, content, techFilter, fieldFilter } = req.body;
    const username = req.session.user.username; // 세션에서 사용자 정보 가져오기
    const user_id = req.session.user.id;

      try {
          await db.execute(
              "INSERT INTO post (title, content, category, tags, username, user_id) VALUES (?, ?, ?, ?, ?, ?)",
              [title, content, fieldFilter, techFilter, username, user_id]
          );
          res.redirect('/projects_plus');
      } catch (error) {
          console.error("프로젝트 생성 중 에러:", error);
          res.status(500).send("서버 에러");
      }
  });

  app.get('/create_discussion', function (req, res) {
      res.render('template/create_discussion.html');
  });

  app.get('/discussions', isAuthenticated, (req, res) => {
      const discussions = [
          { id: 1, title: "Discussion A", username: "User1", created_at: "2024-01-01" },
          { id: 2, title: "Discussion B", username: "User2", created_at: "2024-01-02" },
          { id: 3, title: "Discussion C", username: "User3", created_at: "2024-01-03" }
      ];

      res.render('template/discussions.html', { discussions });
  });

  app.get('/discussions_plus', function (req, res) {
      res.render('template/discussions_plus.html');
  });

  app.get('/view_discussion', function (req, res) {
      res.render('template/view_discussion.html');
  });

  app.get('/index', function (req, res) {
      res.render('template/index.html');
  });

  app.get('/search', function (req, res) {
      res.render('template/search.html');
  });

  app.get('/mypage', isAuthenticated, (req, res) => {
      const userinfo = req.session.user;
      res.render('template/mypage.html', { userinfo });
  });

  app.post('/api/auth/userinfo', isAuthenticated, (req, res) => {
      if (req.session.isLoggedIn) {
          res.json(req.session.user);
      } else {
          res.status(401).json({ message: '사용자를 찾을 수 없습니다.' });
      }
  });

  app.get('/api/auth/status', (req, res) => {
      if (req.session.isLoggedIn) {
          res.json({
              isLoggedIn: true,
              user: {
                  id: req.session.user.id,
                  username: req.session.user.username
              }
          });
      } else {
          res.json({
              isLoggedIn: false,
              user: null
          });
      }
  });

//   // 로그인을 처리하는 라우트 추가
//   app.post('/login/auth', async (req, res) => {
//       const { username, password } = req.body;

//       // 테스트용
//       if (username === "testUser" && password === "password123") {
//           req.session.isLoggedIn = true;
//           req.session.user = { id: 1, username };
//           res.json({ message: '로그인 성공' });
//       } else {
//           res.json({ message: '로그인 실패' });
//       }
//   });
}
