<template>
  <div class="container" >
    <div class="coursel-item" @mouseenter="stopCoursel" @mouseleave="continueCoursel" v-for="(item, index) in data" style="transition: all 1s;" :key="index" :ref="refs.set">
      <img :src="item.pic" alt="">
    </div>
    <div class="coursel-buttons">
       <div class="coursel-button" @mouseenter="changeLoc(index)" @mouseleave="continueCoursel" :class="{'active':(loc-1+props.data.length)%props.data.length==index}" v-for="(item, index) in data" :key="index"></div>
    </div>
 </div>
</template>

<script lang="ts" setup>
import { useTemplateRefsList } from '@vueuse/core';
import { onMounted, ref } from 'vue';



const props = defineProps({
  data:{
    type:Array,
    default:[]
  }
})
let refs = useTemplateRefsList<HTMLDivElement>()
let loc = ref(0)
let id:number
function startCoursel(){
  let rv = refs.value
  for(let i=0;i<props.data.length;i++){
    // 注意缩放会导致left的位置发生变化
    if(loc.value==i){
      rv[i].style.left = 30+"%"
      rv[i].style.transform = "scale(1,1)"
      rv[i].style.zIndex = "2"
    }else if(i==((loc.value-1+props.data.length)%props.data.length)){
      rv[i].style.transform = "scale(0.9,0.9)"
      rv[i].style.left=-4+"%"
      rv[i].style.zIndex = '1'
    }else if(i==(loc.value+1)%props.data.length){
      rv[i].style.transform = "scale(0.9,0.9)"
      rv[i].style.left=60+"%"
      rv[i].style.zIndex = '1'
    }else if(i==((loc.value-2+props.data.length)%props.data.length)){
      rv[i].style.transform = "scale(0.9,0.9)"
      rv[i].style.left=-30+"%"
      rv[i].style.zIndex = '0'
    }
    else{
      rv[i].style.left=100+"%"
      rv[i].style.zIndex = '0'
      rv[i].style.transform = "scale(0.9,0.9)"
    }
  }
  loc.value = (loc.value+1)%props.data.length
}
onMounted(()=>{
  startCoursel()
  id = setInterval(()=>startCoursel(),3000)
})

function continueCoursel(){
  id = setInterval(()=>startCoursel(),3000)
}

function stopCoursel(){
  clearInterval(id)
}

function changeLoc(index:number){
  loc.value = index
  startCoursel()
  stopCoursel()
}
</script>

<style lang="scss" scoped>
  .container{
    display: flex;
    width: 97%;
    height: 350px;
    margin: 30px auto;
    overflow: hidden;
    position: relative;
    padding: 0px;
    background-color: white;
    .coursel-item{
      width: 40%;
      height: 300px;
      position: absolute;
      cursor: pointer;
      img{
        width: 100%;
        height: 300px;
      }
    }
    .coursel-buttons{
      position: absolute;
      bottom: 10px;
      display: flex;
      width: 100%;
      height: 5px;
      justify-content: center;
      align-items: center;
      .coursel-button{
        height: 5px;
        width: 30px;
        background-color: #e6e6e6;
        margin: 0 10px;
        cursor: pointer;
      }
      .active{
        background-color: blue;
      }
    }
  }
</style>