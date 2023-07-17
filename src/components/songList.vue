<template>
  <div class="container">
    <div class="title">
        <div class="blank"></div>
        <div class="song-title">音乐标题</div>
        <div class="songer">歌手</div>
        <div class="al">专辑</div>
        <div class="time-long">时长</div>
      </div>
    <div v-if="listLoading">
      <Loading></Loading>
    </div>
    <div v-else>
      <div class="song-content" @click="playMusic(index)" :class="{'active':index%2==0}" v-for="(item, index) in songsList" :key="index">
        <div class="blank">{{ index+1 }}</div>
        <div class="song-title">{{ item.title }}</div>
        <div class="songer">{{ item.songer }}</div>
        <div class="al">{{ item.alName }}</div>
        <div class="time-long">{{ timeFormater(item.timeLong) }}</div>
      </div>
      <Pages :pages="page" @change-page="changeParams"></Pages>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { SongDetail } from '@/composale/playList.d'
import { timeFormater } from '@/composale/timeTools'
import Pages from './pages.vue';
import { PropType, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getSongs } from '@/api/playList';
import {useMusicPlayStore} from '@/store/playmusic'
import Loading from './loading.vue';
const props = defineProps({
  count:{
    type:Number,
    default:1
  }
})
let listLoading = ref(true)
let page = ref(1)
function getPages(){
  page.value = Math.ceil(props.count/10)
}
getPages()
const route = useRoute()
let songsList:SongDetail[] = []
async function getSongsList(nowPage?:number) {
    songsList = []
    if(route.query.id && route.query.page){
      let begin:any
      if(nowPage){
        begin = (parseInt(nowPage.toString())-1)*10
      }else{
        begin = (parseInt(route.query.page.toString())-1)*10
      }
      let songs = await getSongs(route.query.id.toString(),begin.toString())
      let n = songs.length
      for(let i=0;i<n;i++){
          let song:SongDetail = {} as SongDetail
          song.title = songs[i].name
          song.songer = songs[i].ar[0].name
          song.alId = songs[i].al.id
          song.alName = songs[i].al.name
          song.isLove = false
          song.timeLong = Math.floor(parseInt(songs[i].dt)/1000)
          song.id = songs[i].id
          songsList.push(song)
      }
      listLoading.value = false
    }
}
getSongsList()
const router = useRouter()
function changeParams(index:number){
  if(route.query.id && route.query.page){
    router.push({
      path:'/playList',
      query:{
        id: route.query.id.toString(),
        page:index.toString()
      }
    })
    listLoading.value = true
    getSongsList(index)
  }
}

const store = useMusicPlayStore()
function playMusic(index:number){
  store.id=songsList[index].id.toString()
}
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  .title{
    display: flex;
    height: 40px;
    .blank{
      width: 15%;
      height: 100%;
    }
    .song-title{
      width: 30%;
      height: 100%;
    }
    .songer{
      width: 15%;
      height: 100%;
    }
    .al{
      width: 30%;
      height: 100%;
    }
    .time-long{
      width: 10%;
      height: 100%;
    }
  }
  .active{
    background-color: rgba(128, 128, 128, 0.1);
  }
  .song-content{
    display: flex;
    height: 35px;
    cursor: pointer;
    div{
      line-height: 35px;
    }
    .blank{
      width: 15%;
      height: 100%;
    }
    .song-title{
      width: 30%;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .songer{
      width: 15%;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .al{
      width: 30%;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .time-long{
      width: 10%;
      height: 100%;
    }
  }
  .song-content:hover{
    color: red;
  }
}
</style>