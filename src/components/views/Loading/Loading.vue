<template>
  <div class="view">
    <core-heading level="2"> 
      Раскладываем карты{{dots}} 
    </core-heading>  
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import CoreButton from '@/src/components/core/Button/Button.vue'
import CoreHeading from '@/src/components/core/Heading/Heading.vue'

export default {
  data: function() {
    return {
      dots: '...',
      animationInterval: null
    }
  },

  methods: {
    amimateDot: function() {
      if(this.dots.length === 5) this.dots = ''
      else this.dots += '.'
    }
  },

  mounted: function() {
   this.animationInterval = setInterval(this.amimateDot, 500)
  },

  destroyed: function() {
    console.log(this.animationInterval)
    if(this.animationInterval) clearInterval(this.animationInterval)
  },

  components: {
    CoreButton,
    CoreHeading
  }
}
</script>

<style lang="sass" scoped>
  @import "~@/src/utility/vars.sass" 

  .view
    display: flex
    flex-direction: column
    align-items: center
  
</style>