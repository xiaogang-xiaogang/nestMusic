import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";


export enum RouteName{

}

const routes:Array<RouteRecordRaw> = [
    {
        path:'/',
        component: ()=>import('@/pages/layout/index.vue'),
        redirect:'/findMusic',
        children:[
            {
                path:'/findMusic',
                name:'findMusic',
                component:()=>import('@/pages/findMusic/index.vue'),
                children:[
                    {
                        path:'',
                        name:'recommend',
                        component:()=>import('@/pages/recommond/index.vue')
                    },
                    {
                        path:'/allPlayList',
                        name:'allPlayList',
                        component:()=>import('@/pages/allPlayList/index.vue')
                    },
                    {
                        path:'/rank',
                        name:'rank',
                        component:()=>import('@/pages/rank/index.vue')
                    },
                    {
                        path:'/newMusic',
                        name:'newMusic',
                        component:()=>import('@/pages/newSong/index.vue')
                    },
                    {
                        path:'/allArtist',
                        name:'allArtist',
                        component:()=>import('@/pages/allArtist/index.vue')
                    }
                ]
            },
            {
                path:'/playList',
                name:'playList',
                component:()=> import('@/pages/playList/playList.vue')
            },
            {
                path:'/mvPlay',
                name:'mvPlay',
                component:()=> import('@/pages/mvPlay/mvPlay.vue')
            },
            {
                path:'/alList',
                name:'alList',
                component:()=>import('@/pages/alList/index.vue')
            },
            {
                path:'/artistList',
                name:'artistList',
                component:()=>import('@/pages/artistList/index.vue')
            }
        ]
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes,
    scrollBehavior:()=>{
        return {
            behavior:'smooth',
            top:0
        }
    }
})

export default router