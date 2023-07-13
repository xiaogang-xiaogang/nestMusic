<template>
  <div class="container1">
    <img class="close" src="../../assets/img/向下.png" alt="" @click="closeDetail">
    <div class="detail-content">
        <div class="detail-left">
            <div class="img-container" ref="imgRef">
                <img :src="url" alt="">
            </div>
            <div class="play-bar-container" ref="playBarContainerRef"  style="transition: all 0.5s;">
                <img class="play-bar" src="../../assets/img/play-bar.png" alt="">
                <img class="play-bar-middle" src="../../assets/img/play-bar-middle.png" alt="">
            </div>
        </div>
        <div class="detail-right">
            <SongLyric :currentTime="currentTime" :lyricTime="lyricTime" :name="name" :lyric="lyricArr" :songer="songer" :alName="alName"></SongLyric>
        </div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import {getSongLyric} from '@/api/song'
import SongLyric from '@/components/songLyric.vue';
const emits = defineEmits(['close'])
let playBarContainerRef = ref<HTMLDivElement>()
let imgRef = ref<HTMLDivElement>()
let animation = new Animation()
let lyricArr = ref<string[]>([])
let lyricTime = ref<Number[]>([])
const props = defineProps({
    url:{
        type:String,
        default:"https://picsum.photos/id/684/60/60"
    },
    isPuase:{
        type:Boolean,
        default:true
    },
    id:{
        type:String,
        default:''
    },
    alName:{
        type:String,
        default:''
    },
    songer:{
        type:String,
        default:''
    },
    name:{
        type:String,
        default:''
    },
    currentTime:{
        type:Number,
        default:0
    }
})
function closeDetail(){
    emits('close')
}

async function getLyric() {
    let lrc = await getSongLyric(props.id)
    let lyric = lrc.lyric
    lyricArr.value = lyric.split('\n')
    lyricArr.value.pop()
    for(let i=0;i<lyricArr.value.length;i++){
        let ms = parseInt(lyricArr.value[i].substring(1,3))*60*1000+parseInt(lyricArr.value[i].substring(4,6))*1000+parseInt(lyricArr.value[i].substring(7,10))
        lyricTime.value.push(ms/1000)
        lyricArr.value[i] = lyricArr.value[i].substring(11)
    }
}
getLyric()
watch(
    ()=>props.isPuase,
    isPuasing=>{
        if(isPuasing==true){
            playBarContainerRef.value.style.transform = "rotate(-20deg)"
            animation.pause()
        }else{
            playBarContainerRef.value.style.transform = "rotate(10deg)"
            animation.play()
        }
    }
)
onMounted(
    ()=>{
        animation = imgRef.value.animate(
            [
                {transform:'rotate(0)'},
                {transform:'rotate(360deg)'}
            ],{
                duration:10000,
                iterations:Infinity
            }
        )
        animation.pause()
        if(props.isPuase==false){
            playBarContainerRef.value.style.transform = "rotate(10deg)"
            animation.play()
        }
    }
)
</script>

<style lang="scss" scoped>
.container1{
    position: absolute;
    left: 0;
    top: 60px;
    width: 100%;
    height: calc(100% - 121px);
    z-index: 3;
    background-color: white;

    .close{
        width: 30px;
        height: 30px;
        display: block;
        cursor: pointer;
    }
    .detail-content{
        display: flex;
        width: 100%;
        height: 90%;
        .detail-left{
            width: 40%;
            height: 100%;
            margin-right: 3%;
            position: relative;
            .img-container{
                position: absolute;
                width: 225px;
                height: 225px;
                border: 75px solid black;
                border-radius: 50%;
                left: calc(50% - 150px);
                top: calc(35% - 150px);
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .play-bar-middle{
                position: absolute;
                top:0;
                left: 50%;
                width: 30px;
                height: 30px;
                transform: translateX(-50%) rotate(180deg);
            }
            .play-bar{
                position: absolute;
                left: 50%;
                top: 13px;
                height: 180px;
                transform: rotate(-5deg) translateX(0px);
            }
            .play-bar-container{
                transform: rotate(-20deg);
            }
        }
    }
    .detail-right{
        
        width: 40%;
        height: 100%;
        border: 1px solid gray;
    }
}
</style>