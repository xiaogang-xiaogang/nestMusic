<template>
  <div class="container">
    <div class="coursel">
      <div class="coursel-load" v-if="loading">
        加载中
      </div>
      <Coursel :data="blocks[0]" v-else></Coursel>
    </div>
 </div>
</template>

<script lang="ts" setup>
import {getFindMusic} from '@/api/findMusic'
import { onMounted, ref } from 'vue';
import Coursel from '@/components/coursel.vue'
let blocks = new Array(6)
let loading = ref(true)
const fetchData =async () => {
    let data = await getFindMusic()
    loading.value = false
    blocks = data.blocks
} 
fetchData()
</script>

<style lang="scss" scoped>

</style>