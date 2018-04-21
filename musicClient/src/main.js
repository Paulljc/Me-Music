// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex); // 状态管理模式
Vue.config.productionTip = false;//设置为 false 以阻止 vue 在启动时生成生产提示

//main.js 创建stores 并挂载到vue实例中
const store=new Vuex.Store({
   state:{  //存放数据 只读 不能改
       musiclist:[]
   },
  mutations:{ //利用这个下面的方法去修改state 默认方法都是大写(同步)  而action不直接修改mutations，是靠commit提交mutations(异步)
     INITMUSIC(state,data){
        state.musiclist=data; // 存入state
     }
  }
});

/* eslint-disable no-new */
//需要挂载到Vue实例 router store 不挂载里面文件访问不到
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
