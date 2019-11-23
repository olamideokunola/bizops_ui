// ItemList component

<template>
  <div class="maincontainer">
    <ul
        class="list-group list-group-flush temp" 
        v-for="item in itemsfordisplay" 
        :key="item.id"
        v-bind:style="[ulstyles]"
        >
        <li 
            class="list-group-item p-0 pl-2"
            v-bind:style="[itemliststyles, highlightItem(item)]"
            v-on:mouseover="item.active=true"
            v-on:mouseout="item.active=false"
            >
            <dl class="p-0 m-1">
                <dt>
                    [[ item.title ]]
                </dt>
                <dd 
                    v-bind:class=itemstatus(item)
                    >
                    [[ item.status ]] 
                </dd>
            </dl>
            <div>
                <button 
                    class="btn"
                    v-if=showdelete
                    @click='deleteitem(item)'
                    >
                    <i class="fa fa-trash-o" style="font-size:14px"></i>
                </button>
                <button 
                    class="btn"
                    v-if=showedit
                    >
                    <i class="fa fa-pencil-square-o" style="font-size:14px"></i>
                </button>
            </div>
        </li>
    </ul>
    <ul 
        class="pagination pagination-sm justify-content-center mt-4 mb-2"
        v-if="pages.length>1"
        >
            <li 
                class="page-item"                        
            >
                <a 
                    class="page-link" 
                    @click.prevent="gotoPreviousPage"
                    >
                    back
                </a>
            </li>
            <li 
                class="page-item"                        
                v-for="paginationlink in firstthreepages"
                :key=paginationlink.title
                >
                
                    <a 
                        class="page-link" 
                        href="#"
                        @click.prevent="gotoPage(paginationlink)"
                        v-bind:style="[pagelinkstyle(paginationlink)]"
                        >
                        [[ paginationlink.title ]]
                    </a>
            </li>
            <li 
                class="page-item"     
                v-if="pages.length>3"                  
                >
                    <a 
                        class="page-link" 
                        >
                        ...
                    </a>
            </li>
            <li 
                class="page-item"                        
                v-for="paginationlink in lastpage"
                
                :key=paginationlink.title
                >3"
                >
                
                    <a 
                        v-if="pages.length"
                        class="page-link" 
                        href="#"
                        @click.prevent="gotoPage(paginationlink)"
                        v-bind:style="[pagelinkstyle(paginationlink)]"
                        >
                        [[ paginationlink.title ]]
                    </a>
            </li>
            <li 
                class="page-item"                        
            >
                <a 
                    class="page-link" 
                    @click.prevent="gotoNextPage"
                    >
                    >
                </a>
            </li>
        </ul>
    </div>
</template>

<script>


