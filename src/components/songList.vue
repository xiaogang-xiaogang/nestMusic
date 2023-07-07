<template>
  <div class="container">
    <div class="title">
      <div class="blank"></div>
      <div class="song-title">音乐标题</div>
      <div class="songer">歌手</div>
      <div class="al">专辑</div>
      <div class="time-long">时长</div>
    </div>
    <div class="song-content" :class="{'active':index%2==0}" v-for="(item, index) in songs" :key="index">
      <div class="blank">{{ index+1 }}</div>
      <div class="song-title">{{ item.title }}</div>
      <div class="songer">{{ item.songer }}</div>
      <div class="al">{{ item.alName }}</div>
      <div class="time-long">{{ timeFormater(parseInt(item.timeLong)) }}</div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { SongDetail } from '@/composale/playList.d'
import { timeFormater } from '@/composale/timeTools'
import { PropType } from 'vue';
const props = defineProps({
  songs:{
    type:Array as PropType<SongDetail>,
    default:[],
  }
})
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  .title{
    display: flex;
    height: 40px;
    .blank{
      width: 15%;
      height: 100%;
    }
    .song-title{
      width: 30%;
      height: 100%;
    }
    .songer{
      width: 15%;
      height: 100%;
    }
    .al{
      width: 30%;
      height: 100%;
    }
    .time-long{
      width: 10%;
      height: 100%;
    }
  }
  .active{
    background-color: rgba(128, 128, 128, 0.1);
  }
  .song-content{
    display: flex;
    height: 35px;
    cursor: pointer;
    div{
      line-height: 35px;
    }
    .blank{
      width: 15%;
      height: 100%;
    }
    .song-title{
      width: 30%;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .songer{
      width: 15%;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .al{
      width: 30%;
      height: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .time-long{
      width: 10%;
      height: 100%;
    }
  }
}
</style>