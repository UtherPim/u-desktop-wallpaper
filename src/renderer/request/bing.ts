import axios from './index'

export interface BingPaper {
    copyright: string,
    copyrightlink?: string,
    startdate: string,
    enddate: string,
    title: string,
    url: string,
    urlbase: string
}

export interface BingListRes {
    Total: number,
    message: string,
    success: boolean,
    data: BingPaper[]
}

export const getBingPaperList = (lang: string = 'zh-CN_all'): Promise<BingListRes> => axios({
    url: `https://raw.onmicrosoft.cn/Bing-Wallpaper-Action/main/data/${lang}.json`
})


export const download4kBingPaper = (urlbase: string): Promise<Blob> => {
    const rUrl = urlbase + '_UHD.jpg'
    return axios({
        url: rUrl,
        responseType: 'blob'
    })
}