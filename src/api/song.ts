import api from '@/utils/ajax'
const cancelTokenList = {}
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

export async function getSongLyric(id:string) {
    const res = await <Promise<any>>api.get(
        '/api/lyric',{
            params:{
                id:id
            }
        }
    )
    return res.lrc
}

export async function getNewSong(cate?:string) {
    const res = await <Promise<any>>api.get(
        '/api/top/song',{
            params:{
                type:cate?cate:'0'
            },

        }
    )
    return res.data
}
