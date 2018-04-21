var lyric=require("./lyric.js");

function find(){

    var h = function () {
        var a = [];
        lyric.find(function(err,data){

            if(err){
                console.log(err);
            }
            else{
                //console.log(data);
                return data;
            }

        })
        return a;
    }

    return h();
}
module.exports=find;
    /*lyric.find(function (err,cursor) {
        var musics = [];
        cursor.each(function (err,doc) {
            if(doc){
                musics.push(doc);
            }
        })
    })*/


/*var a = lyric.find(function(err,res){
    if(err){
        console.log(err);
    }
    /!*else{
        console.log(res);
    }*!/
    console(res)
})
module.exports = a;*/
