<template>
  <transition appear name="card-flip" mode="out-in">
    <div class="card card--hidden" v-if="hidden" key="hidden">
      <img :src="path" class="card__image" />
    </div>
    <div class="card" v-else-if="flipped" key="front">
      <img :src="path" class="card__image" />
    </div>
    <div class="card card--back" v-else key="back">
      <img src="/static/cards/back.png" class="card__image" />
    </div>
  </transition>
</template>

<script>
export default {
  props: ['hidden', 'flipped', 'path']
}
</script>

<style lang="sass" scoped>
  @import "~@/src/utility/vars.sass"
  @import "~@/src/utility/animations.sass"

  .card
    border-radius: $border-radius--l
    box-shadow: 0 1px 3px 0 rgba(#000, .24)
    user-select: none

  .card__image
    display: block
    width: $card-width
    height: $card-height
    pointer-events: none

  .card--hidden
    opacity: 0

  
  .card--back
    background: $card-back-color
  
  @include flip-animation("card-flip", $card-flip-jump-height)
</style>