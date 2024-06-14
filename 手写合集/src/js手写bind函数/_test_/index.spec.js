import '../index.js'

let obj = { name: 'cs' };
const app = function() {
    console.log(this, arguments);
}
app.prototype.OneTest = function() {
    console.log('OneTest!');
}

app();
app.bind(obj)();
app.MyBind(obj, 123, 222)(333, 0);
let newApp = app.MyBind(obj);
new newApp(123);