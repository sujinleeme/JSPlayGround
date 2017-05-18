# This 객체

### 1. 요약
* 전역함수의 this: strict 모드는 `undefined`, non-strict 모드는 `window`
* 함수가 객체 메서드로 호출 되었을 때: this는 `해당 객체`
* 익명함수(Anonymous function): 특정 객체에 묶여 있지 않으므로, non-strict 모드에서 this는 `window`, strict 모드는 `undefiend`


### 설명
###### ex. 2
```javascript
var name = "The Window"; 

var obj = {
	name : "My Object",
	getNameFunc : function(){
		return function(){
			return this.name;
		}
	}
}

console.log(obj.getNameFunc()()); //"The Window"
```

위 코드예제에서 반환받은 문자열은 전역 name 변수의 값인 `“The Window”`이다.

## Q. 익명 함수가 외부 스코프의 this객체를 포함하지 않은 이유
모든 함수는 호출되는 순간 자동으로 `this`와  `arguments`  두 특별한 변수를 갖고 있는데, 내부 함수는 외부 함수의 `this` 와  `arguments`에 직접적으로 접근할 수 없다. 그러나 외부 함수 `this	`객체를 다른 변수에 저장해서 클로저가 이 변수에 접근하도록 하는 일이 가능하다.

###### ex. 2

```javascript
var name = "The Window"; 

var obj = {
	name : "My Object",
	getNameFunc : function(){
		var that = this;
		return function(){
			return that.name;
		}
	}
}

console.log(obj.getNameFunc()()); //"My Object"
```

익명 함수를 정의하기 전에 외부 함수 `this` 객체를 `that`이란 변수에 할당함으로서, `that`은 외부함수에 고유한 변수이므로 클로저는 이 변수에 접근 가능하다.  반복분의 `i`만큼 널리 쓰이는 관습이다. 

```javascript
var name = "The Window";
var obj = {
	name : "My Object",
	getName : function(){
		return this.name;
	}
}
```

### `obj.getName()`을 호출하는 다양한 방법

```
obj.getName(); // "My Object"
(obj.getName)(); // "My Object"
(obj.getName = obj.getName)(); // "The Window"
```

`(obj.getName = obj.getName)();`는 먼저 할당한 후, 그 결과를 호출 했음으로 값은 함수 자체가 되어 `this`의 값이 유지되지 않는다.

###### Reference
* 프론트엔드 개발자를 위한 자바스크립트 프로그래밍 - 인사이트(p.276 - p.279) 

