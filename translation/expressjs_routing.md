# ExpressJS - Routing

웹 프레임워크는 HTML 페이지, 스크립트, 이미지 등과 같은 리소스를 다른 경로에서 제공합니다. 아래 함수는 express 애플리케이션 내 경로를 정의합니다.

### `app.METHOD(PATH, HANDLER)`
* 메소드(METHOD)는 HTTP 동사 (get, set, put, delete) 중 하나입니다. 이외에  요청 타입과 별도로 실행되는 `all`라는 대체 메소드가 있습니다.

* 경로(Path)는 요청이 실행되는 경로입니다.

* 핸들러(Handler)는 해당 경로에서 일치하는 요청 유형이 발견되면 실행되는 콜백 함수입니다.

아래 코드를 살펴봅시다. 
```javascript
var express = require('express');
var app = express();

app.get('/hello', function(req, res){
	res.send("Hello World!");
});

app.listen(3000);
```
애플리케이션을 실행시키고 `localhost:3000/hello`로 접속하면, 서버는 "/ hello" 경로에서 get 요청을 수신하고 express 앱은 이 경로에 할당된 콜백 함수를 실행하여 "Hello World!"를 보냅니다.

[<img src="https://www.tutorialspoint.com/expressjs/images/routing_hello.jpg">](https://www.tutorialspoint.com/expressjs/images/routing_hello.jpg)

아래와 같이 동일한 경로에서 여러 다른 방법을 사용할 수 있습니다. 

```javascript
var express = require('express');
var app = express();

app.get('/hello', function(req, res){
	res.send("Hello World!");
});

app.post('/hello', function(req, res){
	res.send("You just called the post method at '/hello'!\n");
});

app.listen(3000);
```

요청을 테스트하기 위해, 터미널을 열고 cURL을 사용해 아래 요청 명령어를 실행하세요.

```
curl -X POST "http://localhost:3000/hello"Curl request
```
`all`은 동일한 기능을 사용하는 특정 라우트에서 모든 유형의 http 메소드를 처리할 수 있습니다. 아래와 같이 사용할 수 있습니다. :

```javascript
app.all('/test', function(req, res){
	res.send("HTTP method doesn't have any effect on this route!");
});
```

이 방법은 미들웨어를 정의할 때 주로 사용되기 때문에, 미들웨어 부분에서 자세히 다루도록 하겠습니다.

## 라우터(Routers)
라우터 유지 관리는 매우 번거롭습니다. index.js 파일에서 express.Router를 사용해 라우터와 분리할 수 있습니다.. things.js라는 새 파일을 만들고 그 안에 아래 코드를 입력하세요.

```javascript
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.send('GET route on things.');
});
router.post('/', function(req, res){
	res.send('POST route on things.');
});
//index.js로 라우터를 보냄
module.exports = router;
```

이제 index.js에서 이 라우터를 사용하려면 app.listen 함수 호출 전에 다음을 입력하십시오.
```javascript
var express = require('express');
var app = express();

var things = require('./things.js'); 
//index.js 와 things.js 는 같은 경로에 있어야 합니다.
app.use('/things', things); 

app.listen(3000);
```
app.use 함수는 `/things` 라우터를 호출해 이 라우터에 해당 경로를 연결합니다. 이제 앱이 `/things`에 도착하는 요청은, `things/js` 라우터에 의해 처리됩니다. things.js의 `/`경로는 실제로 `/ things`의 서브루틴 입니다. `localhost:3000/things/`에 접속하면 아래 화면이 나올 것 입니다.


[<img src="https://www.tutorialspoint.com/expressjs/images/router_things.jpg">](https://www.tutorialspoint.com/expressjs/images/router_things.jpg)

라우터는 유의할 코드 부분을 별도로 분리하여 유지 보수 가능한 코드를 작성할 수 있게 해줍니다. 한 파일에 라우터를 정의한 후, 메소드를 사용해 index.js 파일에 포함시키세요.

용어 정리
* 루트(Routes): 루트는 라우팅의 기본 구축 블록. 앱에게 어디로 갈지 그리고 URL을 만나면 무엇을 할 지를 지시하는 지침의 집합.
* 경로(Paths): 경로는 앱에 있는 URL. 정적경로(｀/termsofservice｀), 동적경로(｀/posts/xyz｀)혹은 쿼리 매개변수(｀/search?keyword=meteor｀).
* 세그먼트(Segments）: 슬래시 문자(｀/｀)로 구분되는 경로의 일부를 의미.
* 후크(Hooks): 후크는 라우팅 프로세스의 전, 후 또는 그 프로세스 중간에 실행될 수 있는 동작이다. 전형적인 예제로는 페이지를 보여주기 전에 사용자가 적절한 권한을 가지고 있는지 확인하는 것이 있다.


###### 원문 : https://www.tutorialspoint.com/expressjs/expressjs_routing.htm