import React, { useEffect, useState, useRef } from 'react'
import styled from './index.module.scss'
import { Image, Button, Space, message } from 'antd'
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
import type { BingPaper } from '_renderer/request/bing'
import { getBingPaperList, download4kBingPaper } from '_renderer/request/bing'
import { isScrollBottom } from '_renderer/utils'

const Bing: React.FC = () => {

    const [todayPaper, setTodayPaper] = useState<BingPaper>()
    const [bingPaperList, setBingPaperList] = useState<BingPaper[]>([])
    const currentPage = useRef(1)
    const paperContainer = useRef<HTMLDivElement>(null)
    useEffect(() => {
        getBingPaperList({page: 1, size: 30}).then(res => {
            setBingPaperList(res.data)
            setTodayPaper(res.data[0])
            handleScroll()
        })
    }, [])

    const handleJumpToBing = () => {
        window.open('https://cn.bing.com/', '_blank')
    }
    const handleView4K = (url: string, title?: string) => {
        if(!url) {
            message.warning('图像资源未加载，无法下载！')
            return
        }
        download4kBingPaper(url).then(res => {
            const blob = new Blob([res]); //处理文档流
            const elink = document.createElement('a');
            elink.style.display = 'none';
            elink.download = title? title + '.jpg': todayPaper?.enddate + '.jpg'
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);
            document.body.removeChild(elink);
        })
    }
    const onDownload = (url: string, title?: string) => {
        const [name, raw] = url.split('--')
        handleView4K(raw, name)
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
            getBingPaperList({page: currentPage.current + 1, size: 24}).then(res => {
                const {data} = res
                currentPage.current += 1
                console.log(bingPaperList)
                setBingPaperList(preList => [...preList, ...data])
                // setBingPaperList([...bingPaperList, ...data])
            })
            // 在这里执行触底时的操作
        }
    }

    return (
        <div className={ styled.bingContainer }>
            <div className={styled.bingToday}>
                <div className={styled.todayPic}>
                    <Image height={120} width={200} 
                        src={`${todayPaper? todayPaper.thumb: ''}`}
                        alt={todayPaper? todayPaper.enddate + '--' + todayPaper.raw: ''}
                        preview={{
                            destroyOnClose: true,
                            src: todayPaper? todayPaper.raw: '',
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
                <div className={styled.todayInfo}>
                    <p className={styled.infoItem} style={{ marginBottom: '16px' }}>{ todayPaper?.copyright }</p>
                    <p className={styled.infoItem}>选中此图像每天会自动更新壁纸</p>
                    <p className={styled.infoItem}>
                        图像来源：
                        <Button onClick={handleJumpToBing} type="link">必应</Button>
                        <Button onClick={() => { handleView4K(todayPaper? todayPaper.fullSrc: '') }} type="link">点此下载4K高清壁纸</Button>
                    </p>
                </div>
            </div>
            <div className={styled.bingList} ref={paperContainer} onScroll={handleScroll}>
                {
                    bingPaperList.map((bp, i) => (
                        <div key={bp._id + i} className={styled.bingItem}>
                            <Image width={'100%'} height={120} alt={bp.enddate + '--' + bp.raw}
                                src={bp.thumb}
                                preview={{
                                    destroyOnClose: true,
                                    src: bp.raw,
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

export default Bing