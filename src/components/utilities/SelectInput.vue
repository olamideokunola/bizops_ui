// Select Input
<template>
    <div class="inputcontainer">
        <label>{{ title }}</label>
        <div class="dropdown">
            <input
                class="form-control" 
                v-bind:name="iteminputname"
                v-bind:style=styles.inputboxstyle
                id="inputid"
                v-model="searchtext"
                type="text"
                autocomplete="off"
            />
            <div class="dropdown-content">
                <ul
                    v-bind:style="[
                        styles.ulstyle, 
                    ]"
                    v-show=showselectionlist
                    v-for="item in filteredSelection"
                    :key=item.id    
                    >
                    <li
                        v-bind:style="[
                            styles.listyle, 
                            borderradius(item.id, items.length),
                            highlightonmouseover(item),
                        ]"
                        @mouseover='highlight(item)'
                        @mouseout='unhighlight(item)'
                        
                        @click='selectItem(item)'
                        >
                        {{item.title}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SelectInput',
    data: function () {
        return {
            selecteditemvalue: {},
            showselectionlist: true,
            //@click='showselectionlist=true'
            //@onfocusout='showselectionlist=false'
            filteredValues: [],
            styles: {
                inputboxstyle:{
                    'border-radius': '5px',
                    'border-style': 'solid',
                    'border-color': '#eeeeee',
                    'background-color': 'white',
                    'background-image': '',
                    'background-position': 'right',
                    'background-repeat': 'no-repeat',
                    'padding': '10px 20px 10px 10px',
                    'background-size':'20px 20px',
                    'width': '100%'
                },
                ulstyle:{
                    'background-color': 'white',
                    'list-style-type': 'none',
                    'margin': '0',
                    'padding': '0',
                    'border-color': '#eeeeee',
                    'border-style': 'solid',
                    'border-width': '1px',
                },
                listyle: {                    
                    'background': this.bgcolor,    
                    'margin': '0',
                    'padding': '5px 10px',
                },
            }
        }
    },
    props: {
        title:{
            type: String,
            default: ''
        },
        items:{
            type: Array,
            default: function(){ 
                return [
                    {'id': 1, 'title':'Hygiene', 'active':false},
                    {'id': 2, 'title':'5S', 'active':false},
                    {'id': 3, 'title':'Housekeeping', 'active':false},
                ]
            }
        },
        'inputid': {
            type: String
        },
        'iteminputname':{
            type: String
        },
        value: {
            type: String,
            default: ''
        }
    },
     computed: {
        selecteditem: {
            get(){return this.selecteditemvalue},            
            set(selecteditem) {
                //this.selecteditemvalue = nselecteditem
                this.$emit('itemselected', selecteditem)     
            }
        },
        searchtext: {
            get(){return this.value},
            set(searchtext) {
                this.$emit('input', searchtext)
            }
        },
        filteredSelection: function(){   
            var filtereditems = this.items.filter(this.filterWithSelection)
            return filtereditems
        },
        
    },
    methods: {
        filterWithSelection: function (value){
            if(value.title.indexOf(this.searchtext) > -1){
                value.active=false
                return value
            }
        },
        selectItem: function(item){
            //alert(item.title)
            this.searchtext=item.title
            this.selecteditem=item
            //this.showselectionlist=false
        },
        highlight: function(item){
            item.active=true
            // this function is called because of a change in this.styles.listyle not because of item.active
            this.styles.listyle = {                       
                'margin': '0',
                'padding': '5px 10px',
            }
        },
        unhighlight: function(item){
            item.active=false
            
        },
        
        borderradius: function(id, totalnumberofitems){
            var borderradius
            if(id == 1){
                borderradius = '5px 5px 0 0'
            } else if(id == totalnumberofitems) {
                borderradius = '0 0 5px 5px'
            } else{
                borderradius = '0'
            }
            return {
                'border-radius': borderradius,
            }
        },
        highlightonmouseover: function(item){
            var backgroundColor;
            var color;
            var fontweight;

            if (item.active == true){
                backgroundColor = '#dddddd'
                color = '#3150A8'
                fontweight='bold'            
            } else {
                backgroundColor = '#ffffff';
                color = '#8E8E8E'
                fontweight='normal'
            }
            return {
                'color': color,
                'font-weight': fontweight,
                'background': backgroundColor,  
            }
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    input {
        background: #F6F6F6;
    }

    ul > li {
        text-align: left
    }

    .inputcontainer{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 0.75em;
    }

    .dropdown {
        position: relative;
        display: inline-block;
        width: 100%
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        width: 100%;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .dropdown:focus-within .dropdown-content{
        display: block;
        background: #ff0;
    }

   .dropdown-content:hover {
        display: block;
    }
</style>

