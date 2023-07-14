import api from '@/utils/ajax'

export async function getFindMusic() {
    const res = await (<Promise<any>>api.get('/api/homepage/block/page'))
    return res.data as any
}

export async function getSelf() {
    const res = await (<Promise<any>>api.get('/api/personalized/privatecontent'))
    return res.result as any
}