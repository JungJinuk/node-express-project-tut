var express = require('express');
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
var fortune = require('./lib/fortune');

var app = express();

//  public디렉토리 안에 들어 있는 것은 조건 없이 클라이언트에 보낸다.
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);
app.set('views', './views/layouts');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


//  익스프레스의 기본 상태 코드는 200
//  익스프레스의 라우터는 정규화를 자동으로 처리한다.
//  route
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about', { fortune: fortune.getFortune() });
});


//  app.use 는 익스프레스에서 미들웨어를 추가할 때 쓰는 메서드. 익스프레스에서는 라우트와 미들웨어를 추가하는 순서가 중요
//  custom 404 page
app.use((req, res) => {
  res.status(404);
  res.render('404');
});

//  custom 500 page
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), () => {
  console.log("Express started on http://localhost:" + app.get('port'));
});