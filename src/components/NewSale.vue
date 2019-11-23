<template>
  <div 
    class="sale"
    :class="{ newsale: isedit==false, editsale: isedit==true }"
    >
    <h6>{{title}}</h6>

    <select-input
      class="textinput mt-4 mb-3"
      title='Product'
      iteminputname='Product'
      v-model=selectedproduct
      v-on:itemselected="setproduct($event)"
      :items=products
      >
    </select-input>

    <div class="grouped-input">
      <text-input
        class="textinput"
        title='Quantity'
        titleinputname='Quantity'
        v-model=quantity
      >
      </text-input>

      
      <text-input
        class="textinput"
        title='Price'
        titleinputname='Price'
        v-model=product.price
        v-show="oneprice==true"
      >
      </text-input>

      <select-input
        class="textinput"
        title='Price'
        iteminputname='Price'
        v-model=selectedprice
        v-on:itemselected="setprice($event)"
        :items=product.prices
        v-show="oneprice==false"
        >
      </select-input>
    </div>

    <select-input
        class="textinput"
        title='Customer'
        iteminputname='Customer'
        v-model=selectedcustomer
        v-on:itemselected="setcustomer($event)"
        :items=customers
        >
      </select-input>

    <div
      class="but mt-4 mb-4"
    >
      <button
        @click=setNewSale()
        v-if="isedit==false"
      >
        Create new sale
      </button>

      <button
        @click=setSaleForEdit()
        v-if="isedit==true"
      >
        Update sale
      </button>
    </div>
  </div>
</template>

<script>
import TextInput from './TextInput.vue';
import SelectInput from './utilities/SelectInput.vue'

export default {
  name: 'NewSale',
  components: {
    'text-input': TextInput,
    'select-input': SelectInput
  },
  data: function(){
      return {
        
        product: {
          'id': 0,
          'title': '',
          price: '',
          prices: []
        },
        customer: {
          'id': 0,
          'title': '',
        },
        quantity: '',
        selectedproduct: '',
        selectedprice: '',
        selectedcustomer: '',
        products: [
          {
            'id': 1,
            'title': 'Large loaf',
            price: '350',
            prices: []
          },
          {
            'id': 2,
            'title': 'Medium loaf',
            price: '250',
            prices: []
          },
          {
            'id': 3,
            'title': 'Large sliced',
            price: '350',
            prices: []
          },
          {
            'id': 4,
            'title': 'Medium sliced',
            price: '250',
            prices: []
          },
          {
            'id': 5,
            'title': 'Sardine loaf',
            price: '400',
            prices: []
          },
          {
            'id': 6,
            'title': 'Donuts',
            price: '',
            prices: [{id: 1, title:'2000'}, {id:2, title:'2500'}]
          }
        ],
        customers: [
          {
            'id': 0,
            'title': 'Aunty Nurse',
          },
          {
            'id': 1,
            'title': 'Mallam LSDPC',
          }
        ]
      }
  },
  props: {
    title: {
      type: String,
      default: 'New Sales',
    },
    buttontext: {
        type: String,
        default: 'Create new sale'
      },
      sale: { 
        type: Object,
        default: function(){
          return {
            product:{},
            quantity:'',
            price: '',
            customer: '',
            amount: '',
          }
        }
      },
  },
  computed: {
    oneprice: function(){
      var hasoneprice
      if(this.product.prices.length>0){
        hasoneprice=false
      } else {
        hasoneprice=true
      }
      return hasoneprice
    },
    isedit: function(){
      if(this.title=="Edit Sale"){
        return true
      } else {
        return false
      }
    },
  },
  watch: {
    sale: function(){
      //copy sale params to ui vmodels when the sale is triggered for edit
      this.selectedproduct = this.sale.product.title
      this.product.price = this.sale.price
      this.selectedcustomer = this.sale.customer.title
      this.quantity = this.sale.quantity
      this.sale.amount=(this.quantity * this.product.price)
    }
  },
  methods: {
    setproduct: function(selecteditem){
      //alert('---In addToSelection' + selecteditem)
      this.product=selecteditem  
    },
    setprice: function(selecteditem){
      //alert('---In addToSelection' + selecteditem)
      this.product.price=selecteditem.title
    },
    setcustomer: function(selecteditem){
      //alert('---In addToSelection' + selecteditem)
      this.customer=selecteditem
    },
    setSaleParams: function(){
      this.sale.product=this.product
      this.sale.price=this.product.price
      this.sale.customer=this.customer
      this.sale.quantity=this.quantity
      this.sale.amount=(this.quantity * this.product.price)
    },
    setNewSale: function(){
      this.setSaleParams()
      this.$emit('newsale', this.sale)
    },
    setSaleForEdit: function(){
      this.setSaleParams()
      this.$emit('editsale', this.sale)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sale{
    margin: 0;
    border-radius: 25px;
    padding: 20px;          
    
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: flex-start;
}

.newsale{
    background: #fff;
}

.editsale{
    background: #ddd;
}

.sale > div{

}

.textinput {
    padding: 0px 20px;
    width: 100%;
}

h6 {
    padding: 10px 20px;
    font-weight: bold;
    margin: 0;
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

.but{
  padding: 0px 20px;
  width: 100%;
}

.grouped-input{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
