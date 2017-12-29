<template>
  <div class="card" @click="$emit('click')"> 
    <slot> Card content </slot>
  </button>
</template>

<script>
export default {
  props: ['label']
}
</script>

<style lang="sass" scoped>
  @import "~@/src/utility/vars.sass" 

  .card
    background: $color--white
    border-radius: $border-radius--m
    box-shadow: none
    opacity: $opacity--main
    transition: 0.3s ease

    &:focus
      outline: 0

    &:hover
      box-shadow: $wave--m
      transition: 0.3s ease
  
</style>
