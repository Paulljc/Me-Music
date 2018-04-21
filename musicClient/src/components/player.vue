<template>
<div class="player">
   <div class="disc">
     <transition><!--绑定图片并且动画化 当前时间/总时长 就会一直转-->
       <img :src="item.poster" :alt="item.name" :style="{transform:'rotate('+(current/duation*360*3)+'deg)'}" />
     </transition>
   </div>
  <h2 class="title">{{item.name}}</h2>
  <h3 class="artist">{{item.artist}}</h3>
  <div id="lyric" class="lyric" >
    <!--循环歌词 一条一条 并且在当前行添加样式 使其变色-->
      <p class="previous" v-for="(item,index) in lines" :class="currentLine==index?currentClass:''">
          {{item.text}}
      </p>
  </div>
  <audio id="p1" ></audio>  <!--音频播放-->
  <div class="controls"><!--控制播放  i标签放图标-->
       <button class="active" @click="prev()"><i class="fa fa-backward"></i></button>
        <!--中间按钮点击是会变化的 默认不播放-->
       <button class="active" @click="play()"><i class="fa" :class="{'fa-play':!item.playing,'fa-pause':item.playing}"></i></button>
       <button class="active" @click="next()"><i class="fa fa-forward"></i></button>
  </div>
</div>
</template>
<script>

  import '../assets/css/app.css'
  import '../assets/css/font-awesome.css'
  import '../assets/css/normalize.css'
  import $ from 'jquery'  //cnpm install jquery

  export default {
     name:"player", //当前组件名
     data(){
       return {
           item:{}, //当前要播放的音乐对象
           lines:[], //歌词存放的数组
           currentLine:"w", //当前播放歌词行
           currentClass:"current", //当前被选中的样式
           lrccurrent:0, //当前歌词播到第几行
           current:"",  //当前播放时间
           currentindex:0,//用来记录播放音乐下标
           duation:0 //总时长
       }
    },
    mounted(){
       var that = this;//绑定当前组件
       var id = this.$route.params.id;//取出URL的参数 59...那串数字
      //根据ID 匹配要播放的音乐
      this.$store.state.musiclist.forEach((a,index)=>{  //这里的this指store.state
          if(a._id==id){
             that.item=a;
             that.init();//数据取出来后就可以初始化了
          }
      })
    },
    methods:{
      init:function () {
        //初始化方法
        this.item.playing=false;//默认不播放
        document.getElementById("p1").src=this.item.filename; //根据文件名播放曲目
        //timeupdate是audio标签的属性 在音频/视频（audio/video）的播放位置发生改变时触发
        document.getElementById("p1").addEventListener('timeupdate',()=>{
            this.current=document.getElementById("p1").currentTime;//当前播放的时间
            var oldtime=this.lines[this.lrccurrent].time.split(":");//取出歌词当前时间
            var lrctime=parseInt(oldtime[0])*60+parseInt(oldtime[1]);// 分*60 + 秒
            var str1=this.current-lrctime;//当前播放的时间 - 歌词时间
            if(str1>0 || str1==0){
                this.currentLine=this.lrccurrent;//改变歌词的显示
                this.lrccurrent+=1;//下一个歌词的下标
            }

        })
        this.fetch();//调用分割歌词方法
      },
      prev:function () {  //上一曲
          var number=--this.currentindex;//改变索引
          if(number<0){
            number=0;
            this.currentindex=number;
          }else{}
          this.item=this.$store.state.musiclist[number];//直接从仓库找
          this.current=0;//当前播放时间归零
          this.item.playing=true;//播放状态
          this.init();//重新初始化
      },
      next:function () {
        var number=++this.currentindex;//下一曲同理
        if(this.$store.state.musiclist.length-1<number){
          number=this.$store.state.musiclist.length-1;
          this.currentindex=number;
        }else{}
        this.item=this.$store.state.musiclist[number];
        this.current=0;
        this.item.playing=true;
        this.init();
      },
      play:function () {
          if(this.item.playing){
            document.getElementById("p1").pause();
          }
          else{
            document.getElementById("p1").play();
            this.duation=document.getElementById("p1").duration;//duration audio的属性
          }
          this.item.playing=!this.item.playing;//每点击一次就取反
      },
      fetch:function () {
        //歌词分割
        this.lines=[];
        var lines=this.item.lrc.split("\n");//分割
        for (var k in lines) {
          var timeMatch = lines[k].match(/\[(\d+:\d+\.\d+)\]/)//用key对每一行进行正则匹配[00:29.40]
          this.lines.push({
            time: timeMatch ? timeMatch.pop() : '',
            text: lines[k].replace(/^.+?\]/, '')//做一个替换
          })
        }
      }
    }
  }
</script>
<style></style>
