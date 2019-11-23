<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="43" height="43" viewBox="0 0 43 43"
  >
  <defs>
    <filter id="Path_4" x="0" y="0" width="43" height="43" filterUnits="userSpaceOnUse">
      <feOffset dy="1" input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feFlood flood-opacity="0.161"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs>
  <g id="Group_31" data-name="Group 31" transform="translate(-54 -192)">
    <g transform="matrix(1, 0, 0, 1, 54, 192)" filter="url(#Path_4)">
      <path id="Path_4-2" data-name="Path 4" d="M12.5,0A12.5,12.5,0,1,1,0,12.5,12.5,12.5,0,0,1,12.5,0Z" transform="translate(9 8)" :fill="backgroundactivecolor"/>
    </g>
    <g id="Group_30" data-name="Group 30">
      <g id="Rectangle_48" data-name="Rectangle 48" transform="translate(68 207)" fill="rgba(255,255,255,0)" stroke="#fff" stroke-width="2">
        <rect width="15" height="12" rx="2" stroke="none"/>
        <rect x="1" y="1" width="13" height="10" rx="1" fill="none"/>
      </g>
      <rect id="Rectangle_49" data-name="Rectangle 49" width="12" height="3" transform="translate(70 207)" :fill="foregroundactivecolor"/>
      <rect id="Rectangle_54" data-name="Rectangle 54" width="2" height="3" rx="1" transform="translate(71 205)" :fill="foregroundactivecolor"/>
      <rect id="Rectangle_55" data-name="Rectangle 55" width="2" height="3" rx="1" transform="translate(78 205)" :fill="foregroundactivecolor"/>
      <path id="Path_6" data-name="Path 6" d="M0,0H2V2H0Z" transform="translate(74.633 214)" :fill="foregroundactivecolor"/>
      <path id="Path_7" data-name="Path 7" d="M0,0H2V2H0Z" transform="translate(74.633 211)" :fill="foregroundactivecolor"/>
      <path id="Path_8" data-name="Path 8" d="M0,0H2V2H0Z" transform="translate(77.633 214)" :fill="foregroundactivecolor"/>
      <path id="Path_9" data-name="Path 9" d="M0,0H2V2H0Z" transform="translate(77.633 211)" :fill="foregroundactivecolor"/>
      <path id="Path_10" data-name="Path 10" d="M0,0H2V2H0Z" transform="translate(71.633 214)" :fill="foregroundactivecolor"/>
      <path id="Path_11" data-name="Path 11" d="M0,0H2V2H0Z" transform="translate(71.633 211)" :fill="foregroundactivecolor"/>
    </g>
  </g>
</svg>
</template>

<script>
import IconButton from './IconButton.vue';

export default {
  name: 'CalendarIcon',
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

</style>
