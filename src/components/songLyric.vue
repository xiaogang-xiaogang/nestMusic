<template>
  <div class="container">
    <div class="song-title">{{ name }}</div>
    <div class="song-detail">
        <div class="play-list">专辑:{{ alName }}</div>
        <div class="songer">歌手:{{ songer }}</div>
    </div>
    <div class="lyric-content" @mousedown="mouseDown" @mouseup="mouseUp" ref="lyricContainerRef">
        <div class="lyric" ref="lyricRef">
            <div :ref="refs.set" :class="{'active':active==index}" class="one" v-for="(item, index) in lyric" :key="index">{{ item }}</div>
        </div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { useTemplateRefsList } from '@vueuse/core';
import { fi } from 'element-plus/es/locale';
import { ref, watch } from 'vue';

const props = defineProps({
    lyric:{
        type:Array<String>,
        default:[]
    },
    songer:{
        type:String,
        default:''
    },
    alName:{
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
    },
    lyricTime:{
        type:Array<Number>,
        default:[]
    }
}
)
const refs = useTemplateRefsList<HTMLDivElement>()
const lyricContainerRef=ref<HTMLDivElement>()
const lyricRef = ref<HTMLDivElement>()
let active = ref(0)
watch(
    ()=>props.currentTime,
    currentTime=>{
        if(currentTime>=Number(props.lyricTime[props.lyricTime.length-1])){
            active.value = props.lyricTime.length-1
            return
        }
        for(let i=0;i<props.lyricTime.length-1;i++){
            if(currentTime<Number(props.lyricTime[i+1])&&currentTime>=Number(props.lyricTime[i])){
                active.value=i
                break
            }
        }
        // console.log(currentTime)
    }
)

watch(
    ()=>active.value,
    active=>{
        if(refs.value[active].getBoundingClientRect().top-lyricContainerRef.value.getBoundingClientRect().top<=0){
            lyricContainerRef.value.scrollTop += refs.value[active].getBoundingClientRect().top-lyricContainerRef.value.getBoundingClientRect().top
        }else if(refs.value[active].getBoundingClientRect().top-lyricContainerRef.value.getBoundingClientRect().top>lyricContainerRef.value.clientHeight-23){
            lyricContainerRef.value.scrollTop += refs.value[active].getBoundingClientRect().top-lyricContainerRef.value.getBoundingClientRect().top-lyricContainerRef.value.clientHeight+23
        }
    }
)
let y:number=0

function scrollLyric(e:Event){
    let y1:number = e.clientY
    lyricContainerRef.value.scrollTop += y-y1
    y=y1
}

function mouseDown(e:Event){
    y= e.clientY
    document.addEventListener("mousemove",scrollLyric)
}
function mouseUp(e:Event){
    document.removeEventListener("mousemove",scrollLyric)

}
</script>

<style lang="scss" scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .song-title{
        font-size: 22px;
        font-weight: bolder;
        color: red;
    }
    .song-detail{
        display: flex;
        .play-list{
            margin-right: 15px;
        }
    }
    .lyric-content{
        width: 100%;
        height: 90%;
        // flex-grow:0;
        // flex-shrink:0; 
        overflow: hidden;
        cursor: pointer;
        .lyric{
            width: 100%;
            transition: all 1s ease-in-out;
            .one{
                width: 100%;
                text-align: center;
                user-select: none;
            }
            .active{
                font-size: 16px;
                color: red;
            }
        }
    }
}
</style>