import React, { useState, useEffect, useRef } from 'react'
import styled from './index.module.scss'
import { useAppSelector } from '_renderer/store/hooks'
import { wallhavenState } from '_renderer/store/wallhaven'
import { getWallHavenListByTypeId, downloadUHDSource } from '_renderer/request/wallpaper'
import type { WallHavenPaperItem } from '_renderer/request/wallpaper'
import { Space, Image, message } from 'antd'
import { 
    PictureOutlined,
    DownloadOutlined, 
    SwapOutlined, 
    RotateLeftOutlined, 
    RotateRightOutlined, 
    ZoomOutOutlined,
    ZoomInOutlined,
    UndoOutlined 
} from '@ant-design/icons'
// import { isScrollBottom } from '_utils'
const isScrollBottom = (dom?: HTMLElement | null):boolean => {
    if(!dom) return false;
    const scrollTop = dom.scrollTop; // 获取当前滚动条的位置
    const viewportHeight = dom.clientHeight
    const documentHeight = dom.scrollHeight; // dom的总高度
 
    return scrollTop + viewportHeight >= documentHeight; // 当滚动位置加上视口高度大于等于文档高度时，表明到达底部
}

const Wallhaven: React.FC = () => {
    const { typeList } = useAppSelector(wallhavenState)
    const [currentType, setCurrentType] = useState('')
    const currentPage = useRef(1)
    const [wallHavenPaperList, setWallHavenPaperList] = useState<WallHavenPaperItem[]>([])
    const paperContainer = useRef<HTMLDivElement>(null)

    useEffect(() => {
        getWallHavenListByTypeId({page: 1, size: 30, q: currentType}).then(res => {
            const {data} = res
            setWallHavenPaperList(data)
        })
    }, [])

    const changeHavenType = (id: string) => {
        getWallHavenListByTypeId({page: 1, size: 24, q: id}).then(res => {
            const {data} = res
            currentPage.current = 1
            setCurrentType(id)
            setWallHavenPaperList(data)
        })
    }
    const onDownload = (url: string, title?: string) => {
        const [name, raw] = url.split('--')
        console.log(url, raw, name)
        downloadUHDSource(raw).then(res => {
            const blob = new Blob([res]); //处理文档流
            const elink = document.createElement('a');
            elink.style.display = 'none';
            elink.download = title? title: name + '.jpg'
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);
            document.body.removeChild(elink);
        })
        
    }
    const onSet2WallPaper = (url: string, title?: string) => {
        const [name, raw] = url.split('--')
        window.ipcAPI?.setWallpaper(raw, { filename: title ? title: name + '.jpg', from: 'wallhaven' }).then(() => {
            message.success('设置成功')
        })
    }

    const handleScroll = () => {
        if (isScrollBottom(paperContainer.current)) {
            console.log("滚动条已经触底");
            getWallHavenListByTypeId({page: currentPage.current + 1, size: 24, q: currentType}).then(res => {
                const {data} = res
                currentPage.current += 1
                console.log(wallHavenPaperList, data)
                setWallHavenPaperList([...wallHavenPaperList, ...data])
            })
            // 在这里执行触底时的操作
        }
    }
    return (
        <div className={styled.wallhavenContainer}>
            <div className={styled.leftMenu}>
                {
                    typeList.map(wt => (
                        <div onClick={() => { changeHavenType(wt.id) }} key={wt.id} className={`${styled.menuItem} ${currentType === wt.id? styled.active: ''}`}>{wt.label}</div>
                    ))
                }
                
            </div>
            <div className={styled.rightPaperContainer} ref={paperContainer} onScroll={handleScroll}>
                {
                    wallHavenPaperList.map((wp, i) => (
                        <div key={wp.id + i} className={styled.paperItem}>
                            <Image width={200} height={120} alt={wp.name + '--' + wp.raw}
                                src={wp.thumb}
                                preview={{
                                    destroyOnClose: true,
                                    src: wp.raw,
                                    toolbarRender: (
                                      _,
                                      {
                                        image: {url, alt},
                                        transform: { scale },
                                        actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn, onReset },
                                      },
                                    ) => (
                                      <Space size={12} className="toolbar-wrapper">
                                        <PictureOutlined onClick={() => onSet2WallPaper(alt)} />
                                        <DownloadOutlined onClick={() => onDownload(alt)} />
                                        <SwapOutlined rotate={90} onClick={onFlipY} />
                                        <SwapOutlined onClick={onFlipX} />
                                        <RotateLeftOutlined onClick={onRotateLeft} />
                                        <RotateRightOutlined onClick={onRotateRight} />
                                        <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                                        <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                                        <UndoOutlined onClick={onReset} />
                                      </Space>
                                    ),
                                  }}
                            /> 
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Wallhaven