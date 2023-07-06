<template>
  <div class="container">
    <div class="coursel">
      <div class="coursel-load" v-if="loading">
        加载中
      </div>
      <Coursel :data="blocks[0].extInfo.banners" v-else></Coursel>
    </div>
    <div class="recommend-playlist">
      <div class="coursel-load" v-if="loading">
        加载中
      </div>
      <Card title="推荐歌单" v-else>
        <RecommondPlaylist :data="blocks[1].creatives"></RecommondPlaylist>
      </Card>
    </div>
 </div>
</template>

<script lang="ts" setup>
import {getFindMusic} from '@/api/findMusic'
import { onMounted, ref } from 'vue';
import Coursel from '@/components/coursel.vue'
import RecommondPlaylist from './recommond-playlist.vue';
import Card from '@/components/card.vue';
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
.container{
  .recommend-playlist{
    margin: 0 50px;
  }
}
</style>