# This 객체를 변경하는 방법 
## 1. 함수 프로퍼티(Function Property)
모든 함수에 공통인 프로퍼티는 `length(매개변수의 숫자)`와  `prototype`가 있다.
`apply()`, `call()`, `bind()` 메서드는 함수 프로퍼티(property)에 정의되어 있어 모든 함수에 호출 가능하다.

###### ex.1
```javascript
var func = function () {};
typeof func;
// 'function'

Object.getPrototypeOf(func).hasOwnProperty('bind')
// true
```
`apply()`, `call()`, `bind()` 를 써서 스코프를 바꾸면 객체마다 일일히 메서드를 등록하지 않아도 된다는 장점이 있다.

* 참고 : prototype 모든 참조타입의 인스턴스 메서드(eg.  `toString()`, `valueOf()` ) 같은 메서드가 존재하고, 객체 인스턴스는 이에 접근한다. Prototype 프로퍼티는 열거 할 수 없어 `for-in` 문에 나타나지 않는다.


## 2. `apply()`, `call()`, `bind()`
모든 함수는 소유자인 함수를 호출하면서 `this`를 넘기는데, `apply()`, `call()`, `bind()` 메소드들은 결과적으로 함수 내부의 `this` 객체의 값을 바꾼다.

### 2.1 `apply()`
`apply()`는 매개변수로 소유자 함수에 넘길 `this`와 매개변수 배열을 받는다.
두 번째 매개변수는 Array의 인스턴스 일 수 도 있고, arguments 객체일 수 도 있다.

###### ex. 2
```javascript

function sum(n1, n2){
	return n1 + n2;
}

function callSum1(n1, n2){
	return sum.apply(this, arguments); //arguments 객체를 넘긴다
}

function callSum2(n1, n2){
	return sum.apply(this, [n1, n2]); // 매개변수 배열을 넘긴다
}

callSum1(10, 10) //20
callSum2(10, 10); //20
```


### 2.2 `call()`
`call()`메서드는 첫 번째 매개변수가 `this`이지만, `apply()`와 다르게 모든 매개 변수를 각각 나열해야 한다.

###### ex.3
```javascript
function sum(n1, n2){
	return n1 + n2;
}

function callSum(n1, n2){
	return sum.call(this, n1, n2);
}

callSum(10, 10) // 20
``` 

###### ex.4
```javascript
function sum() {
  function add (a, b) { return a + b; }
  return [].reduce.call(arguments, add);
}

sum(1, 2, 3, 4, 5) // 15
sum(1, 3, 5, 7) // 16
```


#### Q. `apply()`와 `bind()` 선택
선택은 개발자의 재량이며, 매개변수를 전달하기 편리한 방식을 택하면 된다. arguments객체를 그대로 전달해도 되거나 매개변수로 전달할 데이터가 배열로 준비되어 있다면 `apply()`를, 그렇지 않다면 `call()`이 더 나은 선택이다. 전달할 매개변수가 없다면 두 메서드는 완전히 똑같다. 두 메소드 모두 매개변수를 호출 하는 것이 아니라,  `this`를 바꾸는 것이 목적으로 써야한다.


### 2.3 `bind()`
`bind()` 메서드는 함수와 컨텍스트를 매개변수로 받고 주어진 함수를 주어진 컨텍스트에서 다른 매개변수를 전달하며 호출하는 함수를 반환한다.

###### ex.5
```javascript
var num = {n1 : 10, n2 : 10}

function sum(n1, n2){
	result = this.n1+this.n2;
	return result;
}

var callSum = sum.bind(num) // 20
callSum(); // 20
```

###### ex.6
```javascript
var calc = {
 add: function (a, b) { return a + b; },
 sum: function () { return [].reduce.call(arguments, this.add) }
};

var func = calc.sum.bind(calc, 10, 10);
func(); 20
```


###### Reference
* 프론트엔드 개발자를 위한 자바스크립트 프로그래밍 - 인사이트(p.180- p.181) 
