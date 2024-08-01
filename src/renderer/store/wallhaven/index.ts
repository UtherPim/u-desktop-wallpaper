import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

export type WallHavenTypeItem = {
    label: string,
    id: string
}

export interface WallhavenState {
    typeList: WallHavenTypeItem[],
}

const initialState = {
    typeList: [
        { label: '热门', id: '' },
        { label: '极简主义', id: 'id:2278' },
        { label: '图案', id: 'id:869' },
        { label: '风景', id: 'id:711' },
        { label: '自然', id: 'id:37' },
        { label: 'Cosplay', id: 'id:12757' },
        { label: '蜘蛛侠', id: 'id:2319' },
        { label: '吉卜力', id: 'id:1748' },
        { label: '火影忍者', id: 'id:78174' },
        { label: '科幻', id: 'id:14' },
        { label: '日漫', id: 'id:1' },
        { label: '动漫女孩', id: 'id:5' },
        { label: '赛博朋克', id: 'id:376' },
        { label: '像素艺术', id: 'id:2321' },
        { label: 'Artwork', id: 'id:323' },
        { label: 'Cityscape', id: 'id:479' },
        { label: 'Digital Art', id: 'id:13' },
        { label: 'Fantasy Art', id: 'id:853' },
        { label: 'Final Fantasy', id: 'id:997' }
    ]
}

export const wallhavenSlice = createSlice({
    name: 'wallhaven',
    initialState,
    reducers: {
        setTypeList(state, action: PayloadAction<WallHavenTypeItem[]>) {
            state.typeList = action.payload
        },
    }
})

export const { setTypeList } = wallhavenSlice.actions

export const wallhavenState = (state: RootState) => state.wallhaven 
export default wallhavenSlice.reducer