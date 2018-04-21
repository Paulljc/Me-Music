import Vue from 'vue'
import Router from 'vue-router'
import list from '../components/list.vue'
import player from '../components/player.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/item/:id',
      name: 'player',
      component: player
    }
  ]
})
