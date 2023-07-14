<template>
  <div class="container">
    <div class="songs-container">
        <div class="song" v-for="(item, index) in songs" :key="index">
            <div class="index">{{ index+1 }}</div>
            <img :src="item.imgUrl" @click="playMusic(index)" alt="">
            <div class="song-detail" @click="playMusic(index)">
                <div>{{ item.name }}</div>
                <div >{{ item.songer }}</div>
            </div>
            <div class="mv-play" v-if="item.mvId!=null&&item.mvId!=0" @click="toMvPlay(index)">
                <img src="../../assets/img/aside/MV.png" alt="">
            </div>
        </div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { Song } from '@/composale/song';
import { useMusicPlayStore } from '@/store/playmusic';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    data:{
        type:Array,
        default:[]
    }
})
const songs = [] as Array<Song>
function getSongs(){
    for(let i=0;i<props.data.length;i++){
        for(let j=0;j<props.data[i].resources.length;j++){
            let song = {} as Song
            console.log(props.data[i].resources[j].resourceExtInfo.songData.id)
            song.id = props.data[i].resources[j].resourceExtInfo.songData.id
            song.name = props.data[i].resources[j].resourceExtInfo.songData.name
            song.songer = props.data[i].resources[j].resourceExtInfo.songData.artists[0].name
            song.songerId = props.data[i].resources[j].resourceExtInfo.songData.artists[0].id
            song.imgUrl = props.data[i].resources[j].resourceExtInfo.songData.album.picUrl
            song.mvId = props.data[i].resources[j].resourceExtInfo.songData.mvid
            songs.push(song)
            if(songs.length>=6){
                console.log(songs)
                return
            }
        }
    }
}
getSongs()
watch(
    ()=>props.data,
    data=>{
        getSongs()
    }
)
const store = useMusicPlayStore()
function playMusic(index:number){
  store.id=songs[index].id.toString()
}
const router = useRouter()
function toMvPlay(index:number){
    let id = songs[index].mvId
    router.push({
        name:'mvPlay',
        query:{
            id:id.toString(),
        }
    })
}
</script>

<style lang="scss" scoped>
.songs-container{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 350px;
    width: 70%;
    .song{
        width: 40%;
        height: 90px;
        display: flex;
        align-items: center;
        margin: 0 10px;
        user-select:none;
        .index{
            margin-right: 10px;
        }
        img{
            width: 70px;
            height: 70px;
            margin-right: 30px;
        }
        .song-detail{
            flex: 1;
        }
        .mv-play{
            width: 30px;
            height: 30px;
            margin-right: 10px;
            cursor: pointer;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .song:hover{
        background-color: #a5a5a5;;
    }
}
</style>