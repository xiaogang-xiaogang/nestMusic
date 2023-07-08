<template>
  <div class="container">
    <button @click="clickPage(nowPage-1)">上一页</button>
    <div v-if="pages<10">
        <button v-for="index of pages" :key="index" @click="clickPage(index)">{{ index }}</button>
    </div>
    <div v-else>
        <div v-if="nowPage<5">
            <button @click="clickPage(index)" v-for="index of 5" :key="index" :class="{'active':nowPage==index}">{{ index }}</button>
            <span>......</span>
            <button @click="clickPage(pages)">{{ pages }}</button>
        </div>
        <div v-else-if="nowPage>pages-4">
            <button @click="clickPage(1)">1</button>
            <span>......</span>
            <button @click="clickPage(pages-5+index)" v-for="index of 5" :key="index" :class="{'active':nowPage==pages-5+index}">{{ index+pages-5 }}</button>
        </div>
        <div v-else>
            <button @click="clickPage(1)">1</button>
            <span>......</span>
            <button @click="clickPage(nowPage-1)">{{ nowPage-1 }}</button>
            <button @click="clickPage(nowPage)" class="active">{{ nowPage }}</button>
            <button @click="clickPage(nowPage+1)">{{ nowPage+1 }}</button>
            <span>......</span>
            <button @click="clickPage(pages)">{{ pages }}</button>
        </div>
    </div>
    <button @click="clickPage(nowPage+1)">下一页</button>
 </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';

const props = defineProps({
    pages:{
        type:Number,
        default:1,
    }
})

const emits = defineEmits(['changePage'])
const route = useRoute()
let nowPage = 1
function getNowPage(){
    if(route.query.page){
        nowPage = parseInt(route.query.page.toString())
    }
}
getNowPage()

function clickPage(index:number){
    nowPage = index;
    emits('changePage',index)
}
</script>

<style lang="scss" scoped>
    .container{
        margin: 5px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        button{
            height: 30px;
            min-width: 30px;
            margin: 0 5px;
            cursor: pointer;
            border: 1px solid red;
            background-color: white;
        }
        span{
            margin: 0 5px;
        }
        .active{
            color: red;
            background-color: rgb(0, 255, 238);
        }
    }
</style>