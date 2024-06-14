const {myNew} = require('../index')
function foo() {
    this.name = 'foo'
}

foo.prototype.get = function() {
    return this.name
}

foo.prototype.set = function(name) {
    this.name = name
}


console.log(new foo())
console.log(myNew(foo))
console.log(new foo() === myNew(foo))
