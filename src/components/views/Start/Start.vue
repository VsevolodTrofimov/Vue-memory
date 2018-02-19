<template>
  <div class="view">
    <img srcset="/static/banners/StartGame.png, /static/banners/StartGame@2x.png 2x"
         alt="Flipped cards"
         class="banner">

    <core-heading level="1" class="title"> Memory Game </core-heading>
    <core-button v-if="stage === 'loading'" disabled>
      Раскладываем карты...
    </core-button>
    <core-button v-else @click='start' data-tid="NewGame-startGame"> Начать игру </core-button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import CoreButton from '@/src/components/core/Button/Button.vue'
import CoreHeading from '@/src/components/core/Heading/Heading.vue'
import { setTimeout, clearTimeout } from 'timers';

export default {
  computed: mapGetters({
    stage: 'stage'
  }),

  data() {
    return {
      retryTimeout: setTimeout(() => {}, 0)
    }
  },

  methods: {
    ...mapActions({
      start: 'startGame',
      dispatchLoadDeck: 'loadDeck'
    }),
    loadDeck: function(retries=0) {
      this.dispatchLoadDeck()
        .catch(err => {
          console.error(err)
          this.retryTimeout = setTimeout(() => this.loadDeck(retries + 1), retries * 1000)
        })
    }
  },

  mounted: function() {
    this.loadDeck()
  },

  beforeDestroy: function() {
    clearTimeout(this.retryTimeout)
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
  
  // pixel perfecting
  .banner
    display: block
    margin-bottom: 22px

  .title
    margin-bottom: 34px
</style>