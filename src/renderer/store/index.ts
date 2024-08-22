import { configureStore } from '@reduxjs/toolkit'
import app from './app'
import bing from './bing'
import wallhaven from './wallhaven'
import dynamic from './dynamic'

export const store = configureStore({
    reducer: {
        app,
        bing,
        wallhaven,
        dynamic
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>