<template>
  <div id="app">
    <start-veiw v-if="stage === 'start'" />
    <game-veiw  v-if="stage === 'game'" />
    <end-veiw   v-if="stage === 'end'" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import StartVeiw from '@/src/components/views/Start/Start.vue'
import GameVeiw from '@/src/components/views/Game/Game.vue'
import EndVeiw from '@/src/components/views/End/End.vue'

export default {
  computed: mapGetters({
    stage: 'stage'
  }),

  components: {
    StartVeiw,
    GameVeiw,
    EndVeiw
  }
}
</script>

<style lang="sass">
  @import "~@/src/utility/vars.sass"

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


</style>
