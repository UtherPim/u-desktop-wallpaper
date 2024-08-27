import React, { useState, useEffect, useRef } from 'react'
import styled from './index.module.scss'
import { getDynamicListBySort } from '_renderer/request/dynamic'
import type { DynamicPaperItem } from '_renderer/request/dynamic'
import { Tabs, Button, message } from 'antd'
import type { TabsProps } from 'antd'
import DynamicList from './DynamicList'
import { dynamicState, setCurrentWinId } from '_renderer/store/dynamic'
import { useAppSelector } from '_renderer/store/hooks'

const Dynamic: React.FC = () => {
    const [currentType, setCurrentType] = useState<string>('updateTime')
    const currentPage = useRef(1)
    const [dynamicPaperListByTime, setTimeDynamicPaperList] = useState<DynamicPaperItem[]>([])
    const [dynamicPaperListByUse, setUseDynamicPaperList] = useState<DynamicPaperItem[]>([])
    const { currentWinId } = useAppSelector(dynamicState)

    const setDynamicPaperList = (dynamicList: DynamicPaperItem[]) => {
        currentType === 'updateTime'
                ? setTimeDynamicPaperList([...dynamicPaperListByTime, ...dynamicList])
                : setUseDynamicPaperList([...dynamicPaperListByUse, ...dynamicList])
    }

    const items: TabsProps['items'] = [
        {
            key: 'updateTime',
            label: '最新',
            children: <DynamicList currentType={currentType} dynamicPaperList={dynamicPaperListByTime} setDynamicPaperList={setDynamicPaperList} />,
        },
        {
            key: 'useTotal',
            label: '最热',
            children: <DynamicList currentType={currentType} dynamicPaperList={dynamicPaperListByUse} setDynamicPaperList={setDynamicPaperList} />,
        }
    ]

    const closeDynamicWin = () => {
        if(currentWinId) {
            window.ipcAPI?.closeWin(currentWinId as number)
            setCurrentWinId()
        }else {
            message.warning('没有已打开的动态窗口')
        }
    }

    const TabBarExtraContent = (<Button size='small' onClick={closeDynamicWin}>关闭动态壁纸窗口</Button>)

    useEffect(() => {
        getDynamicListBySort({page: 1, size: 30, sortKey: currentType}).then(res => {
            const {data} = res
            currentType === 'updateTime'
                ? setTimeDynamicPaperList(data)
                : setUseDynamicPaperList(data)
        })
    }, [])

    const onChangeType = (type: string) => {
        setCurrentType(type)
        if(type === 'updateTime' && dynamicPaperListByTime.length !== 0) return;
        if(type === 'useTotal' && dynamicPaperListByUse.length !== 0) return;
        getDynamicListBySort({page: 1, size: 24, sortKey: type}).then(res => {
            const {data} = res
            console.log(type, data)
            currentPage.current = 1
            type === 'updateTime'
                ? setTimeDynamicPaperList([...dynamicPaperListByTime, ...data])
                : setUseDynamicPaperList([...dynamicPaperListByUse, ...data])
        })
    }

    return (
        <div className={styled.dynamicContainer}>
            <Tabs tabBarExtraContent={TabBarExtraContent} defaultActiveKey='updateTime' items={items} onChange={onChangeType} style={{ height: '100%' }}></Tabs> 
        </div>
    )
}

export default Dynamic