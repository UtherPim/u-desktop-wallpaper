import React, { useRef, useState } from 'react'
import { Image, Space, message } from 'antd'
import { 
    PictureOutlined,
    DownloadOutlined
} from '@ant-design/icons'
import type { DynamicPaperItem } from '_renderer/request/dynamic'
import { getDynamicListBySort } from '_renderer/request/dynamic'
import styled from './index.module.scss'
import { isScrollBottom } from '_renderer/utils'

import { setCurrentWinId } from '_renderer/store/dynamic'

type DynamicListProps = {
    dynamicPaperList: DynamicPaperItem[],
    setDynamicPaperList: (dynamicPaperList: DynamicPaperItem[]) => void,
    currentType: string
}

const DynamicList: React.FC<DynamicListProps> = (props) => {
    console.log(props)
    const { dynamicPaperList, setDynamicPaperList } = props

    const paperContainer = useRef<HTMLDivElement>(null)
    const currentPage = useRef(1)

    const onDownload = (url: string, title?: string) => {
        const [name, raw] = url.split('--')
        const endWith = raw.split('.').pop()
        window.ipcAPI?.hasFile({ filename: title ? title: `${name}.${endWith}` , from: 'dynamic' }).then((b: boolean | string) => {
            if(!b) {
                window.ipcAPI?.saveFile(raw, { filename: title ? title: `${name}.${endWith}` , from: 'dynamic' }).then(() => {
                    message.success('保存成功')
                })
            }else {
                message.warning('已存在')
            }
        })
    }
    const onSet2WallPaper = async (url: string, title?: string) => {
        const [name, raw] = url.split('--')
        const endWith = raw.split('.').pop()
        const filePath = await window.ipcAPI?.hasFile({ filename: title ? title: `${name}.${endWith}` , from: 'dynamic' })
        if(filePath) {
            window.ipcAPI?.setVideo2Wallpaper(filePath as string)
        }else {
            window.ipcAPI?.saveFile(raw, { filename: title ? title: `${name}.${endWith}` , from: 'dynamic' }).then(async ({ filePath }) => {
                console.log(filePath)
                const winId = await window.ipcAPI?.setVideo2Wallpaper(filePath)
                console.log(winId)
                setCurrentWinId(winId)
            })
        }
    }

    const handleScroll = () => {
        if (isScrollBottom(paperContainer.current)) {
            console.log("滚动条已经触底");
            getDynamicListBySort({page: currentPage.current + 1, size: 24, sortKey: props.currentType}).then(res => {
                const {data} = res
                currentPage.current += 1
                setDynamicPaperList(data)
            })
            // 在这里执行触底时的操作
        }
    }

    return (<div className={styled.paperContainer} ref={paperContainer} onScroll={handleScroll}>
        {
            dynamicPaperList.map((dp: DynamicPaperItem, i: number) => (
                <div key={dp._id + i} className={styled.paperItem}>
                    <Image width={200} height={120} alt={dp._id + '--' + dp.url}
                        src={dp.thumb}
                        preview={{
                            destroyOnClose: true,
                            imageRender: () => (
                                <video
                                  muted
                                  width="100%"
                                  loop
                                  autoPlay
                                  src={dp.url}
                                />
                            ),
                            toolbarRender: (
                              _,
                              {
                                image: {url, alt}
                              },
                            ) => (
                              <Space size={12} className="toolbar-wrapper">
                                <PictureOutlined onClick={() => onSet2WallPaper(alt)} />
                                <DownloadOutlined onClick={() => onDownload(alt)} />
                              </Space>
                            ),
                          }}
                    /> 
                </div>
            ))
        }
</div>)
}


export default DynamicList