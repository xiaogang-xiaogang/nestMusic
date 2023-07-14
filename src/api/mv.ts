import api from '@/utils/ajax'

export async function getMv(id:string) {
    const res = await <Promise<any>>api.get(
        '/api/mv/detail',{
            params:{
                mvid:id
            }
        }
    )
    return res.data as any
}

export async function getMvUrl(id:string) {
    const res = await <Promise<any>>api.get(
        '/api/mv/url',{
            params:{
                id:id
            }
        }
    )
    return res.data
}

export async function getLikeCount(id:string) {
    const res = await <Promise<any>>api.get(
        '/api/mv/detail/info',{
            params:{
                mvid:id
            }
        }
    )
    return res.likedCount as String
}