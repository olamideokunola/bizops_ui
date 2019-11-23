// Cta
<template>
    <div>
        <div class="cta-container">
            <slot></slot>
            <div class="right-group">
                <span>{{title}}</span>
                <p>{{description}}
                </p>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
    name: 'AppCta',
    components: {
        
    },
    data: function(){
        return {

        }
    },
    props: {
        title: {
            type: String,
        },
        description: {
            type: String,
        }
    },
    computed:  mapState({
  
    })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .cta-container {
    display: flex;
    flex-direction: row;   
    border-radius: 20px;
    background: #F5F5F5;
    width: 250px;  
    padding: 10px;
    align-content: center;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.16);
  }

.cta-container:hover {
    background:#eee;
  }
  .right-group {
    display: flex;
    flex-direction: column;
    align-content: space-between;
    width: 60%;
    
  }

  .right-group > span {
    display: flex;
    text-align: left;
    justify-content: flex-start;
    font-weight: bold;
  }

  .right-group > p {
    display: flex;
    justify-content: flex-end;
    text-align: left;
    font-size: 0.65em;
      
    margin: 0;
    height: 100%;
  }
</style>
