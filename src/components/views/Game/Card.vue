<template>
  <transition appear name="card-flip" mode="out-in">
    <div class="card card--hidden" v-if="hidden" key="hidden">
      <img :src="path" />
    </div>
    <div class="card" v-else-if="flipped" key="front">
      <img :src="path" />
    </div>
    <div class="card" v-else>
      <img src="/static/cards/back.png" key="back" />
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

    & > img
      display: block
      width: $card-width
      height: $card-height
      pointer-events: none

  .card--hidden
    opacity: 0

  
  @include flip-animation("card-flip", $card-flip-jump-height)
</style>