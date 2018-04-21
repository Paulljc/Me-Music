const mongoose=require("mongoose");

//2. 连接数据库
mongoose.connect("mongodb://127.0.0.1:27017/lyric");

//3. 是否连接成功
mongoose.connection.on("connected",function(){
    console.log("open")
})

//4. 连接出错
mongoose.connection.on("error",function(err){
    console.log("error"+err)
})

//5. 连接断开
mongoose.connection.on("disconnected",function(){
    console.log("close");
})
module.exports=mongoose;