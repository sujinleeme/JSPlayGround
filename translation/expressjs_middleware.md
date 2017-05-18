# ExpressJS - Middleware

미들웨어 기능은 요청 객체 (request object : req), 응답 객체 (response object: res) 및 응용 프로그램의 요청 - 응답주기에서 다음 미들웨어 기능에 액세스 할 수있는 기능입니다. 이 함수는 요청 본문 파싱, 응답 헤더 추가 등과 같은 작업을 위해 req 및 res 객체를 수정하는 데 사용됩니다.

다음은 미들웨어 기능의 간단한 예제입니다.

```javascript
var express = require('express');
var app = express();

//Simple request time logger
app.use(function(req, res, next){
	console.log("A new request received at " + Date.now());
	//This function call is very important. It tells that more processing is 
	//required for the current request and is in the next middleware function/route handler.
	next();
});

app.listen(3000);

```
위의 미들웨어는 서버의 모든 요청에 대해 호출됩니다. 따라서 요청이있을 때마다 콘솔에 다음 메시지가 표시됩니다.

```
A new request received at 1467267512545
```

특정 경로(및 모든 서브루틴)로 제한하려면 해당 경로를 `app.use ()`의 첫 번째 인수로 제공하세요. 

```javascript
var express = require('express');
var app = express();

//Middleware function to log request protocol
app.use('/things', function(req, res, next){
	console.log("A request for things received at " + Date.now());
	next();
});

//Route handler that sends the response
app.get('/things', function(req, res){
	res.send('Things');	
});

app.listen(3000);
```
이제 `/things`의 서브루틴을 요청할 때의 시간이 기록될 겁니다.

## 미들웨어 호출 순서
Express 미들웨어에 대한 가장 중요한 사항은 파일 내 작성된 내용을 순서대로 읽으면서, 일치하는 경로를 차례로 실행됩니다.

아래 예제 코드를 보면, 첫 번째 함수가 먼저 실행 된 다음 라우터 핸들러가 실행되고, 마지막에 end 함수가 실행됩니다. 이 예제는 라우터 핸들러 전과 후에 미들웨어를 사용하는 방법을 보여줍니다. 라우터핸들러를 미들웨어 자체로 사용하는 방법도 있습니다.

```javascript
var express = require('express');
var app = express();

//First middleware before response is sent
app.use(function(req, res, next){
	console.log("Start");
	next();
});
//Route handler
app.get('/', function(req, res, next){
	res.send("Middle");
	next();
});

app.use('/', function(req, res){
	console.log('End');
});

app.listen(3000);

```

이 코드를 실행 한 후에 '/'에 접속하면 Middle라는 응답을 받고 콘솔에서 다음과 같이 표시됩니다.

```
Start
End
```
앞서 배운 미들웨어를 설명한 다이어그램입니다. 

[<img src="https://www.tutorialspoint.com/expressjs/images/middleware_desc.jpg">](https://www.tutorialspoint.com/expressjs/images/middleware_desc.jpg)

이제 우리는 자체 미들웨어를 만드는 방법을 다뤄보았습니다. 이제부터는 가장 일반적으로 사용되는 커뮤니티 생성 미들웨어에 대해 알아보겠습니다.

### 서드파티 미들웨어(Third party middleware)
서트파티 미드웨어 목록은 [여기](http://expressjs.com/en/resources/middleware.html)에서 확인 가능합니다.  다음은 가장 일반적으로 사용되는 미들웨어를 사용/마운트 하는 방법입니다.

#### BODY-PARSER
BODY-PARSER은 페이로드가 첨부된 요청 본문을 구문 분석하는 데 사용됩니다. 본문 파서를 마운트하려면 `npm install --save body-parse`를 사용하여 설치하고 마운트하려면 index.js에 다음 행을 포함시킵니다.

```javascript
var bodyParser = require ( 'body-parser');

// URL 인코딩 된 데이터를 구문 분석하려면
app.use (bodyParser.urlencoded ({extended : false}))

// json 데이터를 파싱하려면
app.use (bodyParser.json ())
```

body-parser에 대한 모든 사용 가능한 옵션을 보려면 github 페이지를 방문하십시오.

#### COOKIE-PARSER
COOKIE-PARSER은 쿠키 헤더를 파싱하여 `req.cookies`를 쿠키 이름으로 키가 된 객체로 채웁니다. 쿠키 파서를 마운트하려면 `npm install --save cookie-parser`를 사용하여 설치해야하며 마운트하려면 index.js에 다음 행을 포함시킵니다.

```javascript
var bodyParser = require ( 'body-parser');
app.use (cookieParser ())
```

#### EXPRESS-SESSION
주어진 옵션 사항을 반영하여 세션 미들웨어를 생성합니다. 이 내용은 세션 챕터에서 자세히 다룹니다.

###### 원문 : https://www.tutorialspoint.com/expressjs/expressjs_middleware.htm