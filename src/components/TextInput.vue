// Text Input
<template>
  <div class="form-group inputcontainer">
    <label>{{ title }}</label> 
    <input 
        class="form-control" 
        v-bind:name="titleinputname" 
        :type=inputtype
        v-model="textvalue"
        autocomplete="off"  
        v-bind:style="textboxstyle"
    />
  </div>
</template>

<script>
export default {
    name: 'TextInput',
    data: function(){
        return {

        }
    },
    props: {
        title:{
            type: String
        },
        titleinputname:{
            type: String
        },
        inputtype:{
            type:String,
            default: "text"
        },
        value:{
            type: String
        },
        textboxstyle:{
            type: Object
        },
    },
    computed: {
        textvalue: {
            get() {return this.value },
            set(textvalue) {this.$emit('input', textvalue)}
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    input {
        width: 100%;
        background: #F6F6F6;
    }

    .inputcontainer{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 0.75em;
    }
</style>
