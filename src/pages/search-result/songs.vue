<template>
  <div class="container">
    <div class="songs-container">
      <div class="song" v-for="(item, index) in songs" :key="index">
        <div class="index">{{ index+1 }}</div>
        <div class="name">{{ item.name }}</div>
        <div class="songer">{{ item.songer }}</div>
        <div class="al">{{ item.alName }}</div>
        <div class="time">{{ timeFormater(Math.floor(item.duration/1000)) }}</div>
      </div>
    </div>
    <Pages :pages="pages" @change-page="changePage"></Pages>
 </div>
</template>

<script lang="ts" setup>
import { Song } from '@/composale/song';
import { ref } from 'vue';
import Pages from '@/components/pages.vue';
import {timeFormater} from '@/composale/timeTools'
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  res:{
    type:Object,
    default:{}
  }
})

let pages = Math.ceil(props.res.songCount/50)
const songs = ref<Array<Song>>([])
function getSongs(){
  for(let i=0;i<props.res.songs.length;i++){
    let song = {} as Song
    song.name = props.res.songs[i].name
    song.id = props.res.songs[i].id
    song.duration = props.res.songs[i].duration
    song.alId = props.res.songs[i].album.id
    song.alName = props.res.songs[i].album.name
    song.songer = props.res.songs[i].artists[0].name
    song.songerId = props.res.songs[i].artists[0].id
    songs.value.push(song)
  }
}
getSongs()

const router = useRouter()
const route = useRoute()
function changePage(index:number){
  router.push({
    name:'search',
    query:{
      keyword:route.query.keyword,
      type:route.query.type,
      page:index
    }
  })
}
</script>

<style lang="scss" scoped>
.container{
  .songs-container{
    .song{
      display: flex;
      cursor: pointer;
      div{
        margin-right: 20px;
        padding: 5px 0;

      }
      .index{
        width: 50px;
      }
      .name{
        width:300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .songer{
        width:200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .al{
        width:300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>