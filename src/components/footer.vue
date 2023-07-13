<template>
    <Teleport to="body">
        <Transition name="detail" >
            <SongDetail :currentTime="musicPlayRef.currentTime" :name="song.name" :alName="song.alName" :songer="song.songer" :id="song.id" :url="song.imgUrl" :isPuase="musicPlayRef.isPuase" v-if="isIgnoreSongDetail"  @close="unshowDetail"></SongDetail>
        </Transition>
    </Teleport>
    <div class="container">
        <img class="music-img" @click="showDetail" :src="song.imgUrl?song.imgUrl:defaultUrl" alt="">
        <div class="musicInf">
            <span class="music-name">{{ song.name?song.name:'歌曲名' }}</span>
            <span class="musicor">{{ song.songer?song.songer:'歌手' }}</span>
        </div>
        <MusicPlay :songUrl="song.url" ref="musicPlayRef"></MusicPlay>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import MusicPlay from './musicplay.vue'
import { useMusicPlayStore } from '@/store/playmusic';
import { Song } from '@/composale/song.d';
import {getSongDetail, getSongUrl} from '@/api/song'
import SongDetail from '@/pages/songDetail/index.vue'

let song = ref<Song>({} as Song)
let musicPlayRef = ref<any>()
let isIgnoreSongDetail = ref(false)
async function getMusicUrl(id:string) {
    let res = await getSongUrl(id)
    song.value.url = res.url
    musicPlayRef.value.musicPlay()
}
let defaultUrl = "https://picsum.photos/id/684/60/60"
async function getMusicDetail(id:string) {
    let res = await getSongDetail(id)
    song.value.name = res.name
    song.value.imgUrl = res.al.picUrl
    song.value.songer =  res.ar[0].name
    song.value.alName = res.al.name
    song.value.alId = res.al.id
    song.value.songerId = res.ar[0].id
}

const store = useMusicPlayStore()
watch(
    ()=>store.id,
    id=>{
        song.value.id = id
        getMusicDetail(id)
        getMusicUrl(id)
    }
)

function showDetail(){
    isIgnoreSongDetail.value=true
}

function unshowDetail(){
    isIgnoreSongDetail.value=false
}
</script>

<style lang="scss" scoped>
    @keyframes bottom-change {
        from{
            top: calc(100% - 60px);
        }
        to{
            top:60px;
        }
    }
    .detail-enter-active {
        animation: bottom-change .5s;
    }
    .detail-leave-active {
        animation: bottom-change .5s reverse;
    }
    .container{
        position: fixed;
        bottom: 0;
        height: 60px;
        border-top: 1px solid rgb(230, 230, 230);
        width: 100%;
        display: flex;
        .music-img{
            margin-left: 5px;
            margin-right: 5px;
            width: 60px;
            height: 60px;
            cursor: pointer;
        }
        .musicInf{
            width: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .musicor{
                font-size: 13px;
                width: 100px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .music-name{
                width: 100px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
</style>