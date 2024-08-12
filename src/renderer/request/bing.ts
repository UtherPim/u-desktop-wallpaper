import axios from './index'

export interface BingPaper {
    copyright: string,
    copyrightlink?: string,
    startdate?: string,
    enddate: string,
    fullSrc: string,
    raw: string,
    thumb: string,
    urlbase: string,
    _id: string
}

export interface BingListRes {
    count?: number,
    msg: string,
    code: number,
    data: BingPaper[],
    page?: number,
    pages?: number,
    size?: number
}

export type BingListParams=  {
    page: number,
    size: number,
}

export const getBingPaperList = (params: BingListParams): Promise<BingListRes> => axios({
    url: `https://api.codelife.cc/bing/list?lang=cn&page=${params.page}&size=${params.size}`
})


export const download4kBingPaper = (url: string): Promise<Blob> => {
    return axios({
        url,
        responseType: 'blob'
    })
}