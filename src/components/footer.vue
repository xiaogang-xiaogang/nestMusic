<template>
  <div class="container">
    <img class="music-img" src="https://picsum.photos/id/684/60/60" alt="">
    <div class="musicInf">
        <span class="music-name">曲名</span>
        <span class="musicor">演唱者</span>
    </div>
    <MusicPlay></MusicPlay>
 </div>
</template>

<script lang="ts" setup>
import MusicPlay from './musicplay.vue'
</script>

<style lang="scss" scoped>
    .container{
        position: fixed;
        bottom: 0;
        height: 60px;
        border-top: 1px solid rgb(230, 230, 230);
        width: 100%;
        display: flex;
        .music-img{
            margin-left: 5px;
            width: 60px;
            height: 60px;
        }
        .musicInf{
            width: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .musicor{
                font-size: 13px;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
</style>