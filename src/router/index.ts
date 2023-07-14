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