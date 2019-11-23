<template>
  <ul class="mainnav">
      <li v-for="nav in navitems" v-bind:key=nav.title>
        <router-link :to='nav.path'>{{nav.title}}</router-link>
      </li>
      <li>
        <router-link 
          to='/login'
          v-if='user.isAuthenticated==false'
        >Login</router-link>
      </li>
      <li>
        <a
          href='/login'
          @click=logout
          v-if=user.isAuthenticated
        >Logout</a>
      </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {
  },
  name: 'HomeView',
  props: {

  },
  data: function(){
    return {
    }
  },
  watch: {

  },
  computed: mapState({
    navitems () {
      return this.$store.getters.visiblenavitems
    },
    user: state => state.user
  }),
  methods: {
    logout(){
      this.$store.commit('logout')
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



    /* If the screen size is 600px wide or less, hide the element */
  @media only screen and (max-width: 600px) {
    .mainnav {
      display: none;
    }
  }
</style>
