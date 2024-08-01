import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

export interface BingState {
    baseUrl: string,
    todayUrl: string,
    selectedUrl: string,
    size?: string
}

const initialState = {
    baseUrl: 'https://s.cn.bing.net',
    todayUrl: '',
    lang: 'zh_CN_all',
    size: '1920*1080'
}

export const bingSlice = createSlice({
    name: 'bing',
    initialState,
    reducers: {
        setTodayUrl(state, action: PayloadAction<string>) {
            state.todayUrl = action.payload
        },
        setLang(state, action: PayloadAction<string>) {
            state.lang = action.payload
        }
    }
})

export const { setTodayUrl, setLang } = bingSlice.actions

export const bingState = (state: RootState) => state.bing 
export default bingSlice.reducer