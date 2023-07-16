<template>
  <div v-if="loading">
    <Loading></Loading>
 </div>
 <div v-else class="container">
  <div class="all" @click="changeCat('全部')">全部{{ tag }}</div>
  <div class="one-container" v-for="(item, index) in list" :key="index">
    <div class="title">{{ item.category }}:</div>
    <span :class="{'active':active==name}" v-for="(name, index) in item.names" :key="index" @click="changeCat(name)">{{ name }}</span>
  </div>
  <div v-if="playListLoading">
    <Loading></Loading>
  </div>
  <div class="playlist-container" v-else>
    <div class="playlists">
      <div class="playlist" v-for="(item, index) in playLists" :key="index">
        <img :src="item.url" alt="" @click="toPlayList(item.listId)">
        <div @click="toPlayList(item.listId)">{{ item.title }}</div>
      </div>
    </div>
    <Pages :pages="pages" @change-page="changePage"></Pages>
  </div>
 </div>
</template>

<script lang="ts" setup>
import { Catlist, PlayList } from '@/composale/playList';
import { PropType, ref } from 'vue';
import Loading from '@/components/loading.vue';
import { useRoute, useRouter } from 'vue-router';
import {getAllPlayList} from '@/api/playList'
import Pages from '@/components/pages.vue'
const props = defineProps({
  list:{
    type:Array<Catlist>,
    default:[]
  },
  loading:{
    type:Boolean,
    default:true
  },
  tag:{
    type:String,
    default:''
  }
})
let playListLoading = ref(true)
let active = ref('全部')

const route = useRoute()
const router = useRouter()
if(route.query.cat){
  active.value = route.query.cat.toString()
}
function changeCat(cat:String){
  if(active.value!=cat.toString()){
    active.value = cat.toString()
    router.push({
      name:'allPlayList',
        query:{
            page:'1',
            cat:cat.toString()
        }
    })
    playListLoading.value = true
    getData(1,cat.toString())
  }
}
function changePage(index:number){
  router.push({
      name:'allPlayList',
        query:{
            page:index,
            cat:route.query.cat
        }
    })
    playListLoading.value = true
    getData(index)
}
let pages = ref(1)
let playLists = [] as Array<PlayList>
async function getData(page?:number,cate?:string){
  let cat = '全部'
  let order = '0'
  if(route.query.cat){
    cat = route.query.cat.toString()
  }
  if(cate){
    cat = cate
  }
  if(route.query.page){
    order = (parseInt(route.query.page.toString())*50-50).toString()
  }
  if(page){
    order = ((page-1)*50).toString()
  }
  const res = await getAllPlayList(order,cat)
  pages.value = Math.ceil(parseInt(res.total)/50)
  console.log(res)
  playLists = []
  for(let i=0;i<res.playlists.length;i++){
    let playList = {} as PlayList
    playList.listId = res.playlists[i].id
    playList.title = res.playlists[i].name
    playList.url = res.playlists[i].coverImgUrl
    playLists.push(playList)
  }
  playListLoading.value = false
}
getData()

function toPlayList(id:String){
  router.push({
    name:'playList',
    query:{
      id:id.toString(),
      page:'1'
    }
  })
}
</script>

<style lang="scss" scoped>
.container{
  margin-left: 50px;
  .all{
    font-weight: lighter;
    cursor: pointer;
    font-size: 25px;
  }
  .one-container{
    display: flex;
    margin: 10px 0;
    flex-wrap: wrap;
    span{
      display: block;
      box-sizing: border-box;
      height: 25px;
      min-width: 50px;
      text-align: center;
      line-height: 25px;
      margin: 0 5px;
      padding: 0 3px;
      cursor: pointer;
    }
    span:hover{
      color: red;
    }
    .active{
      border: 1px solid #a5a5a5;
      border-radius: 7px;
      color: red;
    }
  } 
  .playlist-container{
    .playlists{
      display: flex;
      flex-wrap: wrap;
      .playlist{
        width: 200px;
        min-height: 230px;
        margin: 0 10px 10px 5px;
        img{
          width: 200px;
          height: 200px;
          cursor: pointer;
        }
        div{
          width: 200px;
          min-height: 30px;
          cursor: pointer;
        }
        div:hover{
          color: red;
        }
      }
    }
  }
}
</style>