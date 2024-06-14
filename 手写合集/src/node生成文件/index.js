/**
 * 根据目录生成文件
 * 
 * 需求:
 *      1、根据目录生成对应的文件, 格式 [序号][问题].md
 *      2、以生成的文件不需要再次生成, 生成文件结束之后, 根据生成的文件更新对应的目录.md
 * 
*/

const fs = require('fs')
const path = require('path')

const PATH_CAT = path.join(__dirname + '/_test_/catalogue.md') // 目录文件
const PATH_DICT = path.join(__dirname + '/_test_/src')         // 输出文件夹

if (!fsExistsSync(PATH_DICT)) {
    fs.mkdirSync(PATH_DICT)
}

const cat = fs.readFileSync(PATH_CAT)
const catList = cat.toString().split('\n')

for(let i=1; i<catList.length; i++) {
    let name = catList[i].replace('/', 'or')
    const path = PATH_DICT + `/${i}.${name}.md`
    if (!fsExistsSync(path)) {
        fs.writeFileSync(path, `# ${name}`)
    }
}

// 检测文件或者文件夹存在
function fsExistsSync(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}