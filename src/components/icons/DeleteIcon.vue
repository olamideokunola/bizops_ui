<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
    <g id="Group_14" data-name="Group 14" transform="translate(-1209 -238)">
      <circle id="Ellipse_2" data-name="Ellipse 2" class="cls-1" cx="12.5" cy="12.5" r="12.5" transform="translate(1209 238)"/>
      <g id="Group_13" data-name="Group 13">
        <rect id="Rectangle_39" data-name="Rectangle 39" width="9" height="11" rx="1" transform="translate(1217 247)"/>
        <rect id="Rectangle_40" data-name="Rectangle 40" width="11" height="2" transform="translate(1216 243)"/>
        <rect id="Rectangle_41" data-name="Rectangle 41" width="3" height="1" transform="translate(1220 242)"/>
        <rect id="Rectangle_42" data-name="Rectangle 42" class="cls-2" width="1" height="7" transform="translate(1219 249)"/>
        <rect id="Rectangle_43" data-name="Rectangle 43" class="cls-2" width="1" height="7" transform="translate(1223 249)"/>
      </g>
    </g>
  </svg>
</template>

<script>
import IconButton from './IconButton.vue';

export default {
  name: 'DeleteIcon',
  mixins: [IconButton],
  props: {

  },
  data: function(){
      return {

      }
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cls-1 {
    fill: #cecece;
  }

  .cls-2 {
    fill: #cecece;
  }
</style>
