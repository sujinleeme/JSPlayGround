# ExpressJS - Templating

Pug는 express 템플릿 엔진입니다. 템플릿 엔진은 기존 HTML 내 서버 코드를 삭제하여 기존 템플릿과 문자열을 연결하는데 사용합니다. Pug는 필터(filters), 포함(includes), 상속(inheritance), 보간(interpolation) 등 다양한 기능을 가진 매우 강력한 템플릿 엔진입니다. 여기에는 많은 부분이 포함됩니다.

express와 함께 Pug를 사용하려면, 아래 명령어로 설치합니다.

```
npm install --save pug
```

pug가 설치되었으므로 앱용 템플릿 엔진으로 설정하십시오. `require`을 사용할 필요 없이,  index.js 파일에 다음 코드를 추가하면 됩니다.

```javascript
app.set('view engine', 'pug');
app.set('views','./views');
```

이제 `view`라는 새 디렉토리를 들고 그 안에 `first_view.pug`라는 파일을 만들고 그 안에 다음 데이터를 입력하십시오.

```html
doctype html
html
    head
        title="Hello Pug"
    body
        p.greetings#people Hello World!
```

이 페이지를 실행하기 위해, 앱 내 경로를 설정합니다.

```javascript
app.get('/first_template', function(req, res){
    res.render('first_view');
});
```

Hello World로 출력됩니다! pugs는 마크업을 html로 변환합니다. 태그를 닫고, class와 id 키워드를 대신, '.'과 '#'를 사용합니다. 앞의 코드는 다음과 같이 변환됩니다.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Hello Pug</title>
    </head>
    <body>
        <p class="greetings" id="people">Hello World!</p>
    </body>
</html>
```

pug는 HTML 마크업을 단순화하는 것보다 더 많은 일을 할 수 있습니다. 더 자세한 Pug의 기능을 살펴봅시다.

### 단순 태그
태그는 들여 쓰기에 따라 중첩됩니다. 위 예제와 같이 <title>은 <head> 태그 안에 들여 쓰여졌으므로 <head> 태그 안에 들어 있습니다. 그러나 <body> 태그는 동일한 들여 쓰기에 있으므로 <head> 태그의 형제입니다.

Pug는 태그를 달을 필요 없이, 들여쓰기로 태그를 닫으면 됩니다.

태그 내부에 텍스트를 넣으려면 다음 세 가지 방법이 있습니다.

* 띄워쓰기 :
```
h1 Welcome to Pug
```

* | 기호:
```
div
    | To insert multiline text, 
    | You can use the pipe operator.
```

* 텍스트 블록: 
```
div.
    그러나 텍스트가 많으면 보기가 어렵습니다.
    "." 마침표는 태그의 끝에 해당하는 텍스트 블록을 나타냅니다.
    새로운 줄에 들여쓰기하여 텍스트를 입력하면 됩니다.
```

### 주석(Comments)
Pug는 주석 작성을 위해 자바스크립트와 동일한 구문`(//)`을 사용합니다. 이 주석은 HTML 주석 `(<! - comment ->)`으로 변환됩니다.

```
//This is a Pug comment
```
의 주석은 아래와 같이 변환됩니다.

```
<!--This is a Pug comment-->
```

### 상속(Attributes)
속성을 정의하기 위해 괄호안에 속성 목록을 쉼표(,)로 나열합니다. 클래스 및 ID 속성에는 특수한 표현이 있습니다. 다음 코드를 보고 html 태그에 대한 속성, 클래스 및 ID 정의를 참고하세요.

```html
div.container.column.main#division(width="100",height="100")
```

아래와 같이 변환됩니다.

```html
<div class="container column main" id="division" width="100" height="100"></div>
```

### 템플릿에 값 전달하기
pug 템플릿을 렌더링 할 때 라우터 핸들러로 값을 실제로 전달할 수 있습니다. 그런 다음 템플릿에서 사용할 수 있습니다. 

```javascript
var express = require('express');
var app = express();

app.get('/dynamic_view', function(req, res){
    res.render('dynamic', {
        name: "TutorialsPoint", 
        url:"http://www.tutorialspoint.com"
    });
});

app.listen(3000);
```
`view` 디렉토리 내 새 `dynamic.pug`파일을 만들고 코드를 입력합니다.

```
html
    head
        title= name
    body
        h1= name
        a(href= url) URL
```
`localhost:3000/dynamic`로 접속하면 아래와 같은 화면이 나올 겁니다.


[<img src="https://www.tutorialspoint.com/expressjs/images/templating_variables.jpg">](https://www.tutorialspoint.com/expressjs/images/templating_variables.jpg)

`#{variableName}` 구문써 전달된 변수를 텍스트 내에 사용할 수 있습니다. 예를 들어, TutorialsPoint의 인사말을 입력하려면 아래와 같이 작성하면 됩니다.

```
html
    head
        title= name
    body
        h1 Greetings from #{name}
        a(href= url) URL
```


###### 원문 : https://www.tutorialspoint.com/expressjs/expressjs_templating.htm