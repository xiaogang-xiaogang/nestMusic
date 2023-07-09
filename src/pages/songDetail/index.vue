<template>
  <div class="container1">
    <img class="close" src="../../assets/img/向下.png" alt="" @click="closeDetail">
    <div class="detail-content">
        <div class="detail-left">
            <div class="img-container">
                <img :src="url" alt="">
            </div>
            <div class="play-bar-container" ref="playBarContainerRef" style="transition: all 0.5s;">
                <img class="play-bar" src="../../assets/img/play-bar.png" alt="">
                <img class="play-bar-middle" src="../../assets/img/play-bar-middle.png" alt="">
            </div>
        </div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const emits = defineEmits(['close'])
let playBarContainerRef = ref<HTMLDivElement>()
const props = defineProps({
    url:{
        type:String,
        default:"https://picsum.photos/id/684/60/60"
    },
    isPuase:{
        type:Boolean,
        default:true
    }
})
function closeDetail(){
    emits('close')
}
watch(
    ()=>props.isPuase,
    isPuasing=>{
        if(isPuasing==true){
            playBarContainerRef.value.style.transform = "rotate(-20deg)"
        }else{
            playBarContainerRef.value.style.transform = "rotate(10deg)"
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
        height: 100%;
        .detail-left{
            width: 40%;
            height: 100%;
            position: relative;
            .img-container{
                position: absolute;
                width: 225px;
                height: 225px;
                border: 75px solid black;
                border-radius: 50%;
                left: 50%;
                top: 35%;
                transform: translate(-50%,-50%);
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
}
</style>