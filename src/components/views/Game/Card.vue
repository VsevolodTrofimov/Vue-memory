<template>
  <div :class="['card', {'hidden' : hidden}]">
    <img :src="flipped % 2 ? path : '/static/cards/back.png'" />
  </div>
</template>

<script>
export default {
  props: ['hidden', 'flipped', 'path']
}
</script>

<style lang="sass" scoped>
  @import "~@/src/utility/vars.sass" 
  .card
    width: $card-width
    overflow: hidden
    border-radius: $border-radius--l
    box-shadow: 0 1px 3px 0 rgba(#000, .24)
    user-select: none

    & > img
      display: block
      width: 100%
      pointer-events: none

    &.hidden
      opacity: 0
</style>