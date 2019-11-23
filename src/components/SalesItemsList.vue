<template>
    <div class="outerframe">
        <div class="daynavcontainer navgrp"
            >
            <span class="">{{today}}</span>
            <div class="butgrp">
                <button
                    class="previous-but but-day mr-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18.333" height="20" viewBox="0 0 18.333 20">
                        <path id="Polygon_11" data-name="Polygon 11" class="cls-1" d="M10,0,20,18.333H0Z" transform="translate(0 20) rotate(-90)"/>
                    </svg>
                </button>
                <button
                    class="next-but but-day"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18.333" height="20" viewBox="0 0 18.333 20">
                        <path id="Polygon_12" data-name="Polygon 12" class="cls-1" d="M10,0,20,18.333H0Z" transform="translate(18.333) rotate(90)"/>
                    </svg>
                
                </button>
            </div>
        </div>
        <div class="maincase mt-2">
            <div class="head" >
                <span
                    v-for="headeritem in header" :key=headeritem.id
                    v-bind:class="headeritem.column"
                >{{ headeritem.title }}
                </span>
            </div>
            <div class="items">
                <div
                    class="item"
                    v-for="item in itemsfordisplay" :key=item.Product
                >
                    <span class="column1">{{ item.product.title }}</span>                    
                    <span class="column2">{{ item.quantity }}</span>
                    <span class="column3">{{ item.price }}</span>
                    <span class="column4">{{ item.amount }}</span>
                    <span class="column5">
                        <a
                            class="iconbut"
                            @click.prevent="deletesaleline(item)"
                        >
                            <delete-icon
                            >
                            </delete-icon>
                        </a>
                        <a
                            class="iconbut"
                            @click.prevent="editsaleitem(item)"
                        >
                            <edit-icon
                                class="ml-2"
                            >
                            </edit-icon>
                        </a>
                    </span>
                </div>
            </div>
        </div>
        <div class="lowerbar mt-2">
            <span>Total Sale: <strong>N{{totalsales}}</strong></span>
            <div class="navgrp">
                <span class="pagination">Page: {{paginationdata.currentpage.title}} / {{numberofpages}}</span>
                <div class="butgrp">
                    <button
                        class="previous-but but mr-2"
                        @click.prevent="gotoPreviousPage"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18.333" height="20" viewBox="0 0 18.333 20">
                            <path id="Polygon_11" data-name="Polygon 11" class="cls-1" d="M10,0,20,18.333H0Z" transform="translate(0 20) rotate(-90)"/>
                        </svg>
                    </button>
                    <button
                        class="next-but but"
                        @click.prevent="gotoNextPage"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18.333" height="20" viewBox="0 0 18.333 20">
                            <path id="Polygon_12" data-name="Polygon 12" class="cls-1" d="M10,0,20,18.333H0Z" transform="translate(18.333) rotate(90)"/>
                        </svg>
                        
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ItemListMixin from './mixins/ItemListMixin.vue';
import DeleteIcon from './icons/DeleteIcon.vue';
import EditIcon from './icons/EditIcon.vue';

import { mapState } from 'vuex';

export default {
  name: 'SalesItemsList',
  mixins: [ItemListMixin],
  components: {
      'delete-icon': DeleteIcon,
      'edit-icon': EditIcon
  },
  props: {
        value: {
            type: Array,
            default: function() {
                return [
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
                  'Product':'Sliced Loaf',
                  'Quantity': 100,
                  'Price': 250.00,
                  'Amount': 25000.00,
              }
            ]
            }
        },
  },
  data: function(){
      return {
        header:[
                {id:1, title:'Product', column:'column1'},
                {id:2, title:'Quantity', column:'column2'},
                {id:3, title:'Price', column:'column3'},
                {id:4, title:'Amount', column:'column4'},
                {id:5, title:'Action', column:'column5'}
            ],
        }
    },
    computed: mapState({
        // salesitemsold: {
        //     get() {return this.value},
        //     set(items){this.$emit('input', items)}
        // },
        items: function(){
            return this.$store.getters.usersales
        },
        //items: state => state.sales.items,
        totalsales: function(){
            return this.$store.getters.totalsales
        },
        today: function(){
            var today = new Date()
            return today.toDateString()
        }
    }),
    watch: {
    
    },
    methods:{
        gotoNextPage: function(){
            if (this.paginationdata.currentpage.title < this.numberofpages){
                this.paginationdata.currentpage = this.getNextPage()
                this.resetactivepages()
                this.paginationdata.currentpage.active = true
            }            
        },
        gotoPreviousPage: function(){
            var activepage = this.getActivePage()
             //alert('activepage: '+activepage.title)
            //alert(activepage)
            if(activepage.title > 1){
                var previousPage = this.getPage(activepage.title - 1)
                //alert('previousPage: '+previousPage.title)
                this.resetactivepages()
                previousPage.active = true
                this.paginationdata.currentpage = previousPage

            }
        },
        deletesaleline:function(item){
            var itemindex = this.salesitems.indexOf(item)
            //alert(itemindex)
            this.salesitems.splice(itemindex,1)
        },
        editsaleitem: function(item){
            this.$emit('editsaleitem', item)
        },
    }
}   
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .outerframe {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;  
    }

    .maincase {
        width: 100%;
        background: #fff;
        border-radius: 10px 10px 10px 10px;
    }

    .head {
        height: 25px;
        background: #cecece;
        border-radius: 10px 10px 0 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-weight: bold;
        color: #000;
        font-size: 0.7em;
    }

    .lowerbar{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-content: center;
        align-items: center;
        font-size: 0.8em;
    }

    .but-day{
        background: #cecece;
        border-color: #cecece;
        border-radius: 15px; 
        border-style: solid;
        border-width: 3px;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.16);
    }

    .but{
        background: #75BCE9;
        border-color: #75BCE9;
        border-radius: 15px; 
        border-style: solid;
        border-width: 3px;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.16);
    }

    .next-but{
        padding: 5px 10px 5px 15px;
    }

    .previous-but{
        padding: 5px 15px 5px 10px;
    }

    button:hover {
        box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.16);
    }

    button:active {
        background: #3289B3;
        border-color: #3289B3;
        box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.16);
    }

    .cls-1 {
        fill: #fff;
    }

    .daynavcontainer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 0.8em;
        width: 100%; 
    }

    .items{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 0.6em;
    }

    .item{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    
    .item > span{
        padding: 5px;
    } 

    .navgrp {
        display: flex;
        align-items: center;
        font-size: 0.8em;
    }

    .navgrp > span {
        margin-right: 20px;
    }

    .iconbut {
        border-width: 0px;
        border-style: none;
        background: rgba(255, 255, 255, 0.424);
    }

    .column1 {
        width: 30%;
        text-align: left;
        padding-left: 10px;
    }

    .column2 {
        width: 20%;
        text-align: center; 
    }
    .column3 {
        width: 10%;
        text-align: center;
    }
    .column4 {
        width: 20%;
        text-align: center;
    }
    .column5 {
        width: 20%;
        text-align: center;
    }

      /* If the screen size is 600px wide or less, hide the element */
  @media only screen and (max-width: 890px) {

    .lowerbar{
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        font-size: 0.8em;
        padding-bottom: 10px;
    }

    .navgrp {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 0.8em;
    }

    .navgrp > span {
        margin-right: 0;
    }

    .daynavcontainer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 0.8em;
        width: 100%; 
    }

    


    
    
  }

</style>
