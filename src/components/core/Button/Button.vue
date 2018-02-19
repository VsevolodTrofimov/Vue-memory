<template>
  <button class="btn" @click="$emit('click')"> 
    <slot /> 
  </button>
</template>

<script>
  export default {}
</script>

<style lang="sass" scoped>
  @import "~@/src/utility/vars.sass" 

  .btn
    display: block
    padding: $space--s $space--m 
    font-family: $font--main
    font-weight: 700
    font-size: $font-size--m
    color: $font-color--main
    background: $color--white
    border-radius: $border-radius--m
    opacity: $opacity--main
    transition: 0.5s ease
    // reset
    box-shadow: none
    margin: 0
    border: 0

    &:focus
      outline: 0

    &:hover
      opacity: 1

    &:active
      box-shadow: $box-shadow-wave--m
      transition: 0.15s ease

  .btn.wide
    width: 100%

  .btn.ghost 
    padding: 0
    border-bottom: $border-width--m solid transparent
    border-top: $border-width--m solid transparent
    background: transparent
    border-radius: 0
    font-weight: 600
    color: $color--white

    &:hover
      border-color: rgba($color--white, .5)

    &:active 
      box-shadow: none
      border-color: $color--white

</style>
