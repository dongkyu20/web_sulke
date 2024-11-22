module.exports = function(app, session, isAuthenticated)
{
    app.get('/', function(req, res){
        res.render('template/index.html');
    })

    app.get('/signup', function(req, res){

        res.render('template/signup.html');
    })

    app.get('/login', function(req, res){
        res.render('template/login.html');
    })

    app.get('/projects', function(req, res){
        res.render('template/projects.html');
    })

    app.get('/projects', isAuthenticated, (req, res) => {
        // 예시
        const projects = [
            { id: 1, title: "Project A", description: "Description A" },
            { id: 2, title: "Project B", description: "Description B" },
            { id: 3, title: "Project C", description: "Description C" }
        ];
        
        res.render('template/projects.html', { projects });
    });
  

    app.get('/view_project', isAuthenticated, (req, res) => {
        // 예시
        const projectDetails = {
            id: 1,
            title: "Project A",
            description: "Detailed Description of Project A",
            createdAt: "2024-01-01",
            author: "User123"
        };

        res.render('template/view_project.html', { project: projectDetails });
    });

    app.get('/projects_plus', function(req, res){
        res.render('template/projects_plus.html');
    })

    app.get('/create_project', function(req, res){
        res.render('template/create_project.html');
    })

    app.get('/create_discussion', function(req, res){
        res.render('template/create_discussion.html');
    })

    app.get('/discussions', function(req, res){
        res.render('template/discussions.html');
    })

    app.get('/discussions', isAuthenticated, (req, res) => {
        // 예시 
        const discussions = [
            { id: 1, title: "Discussion A", author: "User1", createdAt: "2024-01-01" },
            { id: 2, title: "Discussion B", author: "User2", createdAt: "2024-01-02" },
            { id: 3, title: "Discussion C", author: "User3", createdAt: "2024-01-03" }
        ];
  
        res.render('template/discussions.html', { discussions });
    });
  

    app.get('/discussions_plus', function(req, res){
        res.render('template/discussions_plus.html');
    })

    app.get('/view_discussion', function(req, res){
        res.render('template/view_discussion.html');
    })

    app.get('/index', function(req, res){
      res.render('template/index.html');
  })

    app.get('/search', function(req, res){
      res.render('template/search.html');
    })

    app.get('/mypage', isAuthenticated, (req, res) => {
      const userinfo = req.session.user;
      res.render('template/mypage.html', {userinfo});
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
}