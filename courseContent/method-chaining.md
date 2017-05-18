# Method Chaining

```javascript
var obj = {
	append: function(name){
	    this.name += name;
        return this;
    },
    removeSpecial: function(){
        this.name = this.name.replace(/[^a-z]/ig, "");
        return this;
    },
    getName : function(){
	    return this.name;
    }
}

var code=Object.create(obj);
code.name = "^^sujin$$";
var cleanName = code.append("))))").removeSpecial().getName();
console.log(cleanName); \\sujin
```
