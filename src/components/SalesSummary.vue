<template>
  <div class="main">
    <h6>{{title}}</h6>

    <sales-list
      class="salessummarylist"
      v-model=salessummaryitems
      :totalsales=totalsales
      v-bind:showedit=showedit
      v-bind:showdelete=showdelete
      v-bind:highlightstyles=styles.highlightstyles
      itemsperpage=6
      >
    </sales-list>
    

  </div>
</template>

<script>
import SalesSummaryList from './SalesSummaryList.vue';

import { mapState } from 'vuex';

export default {
  name: 'NewSale',
  components: {
    'sales-list': SalesSummaryList,
  },
    data: function(){
        return {
            title: 'Sales Summary',
            product: {},
            selectedclient: '',
            styles: {
                highlightstyles:{
                    borderstyles: {
                        borderLeftStyle: '0px solid blue',
                    },
                    backgroundstyles: {
                        backgroundColor: '#eeeeee'
                    }
                },
                inputgroupstyle:{
                    'display': 'flex',
                    'justify-content': 'flex-start',
                    'flex-grow': '6'
                },
                inputgroupmemberstyle:{
                    'flex-grow': '6'
                },
                buttoncontainerstyle: {
                    'display': 'flex',
                    'justify-content': 'flex-end',
                },
                buttonstyle:{
                    buttonstyle: true
                }
            },
            
            showedit: false,
            showdelete: false,
            showsearchresults: false,
        }
    },
    props: {
        totalsales: {
            type: Number
        },
        salesitemsold: {
            type: Array,
            default: function(){
                return  [
                    {
                        'product':{id: 1, title: 'Large Loaf'},
                        'quantity': 10,
                        'price': 350.00,
                        'amount': 3500.00,
                    },
                    {
                        'product':{id: 2, title: 'Large Loaf'},
                        'quantity': 10,
                        'price': 350.00,
                        'amount': 3500.00,
                    },
                    {
                        'product':{id: 3, title:'Large sliced'},
                        'quantity': 100,
                        'price': 350.00,
                        'amount': 35000.00,
                    },
                    {
                        'product':{id: 4, title:'Large sliced'},
                        'quantity': 100,
                        'price': 350.00,
                        'amount': 35000.00,
                    },
                    {
                        'product':{id: 5, title:'Coconut Loaf'},
                        'quantity': 100,
                        'price': 400.00,
                        'amount': 40000.00,
                    }
                ]
            }
            }
    },
    methods: {

    },
    computed:  mapState({
        salesitems: state => state.sales.items,
        salessummaryitems: function(){
            // get unique list of products from the sales items list
            var uniqueproductids = []
            var salessummary = []
            this.salesitems.forEach(function addUnique(item) {
                if(!uniqueproductids.includes(item.product.id)){
                    uniqueproductids.push(item.product.id)
                    salessummary.push({
                        id: item.product.id,
                        product: item.product,
                        quantity: 0,
                        price: 0,
                        amount: 0
                    })
                }
            })
            
            // get the total quantity and average price per product            
            var salesitems = this.salesitems
            
            salessummary.forEach(function(summaryline){
                // get all quantity for each product into an array
                var quantities = []              
                salesitems.forEach(function(saleitem){
                    if(saleitem.product.id===summaryline.id){
                        quantities.push(saleitem.quantity)
                    }
                })
                // sum the quantities
                var totalquantity = quantities.reduce(function(total, quantity){
                    return Number(total) + Number(quantity)
                })

                
                // get all prices for each product into an array
                var prices = []              
                salesitems.forEach(function(saleitem){
                    if(saleitem.product.id===summaryline.id){
                        prices.push(saleitem.price)
                    }
                })
                // sum the prices
                var totalofprices = prices.reduce(function(total, price){
                    return Number(total) + Number(price)
                })
                // find average of the prices
                var averageprice = totalofprices / prices.length

                // put summary calculations into the summary
                summaryline.quantity = totalquantity
                summaryline.price = averageprice
                summaryline.amount = averageprice * totalquantity
            })
            return salessummary
            //  return uniqueproductids
        }
    })
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
    margin: 0;
    border-radius: 25px;
    padding: 20px 40px 10px 40px;          
    background: #DDE6EC;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: flex-start;
    align-content: space-between;
}

.salessummarylist {
  height: 100%;
  width: 100%;
}

h6 {
    padding: 10px 0px;
    font-weight: bold;
    margin: 0;
}

</style>
