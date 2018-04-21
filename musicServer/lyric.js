//对数据进行操作，访问mongodb
//1. 导入db.js 文件
var mongoose=require("./db.js");

//mongoose 下有两个概念：
//1. schema: 一种数据模型，表示的是数据的结构，name/pwd/age 做为key   { name:string,pwd:string,age:number}
//2. model:-> 文档 document,一条数据就是一个model
//{  name:"zhansan",pwd:123,age:18  }

//2.创建schema对象
var schema=mongoose.Schema;

//3. 根据schema对象，定义数据的结构
var lyricschema=new schema({
    number:String,
    name:String,
    artist:String,
    duration:String,
    filename:String,
    lrc:String,
    poster:String
})

//4. 导出  s
module.exports=mongoose.model("lyric",lyricschema);