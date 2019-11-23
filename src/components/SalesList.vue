<template>
  <div class="main">
    <h6>{{title}}</h6>

    <sales-list
      class="saleslist"
      v-model=salesitems
      v-on:editsaleitem="editsaleitem($event)"
      v-bind:showedit=showedit
      v-bind:showdelete=showdelete
      v-bind:highlightstyles=styles.highlightstyles
      itemsperpage=6
      >
    </sales-list>

  </div>
</template>

<script>
import SalesItemsList from './SalesItemsList.vue';

export default {
  name: 'NewSale',
  components: {
    'sales-list': SalesItemsList,
  },
    data: function(){
        return {
            title: 'Sales List',
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
        salesitems: {
            type: Array,
            default: function(){
                return  [
                    {
                        'Product':'Large Loaf',
                        'Quantity': 10,
                        'Price': 350.00,
                        'Amount': 3500.00,
                    },
                    {
                        'Product':'Medium Loaf',
                        'Quantity': 30,
                        'Price': 250.00,
                        'Amount': 3500.00,
                    },
                    {
                        'Product':'Large sliced',
                        'Quantity': 100,
                        'Price': 350.00,
                        'Amount': 35000.00,
                    },
                    {
                        'Product':'Medium sliced',
                        'Quantity': 100,
                        'Price': 250.00,
                        'Amount': 25000.00,
                    },
                    {
                        'Product':'Coconut Loaf',
                        'Quantity': 100,
                        'Price': 400.00,
                        'Amount': 40000.00,
                    }
                ]
            }
            }
    },
    methods: {
        editsaleitem: function(item){
            this.$emit('editsaleitem', item)
        },
    }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
    margin: 0;
    border-radius: 25px;
    padding: 20px 40px 0 40px;          
    background: #DDE6EC;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: flex-start;
    align-content: space-between;
}

.saleslist {
  height: 100%;
  width: 100%;
}

h6 {
    padding: 10px 0px;
    font-weight: bold;
    margin: 0;
}

</style>
