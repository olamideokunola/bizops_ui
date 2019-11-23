<template>
    <div class="maincard">

      <!-- topbar-->
      <div class="topbar">
        <span>{{name}}</span>
        <main-nav></main-nav>
        
      </div>
      <div class='userheader'>
        <user-header
        >
        </user-header>
      </div>

      <!--main content-->
      <div class="content">
        <div class='container logoncontainer innercontainer'>
            <!--Log on-->
            <div class="col-sm-5 logonform">
              <div class="header">
                <h2>Sales and </h2>
                <h2>Production</h2>
                <h2>Diary</h2>
              </div>
              <p>
                Keep your records of sales and 
                production at your finger tips 
                so you can make faster and better 
                business decisions.
              </p>
              <button
                class='mt-3 mb-4'
                @click=gotoLogin
                v-if='user.isAuthenticated==false'
              >
                Login
              </button>

            </div>
            <!--Pic-->
            <div 
              class="col-sm-7"
            >
              <img class="img-fluid" src="../assets/images/3d-chart.png">
            </div>
        </div>

        <div 
          class="cta-maincontainer"
          v-if='user.isAuthenticated'
          >
          <div class="cta-group">
            <div
              @click="gotoSales"
            >
              <sales-cta
                class='cta'
                title='Sales'
                description='Keep track of you daily
                  sales, monitor customers,
                  manage sales operations.'
                
              >
                <sales-icon></sales-icon>
              </sales-cta>
            </div>

            <div
              @click="gotoSales"
            >
              <production-cta
                class='cta'
                title='Production'
                description='Keep track of you daily
                  production, manage 
                  production operations.'
                @click=gotoSales
              >
                <production-icon></production-icon>
              </production-cta>
            </div>
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
import MainNav from './MainNav.vue';
import AppCta from './AppCta.vue';
import SalesIcon from './icons/SalesIcon.vue';
import ProductionIcon from './icons/ProductionIcon.vue';
import UserHeader from './UserHeader.vue';

import { mapState } from 'vuex';

export default {
  mixins: [MainContainer],
  components: {
    'main-nav': MainNav,
    'user-header': UserHeader,
    'sales-icon': SalesIcon,
    'production-icon': ProductionIcon,
    'sales-cta': AppCta,
    'production-cta': AppCta
  },
  name: 'HomeView',
  props: {

  },
  data: function(){
    return {
      title: 'Sales & Production Diary',
      menuitems: [

      ],
      textboxstyle: {
        background: 'white',
        'border-radius': '7px',
        'border-color': 'rgba(117,188,233,0.50)',
        'border-width': '2px',
      }
    }
  },
  watch: {

  },
  computed: mapState({
    name: store => store.AppUiData.mainHeaderTitle,
    navitems: store => store.AppUiData.mainNavItems,
    user: state => state.user
  }),
  methods: {
    gotoLogin () {
      this.$router.push({ path: '/login' })
    },
    gotoSales: function (){
      //alert('In sales')
      this.$router.push({ path: '/sales' })
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
    padding: 60px 100px 10px;
    display: flex;
    justify-content: space-between;
  }

  .userheader {
    display: flex;
    justify-content: flex-end;
    padding-right: 90px;
  }

  .content {
    background: #fff;
    padding: 0px;
  }

  .logoncontainer{
    background: rgba(117, 188, 233, 0.24);
    border-radius: 75px 75px 75px 75px;
    padding: 20px;
    margin-bottom: 20px;
  }

  .innercontainer{
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
    text-align: center;
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

  .bottombar p{
    text-align: center;
  }

  p {
    text-align: left;
    margin-top: 20px;
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
    flex-direction: column;
    text-align: left;
    padding: 10px 0px;
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

  .cta-maincontainer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
  }

  .cta-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;    
  }

  .cta {
    padding: 20px;
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
