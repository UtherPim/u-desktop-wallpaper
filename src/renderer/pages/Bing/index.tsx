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
import { bingState } from '_renderer/store/bing'
import { useAppSelector, useAppDispatch } from '_renderer/store/hooks'

const Bing: React.FC = () => {

    const [todayPaper, setTodayPaper] = useState<BingPaper>()
    const [bingPaperList, setBingPaperList] = useState<BingPaper[]>([])
    const [bingPaperTotal, setBingPaperTotal] = useState(0)
    const stateValue = useAppSelector(bingState)
    const ref = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        getBingPaperList().then(res => {
            setBingPaperList(res.data.slice(1, 101))
            setBingPaperTotal(res.Total)
            setTodayPaper(res.data[0])
        })
    }, [])

    const handleJumpToBing = () => {
        window.open('https://cn.bing.com/', '_blank')
    }
    const handleView4K = (url: string, title?: string) => {
        download4kBingPaper(url).then(res => {
            const blob = new Blob([res]); //处理文档流
            const elink = document.createElement('a');
            elink.style.display = 'none';
            elink.download = title? title + '.jpg': todayPaper?.title + '.jpg'
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);
            document.body.removeChild(elink);
        })
    }
    const onDownload = (url: string, title?: string) => {
        const urlbase = url.split('_1920x1080')[0]
        handleView4K(urlbase, title)
    }
    const onSet2WallPaper = (url: string) => {
        const urlbase = url.split('_1920x1080')[0]
        const picName = urlbase.split('?')[1].split('=')[1] + '.jpg'
        window.ipcAPI?.setWallpaper(urlbase + '_UHD.jpg', { filename: picName, from: 'bing' }).then(() => {
            message.success('设置成功')
        })
    }

    return (
        <div className={ styled.bingContainer }>
            <div className={styled.bingToday}>
                <div className={styled.todayPic}>
                    <Image height={120} width={200} src={`${stateValue.baseUrl + (todayPaper? todayPaper.url: '')}`} />
                </div>
                <div className={styled.todayInfo}>
                    <p className={styled.infoItem} style={{ marginBottom: '16px' }}>{ todayPaper?.copyright }</p>
                    <p className={styled.infoItem}>选中此图像每天会自动更新壁纸</p>
                    <p className={styled.infoItem}>
                        图像来源：
                        <Button onClick={handleJumpToBing} type="link">必应</Button>
                        <Button onClick={() => { handleView4K(`${stateValue.baseUrl + (todayPaper? todayPaper.urlbase: '')}`) }} type="link">点此下载4K高清壁纸</Button>
                    </p>
                </div>
            </div>
            <div className={styled.bingList}>
                {
                    bingPaperList.map(bp => (
                        <div key={bp.url} className={styled.bingItem}>
                            <Image width={200} height={120} alt={bp.title}
                                src={`${stateValue.baseUrl + bp.url}`}
                                preview={{
                                    toolbarRender: (
                                      _,
                                      {
                                        image: {url, alt},
                                        transform: { scale },
                                        actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn, onReset },
                                      },
                                    ) => (
                                      <Space size={12} className="toolbar-wrapper">
                                        <PictureOutlined onClick={() => onSet2WallPaper(url)} />
                                        <DownloadOutlined onClick={() => onDownload(url, alt)} />
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