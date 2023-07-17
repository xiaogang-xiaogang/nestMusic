<template>
  <div v-if="loading">
    <Loading></Loading>
 </div>
 <div v-else>
    <div class="container">
      <div class="detailList-container">
        <Card title="官方榜">
            <div class="detailList" v-for="(item, index) in fiveList" :key="index">
            <img :src="item.url" alt="" @click="toPlayList(item.listId)">
            <div v-if="detailLoading"><Loading></Loading></div>
            <div v-else class="songs-container">
              <div class="song" v-for="(song, i) in fiveDetailList[index]" :key="i" @click="playMusic(index,i)">
                <div class="index">{{ i+1 }}</div>
                <div class="title">{{ song.title }}</div>
                <div class="songer">{{ song.songer }}</div>
              </div>
              <div class="more" @click="toPlayList(item.listId)">>>查看更多</div>
            </div>
          </div>

        </Card>
      </div>
      <div class="remainList-container">
        <Card title="全球榜">
          <div class="remainlists">
            <div class="remainList" v-for="(item, index) in remainList" :key="index">
              <img :src="item.url" alt="" @click="toPlayList(item.listId)">
              <div @click="toPlayList(item.listId)">{{ item.title }}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { getRank, getSongs } from '@/api/playList';
import { PlayList, SongDetail } from '@/composale/playList';
import Card from '@/components/card.vue';
import { Song } from '@/composale/song';
import { ref } from 'vue';
import Loading from '@/components/loading.vue';
import { useMusicPlayStore } from '@/store/playmusic';
import { useRouter } from 'vue-router';


let loading = ref(true)
let detailLoading = ref(true)
let fiveList = [] as Array<PlayList>
let fiveDetailList = [] as Array<SongDetail[]>
let remainList = [] as Array<PlayList>

async function getTopList() {
  const lists = await getRank()
  for(let i=0;i<5;i++){
    let playList = {} as PlayList
    playList.listId = lists[i].id
    playList.title = lists[i].name
    playList.url = lists[i].coverImgUrl
    fiveList.push(playList)
    fiveDetailList.push([])
    getFive(playList.listId,i)
  }
  for(let i=5;i<lists.length;i++){
    let playList = {} as PlayList
    playList.listId = lists[i].id
    playList.title = lists[i].name
    playList.url = lists[i].coverImgUrl
    remainList.push(playList)
  }
  loading.value = false
}

async function getFive(id:String,index:number) {
  const songs = await getSongs(id.toString(),'0','5')
  for(let i=0;i<songs.length;i++){
    let song:SongDetail = {} as SongDetail
      song.title = songs[i].name
      song.songer = songs[i].ar[0].name
      song.alId = songs[i].al.id
      song.alName = songs[i].al.name
      song.isLove = false
      song.timeLong = Math.floor(parseInt(songs[i].dt)/1000)
      song.id = songs[i].id
      fiveDetailList[index].push(song)
  }
  if(fiveDetailList[0].length!=0&&fiveDetailList[1].length!=0&&fiveDetailList[2].length!=0&&fiveDetailList[3].length!=0&&fiveDetailList[4].length!=0){
    detailLoading.value = false
  }
}
getTopList()
const store = useMusicPlayStore()
function playMusic(index:number,i:number){
  store.id=fiveDetailList[index][i].id.toString()
}

const router = useRouter()
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
  margin: 0 50px;

  .detailList-container{
    .detailList{
      height: 230px;
      display: flex;
      width: 100%;
      margin: 20px 0;
      img{
        width: 200px;
        height: 200px;
        cursor: pointer;
      }
      .songs-container{
        width: 100%;
        padding: 0 20px;
        cursor: pointer;
        .song{
          display: flex;
          align-items: center;
          padding: 8px 20px;
          width: 100%;
          .index{
            width: 30px;
          }
          .title{
            flex-grow: 1;
          }
        }
        .song:hover{
          background-color: red;
        }
        .more{
          padding: 0 20px;
          cursor: pointer;
        }
        .more:hover{
          color: red;
        }
      }
    }
  }
  .remainList-container{
    .remainlists{
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .remainList{
        width: 200px;
        height: 240px;
        margin: 10px 10px;
        img{
          width: 200px;
          height: 200px;
          cursor: pointer;
        }
        div{
          width: 200px;
          height: 40px;
          overflow : hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          word-break: break-all;
          -webkit-line-clamp: 2; // 多行益出
          cursor: pointer;
        }
      }
    }
  }
}
</style>