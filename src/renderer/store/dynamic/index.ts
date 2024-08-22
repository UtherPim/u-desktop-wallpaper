import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '..'

export interface DynamicState {
    currentWinId: number | null,
}

const initialState: DynamicState = {
    currentWinId: 0
}

export const dynamicSlice = createSlice({
    name: 'dynamic',
    initialState,
    reducers: {
        setCurrentWinId(state, action: PayloadAction<number | null>) {
            state.currentWinId = action.payload
        }
    }
})

export const { setCurrentWinId } = dynamicSlice.actions

export const dynamicState = (state: RootState) => state.dynamic

export default dynamicSlice.reducer
