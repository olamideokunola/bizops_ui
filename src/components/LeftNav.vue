<template>
    <div class="leftnav">
        <ul
            v-for="menuitem in menuitems" v-bind:key="menuitem.title">
            <li 
                v-on:mouseover="setmouseovercolor(menuitem)"
                v-on:mouseout="setmouseoutcolor(menuitem)"
                
            >
                <button
                    @click="emitmenuevent(menuitem)"
                    >
                    <component
                        v-bind:is='menuitem.icon'
                        v-bind:mouseovermenuitem='sharedState.currentmenuitem'
                        :backgroundactivecolor='menuitem.bgcolor'
                    ></component>
                    <span class="pl-2">{{menuitem.title}}</span>                
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import AddIcon from './icons/AddIcon.vue';
import CalendarIcon from './icons/CalendarIcon.vue';
import SummaryIcon from './icons/SummaryIcon.vue';

var store = {
    debug: true,
    state:{
        currentmenuitem: {}
    }
}

export default {
  name: 'LeftNav',
  components: {

  },
  props: {
    menuitems: {
        type: Array,
        default: function(){
            return [
                {title: 'Action 1', icon: AddIcon, active:false, hover:false, bgcolor:'#cecece'},
                {title: 'Action 2', icon: CalendarIcon, active:false, hover:false, bgcolor:'#cecece'},
                {title: 'Action 3', icon: SummaryIcon, active:false, hover:false, bgcolor:'#cecece'}
            ]
        }
    }
  },
  data: function(){
      return {
          sharedState: store.state
      }
  },
  watch: {
    'sharedState.currentmenuitem': function(){
      //alert()
    }
  },
  methods:{
    getImgUrl(pic) {
        return require('../assets/'+pic)
    },
    setmouseovercolor(menuitem){
        this.sharedState.currentmenuitem = menuitem
        this.sharedState.currentmenuitem.hover = true
        this.sharedState.currentmenuitem.bgcolor='#FCD505'
    },
    setmouseoutcolor(menuitem){
        this.sharedState.currentmenuitem = menuitem
        this.sharedState.currentmenuitem.hover = false
        this.sharedState.currentmenuitem.bgcolor='#cecece'
    },
    emitmenuevent(menuitem){
        this.$emit(menuitem.eventname)
    }
  }
}   
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .leftnav {
        width: 100%;
        height: 350px;
        background: rgba(206, 206, 206, 0.40);
        margin: 0px;
        padding: 10px 10px;
        border-radius: 0 25px 25px 0; 
    }
    ul{
        font-size: 0.7em;
        text-align: left;
        list-style: none;
        padding: 0px;
        margin: 0px;
    }
    li{
        padding: 5px;
    }

    img:hover {
        box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
    }
    li:hover{
        font-weight: bold;
        background:  rgba(255, 255, 255, 0.3);
        border-radius: 10px;
    }
    button {
        padding: 0;
        margin: 0;
        border: none;
        background: rgba(255, 255, 255, 0);
        width: 100%;
        display: flex;
        align-items: center;
    }

    button:hover {
        background:  rgba(255, 255, 255, 0.3);
    }

    button:active{
        background:  rgba(255, 255, 255, 0.6);
    }
</style>
