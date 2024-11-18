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