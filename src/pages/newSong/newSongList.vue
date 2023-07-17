<template>
  <div class="container">
    <div class="category">
      <div class="all" :class="{'active':cate==0}" @click="change(0)">全部</div>
      <div class="china" :class="{'active':cate==7}" @click="change(7)">华语</div>
      <div class="english" :class="{'active':cate==96}" @click="change(96)">欧美</div>
      <div class="south-dog" :class="{'active':cate==8}" @click="change(8)">韩国</div>
      <div class="xiaoriben" :class="{'active':cate==16}" @click="change(16)">日本</div>
    </div>
    <div v-if="loading"><Loading></Loading></div>
    <div v-else>
      <div class="songs">
        <div class="song" @click="playMusic(index)" :class="{'song-odd':index%2==0}" v-for="(item, index) in songList" :key="index">
          <div class="index">{{ index+1 }}</div>
          <img v-lazy="item.imgUrl" :ref="imgsRef.set" alt="" >
          <div class="title">{{ item.name }}</div>
          <div class="songer">{{ item.songer }}</div>
          <div class="al">{{ item.alName }}</div>
          <div>{{ timeFormater(item.duration) }}</div>
        </div>
      </div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { getNewSong, cancelRequest } from '@/api/song';
import { Song } from '@/composale/song';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Loading from '@/components/loading.vue';
import { timeFormater } from '@/composale/timeTools'
import { useTemplateRefsList } from '@vueuse/core';
import { useMusicPlayStore } from '@/store/playmusic';

let songList = [] as Array<Song>
let loading = ref(true)
let cate = ref(0)
const imgsRef = useTemplateRefsList<HTMLImageElement>()
const route = useRoute()
const router = useRouter()
if(route.query.cate){
  if(route.query.cate=='7'){
    cate.value=7
  }else if(route.query.cate=='96'){
    cate.value=96
  }else if(route.query.cate=='8'){
    cate.value=8
  }else if(route.query.cate=='16'){
    cate.value=16
  }else{
    router.push({
      name:'newMusic',
      query:{
        flag:'0',
        cate:'0'
      }
    })
  }
}
async function getData(cate?:number) {
  let data = []
  songList = []
  if(cate){
    data = await getNewSong(cate.toString())
  }else{
    if(route.query.cate){
      data = await getNewSong(route.query.cate.toString())
    }else{
      data = await getNewSong()
    }
  }
  for(let i=0;i<data.length;i++){
    let song = {} as Song
    song.id = data[i].id
    song.name = data[i].name
    song.alName = data[i].album.name
    song.alId = data[i].album.id
    song.imgUrl = data[i].album.picUrl
    song.songer = data[i].album.artists[0].name
    song.songerId = data[i].album.artists[0].id
    song.mvId = data[i].mvid
    song.duration = Math.floor(parseInt(data[i].duration)/1000)
    songList.push(song)
  }
  loading.value = false
}
getData()
async function change(index:number){
  if(cate.value!=index){
    cate.value = index
    loading.value = true
    router.push({
      name:'newMusic',
      query:{
        flag:'0',
        cate:index.toString()
      }
    })
    // 发生变化时停止对图片的继续加载
    for(let i=0;i<imgsRef.value.length;i++){
      imgsRef.value[i].src=''
      imgsRef.value[i].onload=null
      imgsRef.value[i].onerror=null
    }
    getData(index)
  }
}
const store = useMusicPlayStore()
function playMusic(index:number){
  store.id=songList[index].id.toString()
}
onBeforeMount(() => {
  console.log(111)
})
</script>

<style lang="scss" scoped>
.container{
  .category{
    display: flex;
    font-weight: lighter;
    div{
      margin: 0 10px;
      cursor: pointer;
    }
    .active{
      font-weight: bold;
    }
    margin-bottom: 20px;
  }
  .song-odd{
    background-color: rgba(128, 128, 128, 0.138);
  }
  .songs{
    width: 100%;
    .song{
      display: flex;
      height: 100px;
      align-items: center;
      margin-bottom: 10px;
      width: 100%;
      img{
        height: 100px;
        width: 100px;
        margin-right: 50px;
      }
      div{
        margin-right: 50px;
      }
      .title{
        width: 20%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .songer{
        width: 10%;
        flex-shrink: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .al{
        width: 20%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .song:hover{
      color: red;
    }
  }
}
</style>