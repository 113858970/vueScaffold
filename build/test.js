const path = require('path');
function pathTest1(dir){
    console.log(path.join(__dirname))
}
function pathTest2(){
    console.log(path.resolve(__dirname, '../','src'))
}
pathTest2('src');