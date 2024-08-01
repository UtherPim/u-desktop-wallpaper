import { configureStore } from '@reduxjs/toolkit'
import app from './app'
import bing from './bing'
import wallhaven from './wallhaven'

export const store = configureStore({
    reducer: {
        app,
        bing,
        wallhaven
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>