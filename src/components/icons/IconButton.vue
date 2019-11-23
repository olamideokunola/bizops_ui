<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="43" height="43" viewBox="0 0 43 43"
  >
    <defs>
      <filter id="Path_4" x="0" y="0" width="43" height="43" filterUnits="userSpaceOnUse">
        <feOffset dy="1" input="SourceAlpha"/>
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feFlood :flood-opacity="shadowopacity"/>
        <feComposite operator="in" in2="blur"/>
        <feComposite in="SourceGraphic"/>
      </filter>
    </defs>
    <g id="Group_29" data-name="Group 29" transform="translate(-54 -145)">
      <g transform="matrix(1, 0, 0, 1, 54, 145)" filter="url(#Path_4)">
        <path id="Path_4-2" data-name="Path 4" d="M12.5,0A12.5,12.5,0,1,1,0,12.5,12.5,12.5,0,0,1,12.5,0Z" transform="translate(9 8)" :fill="sharedState.currentmenuitem.bgcolor"/>
      </g>
      <g id="Group_28" data-name="Group 28">
        <rect id="Rectangle_46" data-name="Rectangle 46" width="3" height="13" rx="1" transform="translate(74 159)" :fill="foregroundactivecolor"/>
        <rect id="Rectangle_47" data-name="Rectangle 47" width="3" height="13" rx="1" transform="translate(82 164) rotate(90)" :fill="foregroundactivecolor"/>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'AddIcon',
  props: {
    foregroundactivecolor: {
      type: String,
      default: '#fff'
    },
    backgroundactivecolor: {
      type: String,
      default: '#cecece'
    },
    mouseovermenuitem: {
      type: Object,
    }
  },
   watch: {

  },
  data: function(){
      return {
        shadowopacity: 0.16,
      }
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
