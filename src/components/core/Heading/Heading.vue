<template>
  <component :is="'h' + level" class="heading">
    <slot> Heading </slot>
  </component>
</template>

<script>
export default {
  props: {
    level: {
      type: String,
      default: '3'
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~@/src/utility/vars.sass" 

  h1, h2, h3, h4, ,h5, h6
    padding: 0
    margin: 0

    color: $font-color--white
    font-weight: 700
    opacity: $opacity--main

    // pixel perfect
    letter-spacing: 0.007em

  h1
    text-transform: uppercase
    font-size: $font-size--xl

  h2
    font-size: $font-size--l
    
</style>
