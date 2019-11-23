<template>
    <div class="maincard">
      <div class="topbar">
        <span>{{name}}</span>
        <ul>
            <li v-for="nav in navitems" v-bind:key=nav.title>
              <a>{{nav.title}}</a>
            </li>
        </ul>
      </div>
      <div class="content">
        <header>
          <h3>Sales</h3>
        </header>
      </div>
      <div class="bottombar">
        <p>xcxc</p>
      </div>
  
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MainContainer',
  props: {
/*     name: {
      type: String,
      default: 'MainContainer'
    },
    navitems: {
      type: Array,
      default: function(){
        return []
      }
    } */
  },
  computed: mapState({
    name: store => store.AppUiData.mainHeaderTitle,
    navitems: store => store.AppUiData.mainNavItems,
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .maincard {
    display: flex;
    flex-direction: column; 
    background: #ffffff;
    border-radius: 50px;
    margin: 25px;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.16);
  }

  .topbar {
    font-family: 'McLaren', cursive;
    font-size: 24px;
    color: #ED36A2;
    padding: 10px 100px;
    display: flex;
    justify-content: space-between;
  }

  .content {
    padding: 20px;
    background: #F6F6F6;
  }

  .bottombar {
    background: #F6F6F6;
    border-radius: 0px 0px 50px 50px;
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

  header {
    display: flex;
    justify-content: flex-start;
  }
</style>
