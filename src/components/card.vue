<template>
  <div class="container">
    <div class="title">{{ title }}</div>
    <slot></slot>
 </div>
</template>

<script lang="ts" setup>


defineProps({
    title:{
        type:String,
        default:''
    }
})
</script>

<style lang="scss" scoped>
.container{
    .title{
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-size: 22px;
        width: 100%;
        border-bottom: 2px solid #BAF2F2F2;
    }
}
</style>