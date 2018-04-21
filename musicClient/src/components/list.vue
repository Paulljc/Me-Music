<template>
  <div class="list"><!--列表项-->
      <ol>
            <li v-for="item in list"><!--从list中循环取数据出来-->
            <a @click="play(item._id)"><!--点击播放哪首音乐，_id是唯一的标识-->
              <div class="info"><!--歌曲信息-->
                   <h3 class="title">{{item.name}}</h3><!--标题-->
                   <span class="artist">{{item.artist}}</span><!--歌手-->
              </div>
              <span class="duration">{{item.duration}}</span><!--时长-->
              <div class="photo"><img :src="item.poster" /></div><!--照片-->
            </a>
          </li>
      </ol>
  </div>
</template>
<script>
  //导入css文件
  import '../assets/css/app.css'
  import '../assets/css/font-awesome.css'
  import '../assets/css/normalize.css'

  import axios from 'axios' //cnpm install axios 官方推荐 用于向后端请求数据 不用ajax

  export default {
    name:"list",//对象的name属性 必须的
    data(){
      return {
        list:[] //定义一个数组，放置从后端取回的数据
      }
    },
    mounted(){  //把数据挂载到这个钩子函数上 如果要调用menthods中的方法 必须先执行mounted方法 一般用于请求数据
      //查询所有的音乐列表   钩子的 this 指向调用它的 Vue 实例。 挂载到实例上去之后调用该钩子
      axios.get("http://127.0.0.1:8088/all").then((va)=>{ //url  返回一个promise对象 里面带有数据
        //this.$store给仓库初始化数据 通过commit触发(main.js)
        this.$store.commit("INITMUSIC",va.data);
        //服务端返回回来的数据
        this.list=va.data;//可以直接给当前页面赋值
      })
    },
    methods:{ //处理各种事件
      play:function (id) {  //取到上面传来的id
          //点击播放的音频
          this.$router.push("/item/"+id); //this.$router可以访问到路由 push添加一个路由 相当于router-link
      }
    }
  }

</script>
<style></style>
