<template>
    <div class="container">
        <MusicHeader></MusicHeader>
        <MusicAside></MusicAside>
        <RouterView class="content"></RouterView>
        <MusicFooter></MusicFooter>
    </div>
</template>

<script lang="ts" setup>
import MusicHeader from '@/components/header.vue'
import MusicFooter from '@/components/footer.vue'
import MusicAside from '@/components/aside.vue'
</script>

<style lang="scss" scoped>
.content{
    margin-left: 250px;
    padding-bottom: 80px;
    margin-top: 80px;
}
</style>