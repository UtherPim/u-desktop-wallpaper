import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

export type WindowStatusType = 'min' | 'default' | 'resize' | 'max'
export type PaperType = 'color' | 'gradient' | 'pic'

export interface AppState {
    windowStatus: WindowStatusType,
    paperType: PaperType,
    colorPaper?: string,
    selectedDefaultColor?: string,
    selectedGradientColor?: string,
    picUrl?: string
}

const initialState: AppState = {
    windowStatus: 'default',
    paperType: 'color',
    colorPaper: 'rgb(59, 120, 220)',
    selectedDefaultColor: 'rgb(252, 150, 211)',
    selectedGradientColor: '',
    picUrl: 'https://s.cn.bing.net/th?id=OHR.HoodoosBryce_ZH-CN8398575172_1920x1080.webp&qlt=50'
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setWindowStatus(state, action: PayloadAction<WindowStatusType>) {
            state.windowStatus = action.payload
        },
        setColorPaper(state, action: PayloadAction<string>) {
            state.colorPaper = action.payload
        },
        setDefaultColor(state, action: PayloadAction<string>) {
            state.selectedDefaultColor = action.payload
        },
        setGradientColor(state, action: PayloadAction<string>) {
            state.selectedGradientColor = action.payload
        },
        setPaperType(state, action: PayloadAction<PaperType>) {
            state.paperType = action.payload
        },
        setPicUrl(state, action: PayloadAction<string>) {
            state.picUrl = action.payload
        }
    }
})

export const { setWindowStatus, setColorPaper, setPaperType, setPicUrl, setDefaultColor, setGradientColor } = appSlice.actions

export const stateValue = (state: RootState) => state.app

export default appSlice.reducer;