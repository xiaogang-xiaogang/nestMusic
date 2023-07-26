<template>
  <div>

 </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { getLikeMusic} from '@/api/user'
import { getListDetail, getSongs} from '@/api/playList'

const router = useRouter()
async function getData() {
    if(localStorage.getItem('useId')){
        let uid = localStorage.getItem('useId')
        let res = await getLikeMusic(uid)
        router.replace({
            name:'playList',
            query:{
                id:res.playlist[0].id,
                page:'1'
            }
        })

    }else{
        alert('请先登录')
        router.replace({
            name:'findMusic'
        })
    }
}
getData()
</script>

<style lang="scss" scoped>

</style>