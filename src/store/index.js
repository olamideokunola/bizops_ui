import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    firstname: 'Olamide',
    sales: {
      totalsales:0,
      salesdate:'',
      items: [] 
    },
    sale: {},
    user: {
      id:0,
      isAuthenticated: false,
      email:'',
      password: '',
      groups:[],
      authorizations: {}
    },
    users:[
      {
        id:1,
        isAuthenticated: false,
        email:'olamide@favychos.com',
        password: 'allow',
        groups: ['manager','salesman'],
        authorizations:{
          'sales': ['create', 'edit', 'view', 'retrieve', 'reports']
        }
      },
      {
        id:2,
        isAuthenticated: false,
        email:'joy@favychos.com',
        password: 'allow',
        groups: ['salesman'],
        authorizations:{
          'sales': ['create', 'edit', 'view', 'retrieve', 'reports']
        }
      },
    ],
    // Views UI Data
    AppUiData:{
      mainHeaderTitle: 'BizOps',
      mainNavItems: [
        {title: 'Home', active: false, path: '/', visible: true},
        {title: 'Sales',  active: false, path: '/sales', visible: true},
        {title: 'Production', active: false, path: '/sales', visible: true},
        {title: 'Users', active: false, path: '/login', visible: true},
        // {title: 'Login', active: false, path: '/login', visible: true},
        // {title: 'Logout', active: false, path: '/login', visible: false},
      ]
    },
    SalesViewUiData: {
      
    }
  },
  getters: {
    usersales:state => {
      if(state.user.groups.includes('manager')){
        return state.sales.items
      } else if(state.user.groups.includes('salesman')){
        //alert('In include salesman!')
        return state.sales.items.filter(sale => sale.createdby === state.user.email)
      }
      return []
    },
    totalsales: (state, getters) => {
      // pack amounts into a single array
      var amounts = []
      amounts = getters.usersales.map(function(salesitem){
        return salesitem.amount
      })

      // calculate total sales with reduce methods
      function getTotalSales(total, amount){
        return total + amount
      } 
      if(amounts.length > 0){
        return amounts.reduce(getTotalSales)      
      }
    },
    totalsalesold: state => {
      // pack amounts into a single array
      var amounts = []
      amounts = state.sales.items.map(function(salesitem){
        return salesitem.amount
      })

      // calculate total sales with reduce methods
      function getTotalSales(total, amount){
        return total + amount
      } 
      if(amounts.length > 0){
        return amounts.reduce(getTotalSales)      
      }
    },
    navitems: state => {
      return state.AppUiData.mainNavItems
    },
    visiblenavitems: state => {
      return state.AppUiData.mainNavItems.filter(navitem => navitem.visible === true)
    }
  },
  mutations: {
    changeFirstName (state, newname){
      state.firstname = newname
    },
    addNewSale (state, newsale) {
      if(state.user.isAuthenticated && state.user.authorizations.sales.includes('create') ){
        //alert('Has create authorisation')
        newsale.createdby = state.user.email
        newsale.date = new Date()
        state.sales.items.push(newsale)
      }
    },
    setTotalSales (state, totalsales){
      //alert("In Vuex")
      state.sales.totalsales = totalsales
    },
    authenticateUser (state, payload) {
      var usr = state.users.find(user => user.email === payload.email)
      
      // this will be done on the server when the API server is setup
      if(usr.password === payload.password){
        usr.isAuthenticated = true
        state.user = usr
      } else {
        return
      }


      //alert(state.user.email + ' authentication is ' + state.user.isAuthenticated)

      // save user details and authentication token to session to session
      sessionStorage.setItem('useremail', state.user.email)
      sessionStorage.setItem('isAuthenticated', state.user.isAuthenticated)
      for(var i=0; i<state.user.authorizations.length; i++){
        sessionStorage.setItem('auth-'+(i+1), state.user.authorizations[i])
      }

      // toggle login and logout
      // state.AppUiData.mainNavItems.find(nav => nav.title === 'Logout').visible = true
      // state.AppUiData.mainNavItems.find(nav => nav.title === 'Login').visible = false

    },
    setUserFromSession (state){
      // load user from data using user info in session
      state.user = state.users.find(user => user.email === sessionStorage.getItem('useremail'))

      if(state.user){
        //alert(typeof(state.user))
        state.user.isAuthenticated = sessionStorage.getItem('isAuthenticated')      
      } else {
        state.user = {isAuthenticated: false}
      }

      // toggle login and logout
      // state.AppUiData.mainNavItems.find(nav => nav.title === 'Logout').visible = true
      // state.AppUiData.mainNavItems.find(nav => nav.title === 'Login').visible = false
    },
    logout (state) {
      // reset user
      state.user = {isAuthenticated: false}
      //alert('in logout')
      // make logout request to with API call 
      // todo

      // clear session

      sessionStorage.clear()

      // toggle login and logout
      state.AppUiData.mainNavItems.find(nav => nav.title === 'Logout').visible = false
      state.AppUiData.mainNavItems.find(nav => nav.title === 'Login').visible = true

    },
  },
  actions: {
  },
  modules: {
  }
})
