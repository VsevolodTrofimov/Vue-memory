<template>
  <div class="view">
    <img srcset="/static/banners/StartGame.png, /static/banners/StartGame@2x.png 2x"
         alt="Flipped cards"
         class="banner">

    <core-heading level="1" class="title"> Memory Game </core-heading>
    <core-button @click='start'> Начать игру </core-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import CoreButton from '@/src/components/core/Button/Button.vue'
import CoreHeading from '@/src/components/core/Heading/Heading.vue'

export default {
  methods: mapActions({
    start: 'startGame'
  }),

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
  
  // pixel perfecting
  .banner
    display: block
    margin-bottom: 22px

  .title
    margin-bottom: 34px
</style>