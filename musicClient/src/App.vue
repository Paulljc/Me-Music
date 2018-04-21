<template>
  <div id="app" class="page">

    <header class="header">
      <!--<router-link to="/home"><i class="fa fa-expand"></i></router-link>-->
      <h1><i class="fa fa-music"></i> 音乐随心听 </h1>
      <router-link to="/list"><i class="fa fa-list"></i></router-link><!--把list组件放到router-view中-->
    </header>

    <section class="main">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>

</style>
