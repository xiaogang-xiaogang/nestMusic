<template>
  <div class="container">
    <div v-if="loading"><Loading></Loading></div>
    <div class="coursel" v-else>
      <Coursel :data="blocks[0].extInfo.banners" ></Coursel>
    </div>
    <div class="recommend-playlist">
      <Card title="推荐歌单" >
        <div v-if="loading"><Loading></Loading></div>
        <RecommondPlaylist v-else :data="blocks[1].creatives"></RecommondPlaylist>
      </Card>
    </div>
    <div class="self-recommond">
      <Card title="独家推送">
        <SelfRecommond ></SelfRecommond>
      </Card>
    </div>
    <div class="last-music">
      <Card title="最新音乐">
        <div v-if="loading"><Loading></Loading></div>
        <LastMusic :data="blocks[5].creatives" v-else></LastMusic>
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
import SelfRecommond from './self-recommond.vue';
import Loading from '@/components/loading.vue';
import LastMusic from './lastMusic.vue';
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
  .self-recommond{
    margin: 0 50px;
    margin-top: 40px;
  }
  .last-music{
    margin: 0 50px;
    margin-top: 40px;
  }
}
</style>