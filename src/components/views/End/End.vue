<template>
  <div class="view">
    <img srcset="/static/banners/EndGame.png, /static/banners/EndGame@2x.png 2x"
         alt="Flipped cards"
         class="banner">

    <core-heading class="title"> 
      <h2> Поздравляем! </h2>
      <h2> Ваш итоговый счет: {{score}} </h2> 
    </core-heading>
    
    <core-button label="Еще раз" @click="restart" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import CoreButton from '@/src/components/core/Button/Button.vue'
import CoreHeading from '@/src/components/core/Heading/Heading.vue'

export default {
  computed: mapGetters({
    score: 'score'
  }),

  methods: mapActions({
    restart: 'startGame'
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
  
  // pixel perfect
  .banner
    display: block
    margin-bottom: 17px

  .title
    margin-bottom: 42px
    text-align: center
</style>