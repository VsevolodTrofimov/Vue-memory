<template>
  <button class="btn" @click="$emit('click')"> 
    <slot> 
      <div class="content"> {{label}} </div> 
    </slot>
  </button>
</template>

<script>
export default {
  props: ['label']
}
</script>

<style lang="sass" scoped>
  @import "~@/src/utility/vars.sass" 

  .btn
    display: block
    padding: 0
    margin: 0
    border: 0
    background: $color--white
    border-radius: $border-radius--m
    box-shadow: none
    opacity: $opacity--main
    transition: 0.5s ease

    &:focus
      outline: 0

    &:hover
      opacity: 1

    &:active
      box-shadow: $wave--m
      transition: 0.15s ease

  .btn.wide
    width: 100%

  .content
    padding: $space--s $space--m 
    font-family: $font--main
    font-weight: 700
    font-size: $font-size--m
    color: $font-color--main

  .btn.ghost 
    background: transparent
    border-bottom: $border-width--m solid transparent
    border-top: $border-width--m solid transparent
    border-radius: 0

    & > .content
      padding: 0
      color: $color--white
      font-weight: 600
  

    &:hover
      border-color: rgba($color--white, .5)

    &:active 
      box-shadow: none
      border-color: $color--white

</style>
