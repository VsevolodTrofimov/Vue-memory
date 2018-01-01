<template>
  <transition appear name="flip" mode="out-in">
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

  
  .flip-enter-active, .flip-leave-active
    transition: transform $transition--m
  
  .flip-enter
    transform: rotateY(90deg) translateY(-$card-flip-jump-height)
  
  .flip-leave-to
    transform: rotateY(-90deg) translateY(-$card-flip-jump-height)

</style>