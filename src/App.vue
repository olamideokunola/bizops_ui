<template>
  <div id="app" class="container-fluid mn-container full-height">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--img alt="Vue logo" src="./assets/logo.png"-->

    <router-view></router-view>
    
  </div>
</template>

<script>


import Vue from 'vue'
import VueRouter from 'vue-router'

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter)

// 2. Define route components by importing from other files
//import MainContainer from './components/MainContainer.vue';
import HomeView from './components/HomeView.vue';
import LoginView from './components/LoginView.vue';
import SalesView from './components/SalesView.vue';

import { mapState } from 'vuex';


// 3. Create the router
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { 
      path: '/', 
      component: HomeView,
    },
    { path: '/login', component: LoginView },
    { 
      path: '/sales', 
      component: SalesView,
      meta: { requiresAuth: true },
    },
    { 
      path: '/production', 
      component: SalesView,
      meta: { requiresAuth: true }  
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!sessionStorage.getItem('isAuthenticated')) {      
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.

export default {
  name: 'app',
  router,
  components: {
    //'main-container': MainContainer,
    //'sales-view': SalesView
  },
  data: function() {
    return {
      appData:{
        mainHeaderTitle: 'BizOps',
        mainNavItems: [
          {title: 'Home', active: false},
          {title: 'Sales',  active: false},
          {title: 'Production', active: false},
          {title: 'Users', active: false},
          {title: 'Login', active: false},
        ]
      },
      useCase:{},
      useCases:[
        { 
          title: 'Sales',

        },
        { 
          title: 'Production',
          
        }
      ]
    }
  },
  computed: mapState({
    isAuthenticated: store => store.user.isAuthenticated
  })
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=McLaren|Raleway&display=swap');

#app {
  font-family: 'McLaren', cursive;
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0px;
  padding: 10px;
  background: #DDE6EC;
  box-sizing: border-box;
}

.mn-container {

}

.salesview {

}

.full-height{
  height: 100%;
}



* {
    box-sizing: border-box;
}
</style>
