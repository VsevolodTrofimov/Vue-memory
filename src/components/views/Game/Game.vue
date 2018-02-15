<template>
  <div class="view">
    <div class="meta"> 
      <core-button class="ghost" @click="restart" data-tid="Menu-newGame"> 
        Начать заново
      </core-button>
      <core-heading level="4"> 
        Очки:
        <span data-tid="Menu-scores">{{score}}</span> 
      </core-heading>
    </div>
    
    <div class="board" data-tid="Deck">
      <div class="board__row" v-for="(row, idx) in board" :key="row[0].id + idx">
        <game-card class="board__card" v-bind="card" :id="undefined"
                   @click.native="flip(card)"
                   v-for="card in row" :key="card.id"
                   :data-tid="getCardTid(card)" />      
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

  methods: {
    ...mapActions({
      flip: 'flipCard',
      restart: 'restartGame'
    }),
    getCardTid: card => {
      if(card.hidden) return undefined 
      if(card.flipped) return 'Card-flipped'
      
      return 'Card'
    }
  },

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


  /* flex-wrap and half margins are done for small viewport sizes, 
     when row wouldn't fit */
  .board
    margin-bottom: -$card-margin // compensates card bottom margins

  .board__row
    display: flex
    flex-direction: row
    flex-wrap: wrap
    justify-content: center
    margin: 0 0-$card-margin/2 // compensates card left-right margins
    
  .board__card
    margin: 0 $card-margin/2 $card-margin $card-margin/2
</style>