var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');


var app = express();
app.use(express.static(path.join(__dirname, 'music')));

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/lyric';


//数据库连接
MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    selectData(db, function(result) {   // 调用查询数据方法
        console.log(result);
        db.close();
    });
    /*insertData(db,function (result) { //调用插入数据方法
        console.log(result);
        db.close();
    })*/
});

//查询数据
var selectData = function(db, callback) {
    //连接到表
    var collection = db.collection('lyrics');

    collection.find(function(err, result) {
        var  musics = [];//定义一个数组
        result.each(function (err,doc) {    //循环遍历数组
            if (doc){   //有记录就往数组中添加
                musics.push(doc);
            }
        })

        app.get('/all', function(req, res) {
            res.header("Access-Control-Allow-Origin", "*");// 允许跨域
            res.send(musics);
            // find.findByConditions();
            res.end("ok");
        });
    });
}

app.listen(8088,"127.0.0.1",function () {
    console.log("open")
    //console.log(find())
})

// 插入数据
var insertData = function(db, callback) {
    var collection = db.collection('lyrics'); //连接到表 lyrics
    //插入数据
    var data = [{"name":"晴天","artist":"周杰伦","duration":"04:29","filename":"static/music/3.mp3","lrc":
    "[00:29.40]故事的小黄花\n" +
    "[00:32.65]从出生那年就飘着\n" +
    "[00:36.20]童年的荡秋千\n" +
    "[00:39.70]随记忆一直晃到现在\n" +
    "[00:43.00]rui sou sou xi dou xi la\n" +
    "[00:46.12]sou la xi xi xi xi la xi la sou\n" +
    "[00:49.80]吹着前奏望着天空\n" +
    "[00:53.36]我想起花瓣试着掉落\n" +
    "[00:56.79]为你翘课的那一天\n" +
    "[00:59.04]花落的那一天\n" +
    "[01:00.66]教室的那一间\n" +
    "[01:02.22]我怎么看不见\n" +
    "[01:04.03]消失的下雨天\n" +
    "[01:05.72]我好想再淋一遍[01:09.96]没想到失去的勇气我还留着\n" +
    "[01:15.02]\n" +
    "[01:16.14]好想再问一遍\n" +
    "[01:17.88]你会等待还是离开\n" +
    "[01:23.19]\n" +
    "[01:24.75]刮风这天我试过握着你手\n" +
    "[01:30.43]但偏偏雨渐渐大到我看你不见\n" +
    "[01:37.67]\n" +
    "[01:38.85]还要多久我才能在你身边\n" +
    "[01:44.66]\n" +
    "[01:45.41]等到放晴的那天也许我会比较好一点\n" +
    "[01:52.77]从前从前有个人爱你很久\n" +
    "[01:58.51]但偏偏风渐渐把距离吹得好远\n" +
    "[02:05.87]\n" +
    "[02:06.75]好不容易又能再多爱一天\n" +
    "[02:13.36]但故事的最后你好像还是说了拜拜\n" +
    "[02:21.47]\n" +
    "[02:35.01]为你翘课的那一天\n" +
    "[02:36.76]花落的那一天\n" +
    "[02:38.64]教室的那一间\n" +
    "[02:40.32]我怎么看不见\n" +
    "[02:42.06]消失的下雨天\n" +
    "[02:43.75]我好想再淋一遍\n" +
    "[02:47.00]\n" +
    "[02:47.99]没想到失去的勇气我还留着\n" +
    "[02:53.61]\n" +
    "[02:54.54]好想再问一遍\n" +
    "[02:55.98]你会等待还是离开[03:02.78]刮风这天我试过握着你手\n" +
    "[03:08.46]但偏偏雨渐渐大到我看你不见\n" +
    "[03:15.95]\n" +
    "[03:16.88]还要多久我才能在你身边\n" +
    "[03:23.50]等到放晴的那天也许我会比较好一点\n" +
    "[03:30.92]从前从前有个人爱你很久\n" +
    "[03:37.04]偏偏风渐渐把距离吹得好远\n" +
    "[03:43.90]\n" +
    "[03:44.78]好不容易又能再多爱一天\n" +
    "[03:50.39]\n" +
    "[03:51.08]但故事的最后你好像还是说了拜拜\n" +
    "[03:59.63]刮风这天我试过握着你手\n" +
    "[04:02.06]但偏偏雨渐渐大到我看你不见\n" +
    "[04:05.45]还要多久我才能够在你身边\n" +
    "[04:09.00]等到放晴那天也许我会比较好一点\n" +
    "[04:12.87]从前从前有个人爱你很久\n" +
    "[04:15.87]但偏偏雨渐渐把距离吹得好远\n" +
    "[04:19.30]好不容易又能再多爱一天\n" +
    "[04:22.80]但故事的最后你好像还是说了\n" +
    "[04:25.85]拜~",
        "poster":"https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3609525857,1154014587&fm=58",
        "__v":0
    }];
    collection.insert(data, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}


// module.exports = app;