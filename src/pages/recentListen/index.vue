<template>
  <div>
    接口暂时存在问题
 </div>
</template>

<script lang="ts" setup>
import {recentPlay} from '@/api/user'

async function getData(){
    const res = await recentPlay()
    console.log(res)
}
getData()
</script>

<style lang="scss" scoped>

</style>