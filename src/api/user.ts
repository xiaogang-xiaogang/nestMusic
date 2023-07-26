import api from '@/utils/ajax'


export async function getLikeMusic(uid:string) {
    const res = await <Promise<any>>api.get(
        '/api/user/playlist',{
            params:{
                uid
            }
        }
    )
    return res
}

export async function recentPlay() {
    const res = await <Promise<any>>api.get(
        '/api/record/recent/song'
    )
    return res
}