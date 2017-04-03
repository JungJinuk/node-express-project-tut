var express = require('express');
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
var fortune = require('./lib/fortune');

var app = express();

//  public디렉토리 안에 들어 있는 것은 조건 없이 클라이언트에 보낸다.
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//  서버 정보 제공 안함
//app.disable('x-powered-by');

app.use((req, res, next) => {
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});


//  익스프레스의 기본 상태 코드는 200
//  익스프레스의 라우터는 정규화를 자동으로 처리한다.
//  route
app.get('/headers', (req, res) => {
  res.type('text/plain');
  var s = "";
  for (var name in req.headers) {
    s += name + ": " + req.headers[name] + "\n";
  }
  res.send(s);
});

var tours = [
  { id: 0, name: 'Hood River', price: 99.99 },
  { id: 1, name: 'Oregon Coast', price: 149.95 },
]

app.get('/api/tours', (req, res) => {
  res.format({'application/json': () => {
    res.json(tours);
  }});
});


app.get('/', (req, res) => {
  res.render('layouts/home');
});


//  about request headers
app.get('/about', (req, res) => {
  res.render('layouts/about', {
    fortune: fortune.getFortune(),
    pageTestScript: '/qa/tests-about.js'
   });
});

app.get('/tours/hood-river', (req, res) => {
  res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', (req, res) => {
  res.render('tours/request-group-rate');
});


//  app.use 는 익스프레스에서 미들웨어를 추가할 때 쓰는 메서드. 익스프레스에서는 라우트와 미들웨어를 추가하는 순서가 중요
//  custom 404 page
app.use((req, res) => {
  res.status(404);
  res.render('layouts/404');
});

//  custom 500 page
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('layouts/500');  //  한 줄로 쓰기 가능
});

app.listen(app.get('port'), () => {
  console.log("Express started on http://localhost:" + app.get('port'));
});