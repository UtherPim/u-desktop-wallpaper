import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from './fullscreen.module.scss'

const Fullscreen: React.FC = () => {
    const location = useLocation()
    const query = location.search
    console.log(query)
    const vPath = query.split('=')[1]
    return (
        <video loop autoPlay muted className={styled.fullscreen} src={vPath}>{ vPath }</video>
    )
}

export default Fullscreen;