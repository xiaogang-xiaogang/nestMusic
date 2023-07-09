<template>
    <div class="audio-controls">
        <audio ref="audioRef" :src="songUrl" @timeupdate="timeUpdate"></audio>
        <div class="progress"> 
            <input v-if="audioRef" type="range" min="0" :max="Math.floor(audioRef.duration)" :value="currentTime" @input="changeTime"  ref="progressRef">
            <input type="range" v-else min="0" max="100" value="0">
            <span>{{ timeFormater(Math.floor(currentTime)) }} / {{duration}}</span>
        </div>
        <div class="play-tools">
            <div class="buttons">
                <button class="pre-button"><img src="../assets/img/musicplay/xiayishou.png" alt=""></button>
                <button class="puase-button" @click="play">
                    <img v-if="isPuase" src="../assets/img/musicplay/bofang.png" alt=""> 
                    <img v-else src="../assets/img/musicplay/zanting.png" alt="">
                </button>
                <button class="next-button"><img src="../assets/img/musicplay/xiayishou.png" alt=""></button>
            </div>
            <div class="others">
                <div class="volume" 
                ref="volumeRef"
                @mouseover="showVolume=true" 
                @mouseleave="showVolume=false"
                >
                    <img 
                    src="../assets/img/musicplay/yinliang.png" alt="">
                    <input v-if="showVolume" type="range" min="0" max="100" value="50" >
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue';
import {timeFormater} from "@/composale/timeTools"


const props = defineProps({
    songUrl:{
        type:String,
        default:''
    }
})
let showVolume = ref(false)
let audioRef = ref<HTMLAudioElement>()
let progressRef = ref<HTMLInputElement>()
let duration = ref('00:00')
let currentTime = ref(0)
let isPuase = ref(true)

function play(e:Event){
    e.stopPropagation()
    let audio = audioRef.value
    if(audio){
        if(isPuase.value){
            audio.play()
        }else{
            audio.pause()
        }
        isPuase.value = !isPuase.value 
    }
}

function timeUpdate(){
    let audio = audioRef.value
    if(audio){
        currentTime.value = audio.currentTime
    }
}

function changeTime(e:Event){
    let audio = audioRef.value
    if(audio){
        audio.currentTime=e.target.value
    }
}

const musicPlay = ()=>{
    let audio = audioRef.value
    if(audio){
        nextTick(
            ()=>{
                audio.play()
                isPuase.value = false
            }
        )
    }   
    }

onMounted(()=>{
    let audio = audioRef.value
    if(audio){
        audio.oncanplay = function(){
            duration.value = timeFormater(Math.floor(audio.duration))
            currentTime.value = audio.currentTime
        }
    }
})
defineExpose({
    musicPlay,
    isPuase,
}
)
</script>

<style lang="scss" scoped>
.audio-controls{
    width: 100%;
    height: 100%;
    background-color: #fff;
    .progress{
        width: 90%;
        display: flex;
        align-items: center;
        input{
            width: 80%;
        }
        span{
            margin-left: 10px;
        }
    }
    .play-tools{
        display: flex;
        .buttons{
            margin-left: 31%;
            margin-right: 30%;
            display: flex;
            button{
                width: 30px;
                height: 30px;
                margin-right: 10px;
                border-radius: 50%;
                border: 0;
                background-color: white;
                cursor: pointer;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            button:active{
                border: 1px solid black;
            }
            .pre-button{
                transform: rotate(180deg);
            }
        }
        .others{
            z-index: 100;
            .volume{
                margin-left: 100px;
                width: 30px;
                height: 30px;
                position: relative;
                display: flex;
                cursor: pointer;
                img{
                    width: 100%;
                    height: 100%;
                }
                input{
                    
                }
            }
        }
    }
}
</style>