import axios from './index'

export type DynamicPaperItem = {
    poster: string,
    thumb: string,
    _id: string,
    url: string
}

export type DynamicListRes = {
    code: number,
    data: DynamicPaperItem[]
}

export type DynamicListParam = {
    page: number,
    size: number,
    sortKey: string
}

export const getDynamicListBySort = (params: DynamicListParam): Promise<DynamicListRes> => {
    return axios({
        url: `https://api.codelife.cc/wallpaper/video/list?lang=cn&page=${params.page}&size=${params.size}&sortKey=${params.sortKey}`
    })
}

export const downloadUHDSource = (url: string): Promise<Blob> => {
    return axios({
        url,
        responseType: 'blob'
    })
}