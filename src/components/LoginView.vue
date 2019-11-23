<template>
    <div class="maincard">

      <!-- topbar-->
      <div class="topbar">
        <span>{{name}}</span>
        <main-nav></main-nav>
      </div>

      <!--main content-->
      <div class="content">
        <div class='container logoncontainer logoninnercontainer'>
            <!--Log on-->
            <div class="col-sm-5 logonform">
              <div class="header">
                <h3>{{title}}</h3>
              </div>
              <text-input
                  title='Email'
                  titleinputname='Email'
                  inputtype='email'
                  v-bind:textboxstyle=textboxstyle
                  v-model="email"
                >
              </text-input>

              <text-input
                  title='Password'
                  titleinputname='Password'
                  inputtype='password'
                  v-bind:textboxstyle=textboxstyle
                  v-model=password
                >
              </text-input>

              <button
                class='mt-3 mb-4'
                @click=handleLogin
              >
              Login
              </button>

            </div>
            <!--Pic-->
            <div 
              class="col-sm-7"
            >
              <img class="img-fluid" src="../assets/images/bookkeeping.png">
            </div>
        </div>
      </div>
      <div class="bottombar p-4">
        <p>Copyright 2019 <strong>CloutBytes Technologies</strong></p>
      </div>

    </div>
</template>

<script>
import MainContainer from './MainContainer.vue';
import TextInput from './TextInput.vue';
import MainNav from './MainNav.vue';

import { mapState } from 'vuex';

export default {
  mixins: [MainContainer],
  components: {
    'text-input': TextInput,
        'main-nav': MainNav
  },
  name: 'HomeView',
  props: {

  },
  data: function(){
    return {
      title: 'Login',
      menuitems: [
      ],
      textboxstyle: {
        background: 'white',
        'border-radius': '7px',
        'border-color': 'rgba(117,188,233,0.50)',
        'border-width': '2px',
      },
      email: '',
      password: '',
    }
  },
  watch: {

  },
  computed: mapState({
    name: store => store.AppUiData.mainHeaderTitle,
    navitems: store => store.AppUiData.mainNavItems,
    user: store => store.user,
  }),
  methods: {
    authenticateUser () {
      var payload = {
        email:  this.email,
        password: this.password
      }
      this.$store.commit('authenticateUser', payload)
    },
    handleLogin () {
      this.authenticateUser()
      if(this.user.isAuthenticated){
        this.$router.push({ path: '/sales' })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .maincard {
    display: flex;
    flex-direction: column; 
    background: #ffffff;
    border-radius: 50px;
    padding: 0px;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.16);
    height: 100%;
  }

  .topbar {
    font-family: 'McLaren', cursive;
    font-size: 24px;
    color: #ED36A2;
    padding: 60px 100px 40px;
    display: flex;
    justify-content: space-between;
  }

  .content {
    background: #fff;
    padding: 0px;
  }

  .logoncontainer{
    background: rgba(117, 188, 233, 0.24);
    border-radius: 75px 200px 200px 75px;
    padding: 20px;
    margin-bottom: 60px;
  }

  .logoninnercontainer{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .logonform {
    padding: 20px 60px;
  }

  button {
    width: 100%;
    border-radius: 10px;
    padding: 10px 0;
    border-width: 0px;
    background: #fcd505;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.16);
    font-weight: bold;
  }

  .bottombar {
    background: #F6F6F6;
    border-radius: 0px 0px 50px 50px;
    font-size: 12px;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    font-family: 'Raleway', sans-serif;
    font-size: 14px;
    color: #000;
    height: 100%

  }

  li {
    padding: 10px;
    margin: 0px;
    height: 100%
  }

  /* unvisited link */
  a:link {
    color: black;
  }

  /* visited link */
  a:visited {
    color: black;
  }

  /* mouse over link */
  a:hover {
    color: #ED36A2;
    font-weight: bold;
  }

  /* selected link */
  a:active {
    color: #ED36A2;
  }

  .header {
    display: flex;
    justify-content: flex-start;
    padding: 10px 0px;
    align-items: center;
    font-weight: bold;
  }

  h3{
    margin: 0px;
  }

  .leftnav{
    height: 100%;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.16);
  }

  .rightgroup {

  }
  .newsale {
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.16);
  }
  .saleslist {
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.16);
  }

    /* If the screen size is 600px wide or less, hide the element */
  @media only screen and (max-width: 600px) {
    .mainnav {
      display: none;
    }

    .newsalecontainer, .saleslistcontainer {
      display: flex;
      padding-top: 20px;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    
  }
</style>