export default {
    name: 'ItemListMixin',
    components: {

    },
    props: {
        value: {
            type: Array,
            default: function() {
                return []
            }
        },
        showedit: {
            type: Boolean,
            default: true
        },
        showdelete: {
            type: Boolean,
            default: true
        },
        itemsperpage: {
            type: String,
            default: '3'
        },
        highlightstyles: {
            type: Object,
            default: function(){
                return {
                    borderstyles: {
                        borderLeftStyle: '0px solid blue',
                    },
                    backgroundstyles: {
                        backgroundColor: '#eeeeee'
                    }
                }
            }
        }
    },
    data: function () {
        return {
            ulstyles: {
                'border-color': '#dddddd',
                'border-style': 'solid',
                'border-width': '1px 0 0 0'
            },
            itemliststyles: {
                display: 'flex',
                'justify-content': 'space-between',
                'font-size': '0.75em',
            },
            selectedpagestyles: {
                'background': '#F9F98B',
            },
            unselectedpagestyles: {
                'background': '#ffffff',
            },
            startindex: 0,
            selecteditem: {},
            paginationdata: {
                firstbuttonpage: 1,
                startat: 0,
                currentpage: {
                    title: 1,
                    active: true,
                    startindex: 0,                    
                    endindex: this.itemsperpage - 1
                },
                itemsperpage: this.itemsperpage,
                items: this.items,
                pages: []
            }
        }
    },
    computed: {
        items: {
            get() {return this.value},
            set(items){this.$emit('input', items)}
        },
        numberofpages: function () {
            return Math.ceil(this.items.length/Number(this.itemsperpage))
        },
        itemsfordisplay: function(){
            //alert( this.paginationdata.currentpage.startindex)
            var startindex = this.paginationdata.currentpage.startindex
            var endindex = this.paginationdata.currentpage.endindex
            //alert(this.items.length)
            return this.items.slice(startindex, endindex + 1)
        },

        firstthreepages: function(){
            return this.pages().slice(this.paginationdata.startat, this.paginationdata.startat + 3)
        },
        lastpage: function(){
            return this.pages().slice(-1)
        }
    },
    methods: {
        pages: function(){
            function addPage(startindex, endindex, title, items, pages){     
                //alert('endindex ' + endindex)
                var page = {
                    'title': title,
                    'active': false,
                    //'items': items.slice(startindex, endindex),
                    'startindex': startindex,
                    'endindex': endindex,
                }
                if(startindex == 0){
                    page.active = true
                }
                pages.push(page)
            }

            this.paginationdata.pages = []
            // create pages with page items
            for(var i = 0; i < this.numberofpages; i++){
                var startindex = this.paginationdata.itemsperpage * i
                var endindex = startindex + (this.paginationdata.itemsperpage - 1)
                //alert('numberofpages ' + this.numberofpages)
                //alert('startindex ' + startindex)
                //alert('endindex ' + endindex)
                //alert('itemsperpage ' + (this.paginationdata.itemsperpage - 1) )
                addPage(startindex, endindex, i+1, this.items,this.paginationdata.pages)
            }

            //alert('xxxxxxxxxxxxx - number of pages: ' + this.paginationdata.pages.length)
            
            return this.paginationdata.pages
        },   
        getActivePage: function(){
            function checkActive(page) {
                //alert('In checkActive '+ page.title + ': ' + page.active)
                return page.active == true;
            }
            //('page.active '+ this.paginationdata.pages[0].active)
            //alert('page.active '+ this.paginationdata.pages[1].active)
            return this.paginationdata.pages.find(checkActive);
        },
/*         getPage:function(pageTitle){
            function checkTitle(page) {
                return page.title == pageTitle;
            }
            return this.pages.find(checkTitle);
        }, */
        getNextPage: function(){
           // alert('In getNextPage')
           // alert('In getNextPage, currentpage is: ' + this.paginationdata.currentpage.title)
           // alert('In getNextPage, numberofpages: ' + this.numberOfPages())
            if(this.paginationdata.currentpage.title < this.numberOfPages()){
                var pageid = this.paginationdata.currentpage.title + 1
                return this.getPage(pageid)
            }            
        },
        getPreviousPage: function(){
           
            if(this.paginationdata.currentpage.title > 1){
                var pageid = this.paginationdata.currentpage.title - 1
                return this.getPage(pageid)
            }   
        },
        getLastPage: function(){
            this.paginationdata.currentpage = this.numberOfPages
            return this.getPage(this.numberOfPages)
        },
        getFirstPage: function(){
            this.paginationdata.currentpage = {
                title: 1,
                startindex: 0,
                endindex: this.itemsperpage - 1
            }
            return this.getPage(1)
        },
        numberOfPages: function(){
            return this.pages().length
        },
        getPage: function(pgtitle){
            for(var i = 0; i < this.pages().length; i++){
                if(this.pages()[i].title == pgtitle){
                    // Set the firstbuttonpage if > 4 else keep it as 1
                    if(pgtitle > 4){
                        this.paginationdata.firstbuttonpage = pgtitle
                    } else {
                        this.paginationdata.firstbuttonpage = 1
                    }
                    return this.pages()[i]
                }
            }
        },
        removeItem: function(item){
            function checkTitle(itemtodelete) {
                return itemtodelete.title == item.title;
            }
            var index = this.items.findIndex(checkTitle)
            this.items.splice(index,1)
        },
        resetactivepages: function(){
            for(var i = 0; i < this.paginationdata.pages.length; i++){
                this.paginationdata.pages[i].active = false
                //alert(this.paginationdata.pages[i].title+ " is: " + this.paginationdata.pages[i].active)
            }
        },
        pagelinkstyle: function(paginationlink){
            if(paginationlink.active == true){
                return this.selectedpagestyles
            } else {
                return this.unselectedpagestyles
            }
        },
        itemstatus: function(item){
            var badge = 'badge'
            var statusstyle = ''
            var margin = 'm-0'


            if(item.status == 'Approved'){
                statusstyle = 'badge-primary'
            } else {
                statusstyle = 'badge-danger'
            }
            return [
                badge,
                statusstyle,
                margin
            ]
        },
        highlightItem: function(item){
            var borderLeftStyle;
            var backgroundColor;
            

            if (item.active == true){
                borderLeftStyle = this.highlightstyles.borderstyles.borderLeftStyle;
                backgroundColor = this.highlightstyles.backgroundstyles.backgroundColor;
            } else {
                borderLeftStyle = '0px';
                backgroundColor = '#ffffff'
            }

            return {
                'border-left': borderLeftStyle,
                'background-color': backgroundColor
            }
        },
        gotoPage: function(paginationlink){
            this.paginationdata.currentpage = this.getPage(paginationlink.title)
            this.resetactivepages()
            paginationlink.active = true
        },
        isvisible: function(pagenum){
            
            for(var i = 0; i < 3 ; i++){
                if(this.firstthreepages[i].title == pagenum){
                    return true
                }                
            }
            if(this.lastpage[0].title == pagenum){
                return true
            }
            
            return false
        },
        checkPages: function(){
            alert('In gotoNextPage: ' + this.paginationdata.pages[0].active)
            alert('In gotoNextPage: ' + this.paginationdata.pages[1].active)
        },
        gotoNextPage: function(){
            this.paginationdata.currentpage = this.getNextPage()
            //alert("nextPage "+this.paginationdata.currentpage.title)
            var activepage = this.getActivePage()
            if(activepage.title < this.pages().length){

                var nextPage = this.getPage(activepage.title + 1)
                //alert("nextPage "+nextPage.title + " status "+nextPage.active)

                this.resetactivepages()
                nextPage.active = true

                this.paginationdata.currentpage = nextPage
                //this.checkPages()
                // If next page is not visible 
                if(nextPage.title <= this.pages().length){
                    if(this.isvisible(nextPage.title) == false){
                        
                        // if not:
                            // Check if next page is not equal to the lastpage
                            if(nextPage.title != this.lastpage[0].title){   
                                
                                // Check if next page is larger than the last of first three
                                if(nextPage.title > this.firstthreepages[2].title){
                                    
                                    // if it is make it the last of the first three
                                    var startpos = nextPage.title - 3
                                    
                                    this.paginationdata.startat = startpos
                                }
                            }
                            // Check if next page is less than the first of the first three
                                // if it is make it the first of the first 3
                        // if visible
                            // Do nothing
                    }
                }  
                //this.checkPages()
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
                
                //paginationlink.active = true
                // If next page is not visible 
                if(previousPage.title >= 0){
                    if(this.isvisible(previousPage.title) == false){
                        
                        // if not:

                                
                            // Check if previous page is less than the first of first three
                            if(previousPage.title < this.firstthreepages[0].title){
                                
                                // if it is make it the last of the first three
                                var startpos = previousPage.title - 1
                                //var endpos = nextPage.title
                                
                                this.paginationdata.startat = startpos
                                //alert(startpos + ' is startpos')
                                //alert(this.firstthreepages[0].title + ' is this.firstthreepages')
                            }
                            
                                
                            // Check if next page is less than the first of the first three
                                // if it is make it the first of the first 3
                        // if visible
                            // Do nothing
                    }
                }  
            }
        },
        deleteitem: function(item){
            function checkTitle(itemtodelete) {
                return itemtodelete.title == item.title;
            }
            var index = this.items.findIndex(checkTitle)
            this.items.splice(index,1)
        }
    },
}   
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
