import axios from './index'

export type WallHavenPaperItem = {
    raw: string,
    thumb: string,
    id: string,
    name: string
}

export type WallHavenListRes = {
    code: number,
    data: WallHavenPaperItem[]
}

export type HavenListParam = {
    page: number,
    size: number,
    q: string
}

export const getWallHavenListByTypeId = (params: HavenListParam): Promise<WallHavenListRes> => {
    return axios({
        url: `https://api.codelife.cc/wallpaper/wallhaven?lang=cn&page=${params.page}&size=${params.size}&q=${params.q}`
    })
}

export const downloadUHDSource = (url: string): Promise<Blob> => {
    return axios({
        url,
        responseType: 'blob'
    })
}