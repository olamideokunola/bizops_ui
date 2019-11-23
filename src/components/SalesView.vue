<template>
    <div class="maincard">

      <!-- topbar-->
      <div class="topbar">
        <span>{{name}}</span>
        <main-nav></main-nav>
      </div>

      <!--main content-->
      <div class="content">
        <div class="header">
          <h3>{{title}}</h3>
          <user-header
            title='Sales'
          >
          </user-header>
        </div>
        
        <div class="container-fluid">
          <div class="rightgroup row mr-2">
            <!--LeftNav-->
            <div class="col-sm-2 ml-0 pl-0">
              <left-nav
                class="leftnav"
                :menuitems=menuitems
                v-on:addnewsalemenuclicked="editsale=false;showsummary=false"
                v-on:salessummarymenuclicked="showsummary=true"
              >
              </left-nav>
            </div>

            <!--New Sale-->
            <div 
              class="col-sm-4 newsalecontainer"
              v-if="shownewsale">
              <new-sale
                class="newsale"
                title='New Sale'
                buttontext='Create new sale'
                v-on:newsale=addNewSale($event)
                
              >
              </new-sale>
              
            </div>
            <div 
              class="col-sm-4 newsalecontainer"
              v-if="showeditsale">
              <edit-sale
                  class="editsale"
                  title='Edit Sale'
                  buttontext='Update sale'
                  :sale=sale
                  v-on:editsale=updateSale($event)
                >
                </edit-sale>
            </div>

            <!--Sales Records-->
            <div 
              class="col-sm-6 saleslistcontainer"
              v-if=showsaleslist>
              <sales-list
                class="saleslist"
                :totalsales=sales.totalsales
                :salesitems=sales.items
                v-on:editsaleitem="editsaleitem($event)"
                
              >
              </sales-list>
            </div>
            <!--Sales Summary - shows only when sales summary is clicked on the left nav -->
            <div class="col-sm-10 saleslistcontainer">
              <sales-summary
                class="saleslist"
                :totalsales=sales.totalsales
                :salesitems=sales.items
                v-on:editsaleitem="editsaleitem($event)"
                v-if="showsummary"
              >
              </sales-summary>
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
import LeftNav from './LeftNav.vue';
import AddIcon from './icons/AddIcon.vue';
import CalendarIcon from './icons/CalendarIcon.vue';
import SummaryIcon from './icons/SummaryIcon.vue';
import NewSale from './NewSale.vue';
import SalesList from './SalesList.vue';
import SalesSummary from './SalesSummary.vue';
import MainNav from './MainNav.vue';
import UserHeader from './UserHeader.vue';

import { mapState } from 'vuex';

export default {
  mixins: [MainContainer],
  components: {
    'left-nav' : LeftNav,
    'new-sale' : NewSale,
    'edit-sale' : NewSale,
    'sales-list' : SalesList,
    'sales-summary': SalesSummary,
    'main-nav': MainNav,
    'user-header': UserHeader
  },
  name: 'SalesView',
  props: {

  },
  data: function(){
    return {
      title: 'Sales',
      lastname: 'Okunola',   
      editsale: false,
      showsummary: false,
      menuitems: [
        {title: 'Add new sale', icon: AddIcon, active:false, hover:false, eventname:'addnewsalemenuclicked'},
        {title: 'Go to date', icon: CalendarIcon, active:false, hover:false, eventname:'gotodateemenuclicked'},
        {title: 'Sales summary', icon: SummaryIcon, active:false, hover:false, eventname:'salessummarymenuclicked'}
      ],
      sales: {
        totalsales:0,
        salesdate:'',
        items: [] 
      },
      sale: {},
      newname: 'Olawale'
    }
  },
  watch: {
    'sales.items': function(){
      this.setTotalSale()
    },
    sale: function(){
      //alert('sale changed')
      this.setTotalSale()
    }
  },
  computed: mapState({
    name: store => store.AppUiData.mainHeaderTitle,
    navitems: store => store.AppUiData.mainNavItems,
    shownewsale: function(){
      if(this.editsale==false && this.showsummary==false){
        return true
      } else {
        return false
      }
    },
    showeditsale: function(){
      if(this.editsale==true && this.showsummary==false){
        return true
      } else {
        return false
      }
    },
    showsaleslist: function(){
      if(this.showsummary==false){
        return true
      } else {
        return false
      }
    },
    user: state => state.user,
  }),
  methods: {
    newId: function(newSale){
      var dt = new Date()
      var dtStr  = dt.toDateString()
      var tmStr = dt.toTimeString()
      return dtStr + newSale.product.title + tmStr
    },
    addNewSale: function(newSale){
      var sale = {
        id: this.newId(newSale),
        product: newSale.product,
        quantity: newSale.quantity,
        price: newSale.price,
        amount: newSale.amount,
        customer: newSale.customer,
        time: new Date(),
      }
      this.$store.commit('addNewSale', sale)
      //this.sales.items.push(sale)
    },
    updateSale: function(edittedSale){
      this.editsale = true
      // get old sale
      var oldSale = this.sales.items.find(function(saleitem){
        return saleitem.id == edittedSale.id
      })

      // update old sale params
      oldSale.product= edittedSale.product
      oldSale.quantity= edittedSale.quantity,
      oldSale.price= edittedSale.price,
      oldSale.amount= edittedSale.amount,
      oldSale.customer= edittedSale.customer,
      oldSale.time= edittedSale.time,
      oldSale.lastupdatetime= new Date()

      // update total
      this.setTotalSale()

      return oldSale
    },
    setTotalSale: function(){
      // pack amounts into a single array
      var amounts = []
      amounts = this.sales.items.map(function(salesitem){
        return salesitem.amount
      })

      // calculate total sales with reduce methods
      this.sales.totalsales = amounts.reduce(getTotalSales)      
      function getTotalSales(total, amount){
        return total + amount
      }
    },
    editsaleitem: function(saleitem){
      //alert(item.product)
      this.editsale=true
      this.sale={
        id: saleitem.id,
        product: saleitem.product,
        quantity: saleitem.quantity,
        price: saleitem.price,
        amount: saleitem.amount,
        customer: saleitem.customer
      }
    },
    changeFirstName: function(){
      this.$store.commit('changeFirstName', this.newname)
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
    padding: 10px 100px;
    display: flex;
    justify-content: space-between;
  }

  .user {
    font-size: 0.8em;
    padding-right: 20px;
  }
  .content {
    background: #F6F6F6;
    padding: 0px;
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
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

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
