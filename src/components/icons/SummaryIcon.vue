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
    <g id="Group_33" data-name="Group 33" transform="translate(-54 -258)">
      <g transform="matrix(1, 0, 0, 1, 54, 258)" filter="url(#Path_4)">
        <path id="Path_4-2" data-name="Path 4" d="M12.5,0A12.5,12.5,0,1,1,0,12.5,12.5,12.5,0,0,1,12.5,0Z" transform="translate(9 8)" :fill="backgroundactivecolor"/>
      </g>
      <g id="Group_32" data-name="Group 32">
        <g id="Rectangle_48" data-name="Rectangle 48" transform="translate(69 271)" fill="rgba(255,255,255,0)" stroke="#fff" stroke-width="2">
          <rect width="13" height="16" rx="2" stroke="none"/>
          <rect x="1" y="1" width="11" height="14" rx="1" fill="none"/>
        </g>
        <rect id="Rectangle_56" data-name="Rectangle 56" width="7" height="2" rx="1" transform="translate(72 275)" :fill="foregroundactivecolor"/>
        <rect id="Rectangle_57" data-name="Rectangle 57" width="7" height="2" rx="1" transform="translate(72 278)" :fill="foregroundactivecolor"/>
        <rect id="Rectangle_58" data-name="Rectangle 58" width="7" height="2" rx="1" transform="translate(72 281)" :fill="foregroundactivecolor"/>
        <path id="Rectangle_59" data-name="Rectangle 59" d="M1,0H8A1,1,0,0,1,9,1V3A0,0,0,0,1,9,3H0A0,0,0,0,1,0,3V1A1,1,0,0,1,1,0Z" transform="translate(71 269)" :fill="foregroundactivecolor"/>
      </g>
    </g>
  </svg>
</template>

<script>
import IconButton from './IconButton.vue';

export default {
  name: 'SummaryIcon',
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
