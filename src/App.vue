<template>
  <div id="app" data-tid="App">
    <transition appear name="route-change" mode="out-in">
      <start-view v-if="(stage === 'start' || stage === 'loading')" />
      <game-view  v-else-if="stage === 'game'" />
      <end-view   v-else-if="stage === 'end'" />
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import StartView from '@/src/components/views/Start/Start.vue'
import GameView from '@/src/components/views/Game/Game.vue'
import EndView from '@/src/components/views/End/End.vue'

export default {
  computed: mapGetters({
    stage: 'stage'
  }),

  components: {
    StartView,
    GameView,
    EndView
  }
}
</script>

<style lang="sass">
  @import "~@/src/utility/vars.sass"
  @import "~@/src/utility/animations.sass"

  body, html
    padding: 0
    margin: 0
  
  #app
    display: flex
    align-items: center
    justify-content: center
    
    min-height: 100vh
    width: 100vw
    
    background: $fill--main

    font-family: $font--main
    font-size: $font-size--m

  @include fade-animation("route-change")
</style>
