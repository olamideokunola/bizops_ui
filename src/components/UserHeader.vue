<template>
    <div class="header">
      <div 
        class="user"
        v-if=user.isAuthenticated
        >
        Current User: <strong>{{user.email}}</strong>
      </div>
    </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  components: {
  },
  name: 'SalesView',
  props: {

  },
  data: function(){
    return {
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
    user: state => state.user,
  }),
  methods: {
   fetchUser (){
     this.$store.commit('setUserFromSession')

   }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchUser()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .user {
    font-size: 0.8em;
    padding-right: 20px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

  }

    /* If the screen size is 600px wide or less, hide the element */
  @media only screen and (max-width: 600px) {

  }
</style>
