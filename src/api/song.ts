import api from '@/utils/ajax'

export async function getSongUrl(id:string) {
    const res = await <Promise<any>>api.get(
        '/api/song/url/v1',{
            params:{
                id:id,
                level:'standard'
            }
        }
    )
    return res.data[0]
}

export async function getSongDetail(id:string) {
    const res = await <Promise<any>>api.get(
        '/api/song/detail',{
            params:{
                ids:id,
            }
        }
    )
    return res.songs[0]
}