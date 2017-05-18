# ExpressJS - URL Building

이제까지 정적 또는 고정 경로를 정의했습니다. 동적 경로를 사용하려면 여러 유형의 경로를 제공해야합니다. 동적 경로를 사용하면 매개 변수를 전달해 매개 변수를 기반으로 처리 할 수 있습니다. 다음은 동적 경로의 예제입니다.

```javascript
var express = require('express');
var app = express();

app.get('/:id', function(req, res){
    res.send('The id you specified is ' + req.params.id);
});

app.listen(3000);
```
`http://localhost:3000/123`로 가서 테스트 해보면 다음과 같은 응답을 할 것입니다.


[<img src="https://www.tutorialspoint.com/expressjs/images/url_building_id.jpg">](https://www.tutorialspoint.com/expressjs/images/url_building_id.jpg)

URL의 '123'을 다른 것으로 바꿀 수 있으며 응답에 반영됩니다. 위의 예는 다음과 같습니다.

```javascript
var express = require('express');
var app = express();

app.get('/things/:name/:id', function(req, res){
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

app.listen(3000);
```
`http://localhost:3000/things/tutorialspoint/12345`로 접속해 테스트해보세요.

`req.params` 객체를 사용하여 URL에서 전달하는 모든 매개 변수에 액세스 할 수 있습니다. 위의 다른 경로로 중복되는 일은 없습니다. 또한 `/things`을 얻을 때 코드를 실행하려면 별도로 정의해야합니다.

## 경로 패턴 일치
regex를 사용하여 URL 매개 변수 일치를 제한 할 수도 있습니다. ID가 5 자리 숫자가 되어야한다고 가정한다면 아래와 같이 코드를 작성할 수 있습니다/

```javascript
var express = require('express');
var app = express();

app.get('/things/:id([0-9]{5})', function(req, res){
    res.send('id: ' + req.params.id);
});

app.listen(3000);
```

5자리 ID를 가진 요청과 일치하는 경로를 요청하고 있습니다. 보다 복잡한 정규 표현식을 사용하여 경로를 매칭하거나 검증 할 수 있습니다. 요청한 경로와 일치하는 경로가 없다면 `Cannot GET <your-request-route>(<요청 경로>를 찾을 수 없음)` 메시지가 응답으로 표시됩니다. 이 메시지는 다음과 같은 간단한 경로를 사용하여  `404 not found page(404 찾을 수 없음 페이지)`로 바꿀 수 있습니다.

```javascript
var express = require('express');
var app = express();

//Other routes here

app.get('*', function(req, res){
    res.send('Sorry, this is an invalid URL.');
});

app.listen(3000);
```

중요 : express는 index.js 파일과 외부 라우터까지 처음부터 끝까지 경로가 일치하는지 확인하기 때문에 모든 라우터 맨 마지막에 배치해야합니다.

예를 들어 위와 같은 경로를 정의한 경우 올바른 URL을 요청할 때 다음과 같이 표시됩니다.

[<img src="https://www.tutorialspoint.com/expressjs/images/url_matching_correct.jpg">](https://www.tutorialspoint.com/expressjs/images/url_matching_correct.jpg)

잘못된 URL 요청에 대해서는 다음과 같이 표시됩니다.

[<img src="https://www.tutorialspoint.com/expressjs/images/url_pattern_invalid.jpg">](https://www.tutorialspoint.com/expressjs/images/url_pattern_invalid.jpg)


###### 원문 : https://www.tutorialspoint.com/expressjs/expressjs_url_building.htm