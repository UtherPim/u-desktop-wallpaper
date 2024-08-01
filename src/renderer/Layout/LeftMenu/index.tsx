import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import styled from './index.module.scss'

export interface MenuItem {
    name: string,
    icon?: string,
    path: string,
}

const LeftMenu: React.FC = () => {
    const history = useHistory()
    const [ menuList ] = useState<MenuItem[]>([
        { name: '纯色壁纸', path: '/pure' },
        { name: '官方壁纸', path: '/official' },
        { name: '必应壁纸', path: '/bing' },
        { name: '动态壁纸', path: '/gif' },
        { name: 'WallHaven', path: '/wallhaven' },
        { name: 'deepin', path: '/deepin' },
        { name: '我的收藏', path: '/fav' },
    ])
    const [ currentMenu, setCurrentMenu ] = useState<MenuItem | null>(menuList[0])
    const [ targetTop, setTargetTop ] = useState(8)

    const handleToTargetMenu = (menu: MenuItem, index: number) => {
        setCurrentMenu(menu);
        setTargetTop(8 + index * 42)
        console.log(history)
        history.push(menu.path)
    }

    return (
        <div className={styled.leftMenu}>
            <h2>U WallPaper</h2>
            <div className={styled.menuContainer}>
                <span className={styled.itemActive} style={{ top: targetTop }}></span>
                {
                    menuList.map((menu, index) => {
                        return (
                            <div key={menu.path} 
                                className={`${styled.menuItem} ${menu.path === currentMenu?.path ?styled.active : ''}`}
                                onClick={() => {handleToTargetMenu(menu, index)}}
                            >
                                <p style={{ lineHeight: '20px' }}>{menu.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LeftMenu