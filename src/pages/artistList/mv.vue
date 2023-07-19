<template>
  <div class="container1">
      <div v-if="loading"><Loading></Loading></div>
      <div class="con" v-else>
        <div class="mv-container" v-for="(item, index) in mvs" :key="index">
          <div class="img-container" @click="goMvList(item.id.toString())">
            <img v-lazy="item.imgUrl" alt="">
            <div class="play-count">{{ Math.floor(parseInt(item.playCount.toString())/10000) }}万次</div>
            <div class="duration">{{ timeFormater(Math.floor(item.duration/1000)) }}</div>
          </div>
          <div class="name" @click="goMvList(item.id.toString())">{{ item.name }}</div>
        </div>
        <div v-if="lazyLoading" style="width: 100%;"><Loading></Loading></div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Loading from '@/components/loading.vue';
import { getArtistMv } from '@/api/aritist'
import { Mv } from '@/composale/mv';
import {timeFormater} from '@/composale/timeTools'
import { useRouter } from 'vue-router';
const props = defineProps({
  id:{
    type:Number,
    default:0
  }
})
let loading = ref(true)
let lazyLoading = ref(true)
let mvs = [] as Array<Mv>
let count = 0
async function getData() {
  let res = await getArtistMv(props.id.toString(),count)
  for(let i=0;i<res.mvs.length;i++){
    let mv = {} as Mv
    mv.id = res.mvs[i].id
    mv.name = res.mvs[i].name
    mv.duration = res.mvs[i].duration
    mv.playCount = res.mvs[i].playCount
    mv.imgUrl = res.mvs[i].imgurl
    count++
    mvs.push(mv)
  }
  console.log(res.hasMore)
  if(res.hasMore==false){
    console.log('11')
    document.removeEventListener('scroll',lazyGetData)
  }
  lazyLoading.value=false
  loading.value = false
}
getData()
async function lazyGetData() {
  let clientHeight = document.documentElement.clientHeight
  let scrollHeight = document.documentElement.scrollHeight
  let scrollTop = document.documentElement.scrollTop
  if(clientHeight+scrollTop>scrollHeight-200){
    if(lazyLoading.value==false){
      lazyLoading.value=true
      getData()
    }
  }
}
const router = useRouter()
function goMvList(id:string){
  router.push({
    name:'mvPlay',
    query:{
      id:id
    }
  })
}
onMounted(()=>{
  document.addEventListener('scroll',lazyGetData)
})
onUnmounted(()=>{
  document.removeEventListener('scroll',lazyGetData)
})
</script>

<style lang="scss" scoped>
.container1{
  width: calc(100% - 100px);
  .con{
    display: flex;
    flex-wrap: wrap;
  }
  .mv-container{
    width: 230px;
    height: 230px;
    margin: 10px 10px;
    .img-container{
      width: 230px;
      height: 200px;
      position: relative;
      cursor: pointer;
      img{
        width: 100%;
        height: 100%;
      }
      .play-count{
        position: absolute;
        right: 10px;
        top:10px;
        color: white;
      }
      .duration{
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: white;
      }
    }
    .name{
      cursor: pointer;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space:nowrap;
    }
  }
}
</style>