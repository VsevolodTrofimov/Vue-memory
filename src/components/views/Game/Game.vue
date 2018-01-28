<template>
  <div class="view">
    <div class="meta"> 
      <core-button label="Начать заново" class="ghost" @click="restart" />
      <core-heading> <h4> Очки: {{score}} </h4> </core-heading>
    </div>
    
    <div class="board">
      <div class="board__row" v-for="(row, idx) in board" :key="row[0].id + idx">
        <game-card class="board__card" @click.native="flip(card)" v-bind="card"
                   v-for="(card, idx) in row" :key="card.id + idx" />      
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import CoreButton from '@/src/components/core/Button/Button.vue'
import CoreHeading from '@/src/components/core/Heading/Heading.vue'
import GameCard from './Card.vue'


export default {
  computed: mapGetters({
    score: 'score',
    board: 'board'
  }),

  methods: mapActions({
    flip: 'flipCard',
    restart: 'restartGame'
  }),

  components: {
    CoreButton,
    CoreHeading,
    GameCard
  }
}
</script>

<style lang="sass" scoped>
  @import "~@/src/utility/vars.sass" 

  .view
    display: flex
    flex-direction: column
    align-items: center
    padding: $space--l

  .meta
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between
    width: 100%
    margin-bottom: $space--m


  // wraps and half margins are done for small viewport size cases, when row wouldn't fit
  .board
    // compensates card bottom margins
    margin-bottom: -$card-margin

  .board__row
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: center
    
    // compensates card left-right margins
    margin: 0 0-$card-margin/2
    
    .board__card
      margin: 0 $card-margin/2 $card-margin $card-margin/2
</style>