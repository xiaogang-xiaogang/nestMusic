<template>
    <div class="audio-controls">
        <audio ref="audioRef" src="http://m8.music.126.net/20230703181121/a12a1a3762c1a8241b235cc38adde8d3/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3" @timeupdate="timeUpdate"></audio>
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
                    <div class="block">&nbsp;&nbsp;&nbsp;&nbsp; </div>
                    <input v-if="showVolume" type="range" min="0" max="100" value="50" >
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue';
import {timeFormater} from "@/composale/timeTools"

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
function beginPlay(e:Event){
    let audio = audioRef.value
    audio.play()
    isPuase.value = false
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
defineExpose(
    beginPlay,
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
                margin-left: 250px;
                width: 30px;
                height: 30px;
                position: relative;
                display: flex;
                cursor: pointer;
                transform: rotate(-90deg);
                img{
                    width: 100%;
                    height: 100%;
                    transform: rotate(90deg);
                }
                .block{
                    height: 30px;
                }
                input{
                    
                }
            }
        }
    }
}
</style>