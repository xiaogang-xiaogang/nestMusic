<template>
  <div class="container">
    <div v-if="loading"><Loading></Loading></div>
    <div class="hot-container">
      <div class="left">
        <img src="../../assets/img/top50.jpg" alt="">
      </div>
      <div class="right">
        <template v-if="showAll">
          <div @click="playMusic(index)" class="song" :class="{'active':index%2==1}"  v-for="(item, index) in songs" :key="index">
            <div>{{ index+1 }}</div>
            <div>{{ item.name }}</div>
          </div>
        </template>
        <template v-else>
          <div class="song" @click="playMusic(i-1)" :class="{'active':i%2==0}" v-for="i of 10" :key="i">
            <div>{{ i }}</div>
            <div>{{ songs[i-1].name }}</div>
          </div>
          <div class="all" @click="showAll=true">>>查看全部五十首</div>
        </template>
      </div>
    </div>
    <div class="als-container">
      <div v-if="alLoading"><Loading></Loading></div>
      <template v-else>
        <div class="al" v-for="(item, index) in albums" :key="index">
          <img :src="item.url" alt="" @click="toAlList(item.id)">
          <div class="name" @click="toAlList(item.id)">{{ item.name }}</div>
        </div>
        <div v-if="canScroll" style="width: 100%;"><Loading></Loading></div>
      </template>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { getHotFivity, getHotAlbum } from '@/api/aritist';
import {Song} from '@/composale/song'
import { onMounted, onUnmounted, ref } from 'vue';
import Loading from '@/components/loading.vue';
import { AlDetails } from '@/composale/al.d';
import { useMusicPlayStore } from '@/store/playmusic';
import { useRoute, useRouter } from 'vue-router';


const props = defineProps({
  id:{
    type:String,
    default:''
  }
})
let loading = ref(true)
let alLoading = ref(true)
let showAll = ref(false)
let count = ref(0)
let canScroll = ref(true)
let albums = [] as Array<AlDetails>
const songs = [] as Array<Song>
async function getData(){
  let res = await getHotFivity(props.id)
  for(let i=0;i<res.length;i++){
    let song = {} as Song
    song.id = res[i].id
    song.name = res[i].name
    songs.push(song)
  }
  loading.value = false
}
getData()

async function getHotAlbumData() {
  const res = await getHotAlbum(props.id,count.value)
  for(let i=0;i<res.hotAlbums.length;i++){
    let al = {} as AlDetails
    al.name = res.hotAlbums[i].name
    al.id = res.hotAlbums[i].id
    al.url = res.hotAlbums[i].picUrl
    al.publishTime = res.hotAlbums[i].publishTime
    albums.push(al)
    count.value++
  }
  if(res.more==false){
    document.removeEventListener('scroll',lazyGetAl)
  }
  alLoading.value = false
  canScroll.value = false
}
getHotAlbumData()
function lazyGetAl(){
  let clientHeight = document.documentElement.clientHeight
  let scrollHeight = document.documentElement.scrollHeight
  let scrollTop = document.documentElement.scrollTop
  if(clientHeight+scrollTop>scrollHeight-300){
    if(canScroll.value==false){
      canScroll.value = true
      getHotAlbumData()
    }
  }
}

const store = useMusicPlayStore()
function playMusic(index:number){
  store.id=songs[index].id.toString()
}

const router = useRouter()
function toAlList(id:String){
  router.push({
    name:'alList',
    query:{
      id:id.toString(),
      page:'1'
    }
  })
}

onMounted(()=>{document.addEventListener('scroll',lazyGetAl)})
onUnmounted(() => {
  document.removeEventListener('scroll',lazyGetAl)
})
</script>

<style lang="scss" scoped>
.container{
  .hot-container{
    margin: 20px 0;
    display: flex;
    width: 100%;
    .left{
      width: 20%;
      margin-right: 100px;
      img{
        width: 100%;
      }
    }
    .right{
      width: 70%;
      .song{
        display: flex;
        div{

          margin-right: 30px;
          height: 30px;
          line-height: 30px;
        }
      }
      .active{
        background-color: rgba(128, 128, 128, 0.281);
      }
      .all{
        float: right;
        margin-top: 10px;
        cursor: pointer;
      }
      .all:hover{
        color: red;
      }
    }
  }
  .als-container{
    display: flex;
    flex-wrap: wrap;
    .al{
      margin: 10px 10px;
      img{
        width: 200px;
        height: 200px;
        cursor: pointer;
      }
      .name{
        font-size: 14px;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap;
        cursor: pointer;
      }
      .name:hover{
        color: red;
      }
    }
  }
}
</style>