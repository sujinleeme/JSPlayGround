# `this.setState`를 `render()` 함수 내에 호출 할 수 없는 이유

###### ex.1 (Toggle.js)
```javascript
var React = require('react');
var ReactDOM = require('react-dom');

var green = '#39D1B4';
var yellow = '#FFD712';

var Toggle = React.createClass({
  getInitialState: function () {
    return { color: green };
  },
  
  changeColor: function () {
    var color = this.state.color == green ? yellow : green;
    this.setState({ color: color });
  },
  
  render: function () {
    return (
      <div style={{background: this.state.color}}>
        <h1>
          Change my color
        </h1>
        <button onClick={this.changeColor}>
          Change color
        </button>
      </div>
    );
  }
});

ReactDOM.render(
  <Toggle />,
  document.getElementById('app')
);
```

사용자가 `<button></button>`을 클릭하면 changeColor 함수가 호출된다. 

`changeColor`는 `this.state.color`를 업데이트하는 `this.setState`를 호출한다. 그러나 `this.state.color`가 green에서 yellow으로 변경 되더라도 배경색은 변경되지 않는다. 배경색 `Toggle`이 렌더링 될 때까지 변경되지 않는다.

`render`함수 내 `<div style = {{background : this.state.color}}>`을 보면, 가상 DOM 객체의 색이 새로운 `this.state.color`로 변경되어 결국 화면이 변경된다.

그렇다면 `changeColor`를 호출 시, 왜 `render`을 다시 호출하면 안될까? `changeColor`를 사용하면 렌더링 시 색상이 달라지는데, 구성 요소를 다시 렌더링 하지 않아도 배경색은 왜 달라질까?

이유는 `this.setState`를 호출 할 때마다 `this.setState`는 상태가 변경되는 즉시 자동으로 render를 호출하기 때문이다.

따라서 `this.setState`를 `render` 함수 내부에서 호출 할 수 없다! `this.setState`는 자동으로 `render`를 호출한다. 만약 `render`가 `this.setState`를 호출하면 무한 루프(infinite loop)가 생성된다.

###### Reference
* [this.setState Automatically Calls render](https://www.codecademy.com/courses/react-101/lessons/this-state/exercises/this-setstate-automatic-render?action=lesson_resume) - CodeAcademy, Learn React.js  
