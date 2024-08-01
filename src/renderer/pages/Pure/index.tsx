import React from 'react'
import styled from './index.module.scss'
import { CheckCircleOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import { useAppSelector, useAppDispatch } from '_/renderer/store/hooks'
import { stateValue, setColorPaper, setDefaultColor } from '_/renderer/store/app'

const PureColor: React.FC = () => {

    const customColorList: string[] = [
        'rgb(59, 120, 220)', 'rgb(0, 175, 199)', 'rgb(59, 75, 168)',
        'rgb(141, 36, 160)', 'rgb(0, 139, 125)', 'rgb(15, 146, 81)',
        'rgb(187, 201, 52)', 'rgb(226, 166, 0)', 'rgb(200, 62, 50)',
    ]
    const defaultColorList: string[] = [
        'rgb(252, 150, 211)', 'rgb(139, 86, 233)', 'rgb(37, 155, 229)', 'rgb(123, 204, 155)'
    ]

    const { paperType, colorPaper, selectedDefaultColor, selectedGradientColor } = useAppSelector(stateValue)
    const dispatch = useAppDispatch()
    const handleChangeColor = (cc:string) => {
        dispatch(setColorPaper(cc))
    }
    const handleChangeDefaultColor = (dc: string) => {
        dispatch(setDefaultColor(dc))
    }

    return (
        <div className={styled.pureContaier}>
            <div className={styled.customColors}>
                <p style={{ marginRight: '20px' }}>自定义颜色</p>
                <Space>
                    {
                        customColorList.map(cc => (
                            <div key={cc}
                                className={styled.customItem}
                                style={{ backgroundColor: cc }} 
                                onClick={() => { handleChangeColor(cc) }}
                            >
                                { paperType && colorPaper === cc? <CheckCircleOutlined style={{ color: '#fff' }} />: null }
                            </div>
                        ))
                    }
                </Space>
            </div>
            <div className={styled.defaultColors}>
                {
                    defaultColorList.map(dc => (
                        <div onClick={() => {handleChangeDefaultColor(dc)}} key={dc} className={`${styled.defaultItem} ${dc === selectedDefaultColor? styled.active: ''}`}>
                            <span style={{ backgroundColor: dc }} />
                        </div>
                    ))
                }
            </div>
            <div className={styled.colorPapers}>
                { 
                    Array.from({ length: 20 }).map((_, index) => (
                        <div key={index} className={styled.paperItem} style={{ background: `linear-gradient(0deg, ${selectedDefaultColor} ${index}%, ${selectedDefaultColor} ${(index+1)*5}%)` }}></div>
                    ))
                }
            </div>
        </div>
    )
}

export default PureColor