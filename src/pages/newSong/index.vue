<template>
  <div class="container">
    <div class="title-container">
        <div class="new-song" :class="{'noactive':flag==1}" @click="change0">新歌速递</div>
        <div class="new-al" :class="{'noactive':flag==0}" @click="change1">新碟上架</div>
    </div>
    <component :is="isComp"></component>
 </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NewSongList from './newSongList.vue'
import NewAlList from './newAlList.vue'

let flag = ref(0)
const router = useRouter()
const route = useRoute()
if(route.query.flag=='1'){
    flag.value = 1
}
const isComp = computed(()=>{
    if(flag.value==1){
        return NewAlList
    }else{
        return NewSongList
    }
})
function change0(){
    flag.value = 0
    router.push({
        name:'newMusic',
        query:{
            flag:'0'
        }
    })
}
function change1(){
    flag.value = 1
    router.push({
        name:'newMusic',
        query:{
            flag:'1'
        }
    })
}

</script>

<style lang="scss" scoped>
.container{
    box-sizing: border-box;
    padding: 20px 50px;
    width: 100%;
    .title-container{
        margin: 0 auto;
        height: 30px;
        width: 168px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #909399;
        border-radius: 30px;
        div{
            height: 30px;
            text-align: center;
            line-height: 30px;
            padding: 0 10px;
            border-radius: 30px;
            cursor: pointer;
            background-color:#909399;
        }
        .noactive{
            background-color:white;
        }
        .noactive:hover{
            background-color:#9099953d;
        }
    }
}
</style>