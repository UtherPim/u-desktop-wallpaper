import React, { useEffect } from 'react'
import { 
    CloseSquareOutlined, 
    SwitcherOutlined, 
    ExpandOutlined, 
    MinusSquareOutlined
} from '@ant-design/icons'
import { Space } from 'antd'
import styled from './index.module.scss'
import { setWindowStatus, stateValue } from '_renderer/store/app'
import { useAppDispatch, useAppSelector } from '_renderer/store/hooks'

const TopFrame: React.FC = () => {

  const { windowStatus } = useAppSelector(stateValue)
  const dispatch = useAppDispatch()

  const handleMin = () => {
    console.log('min')
    dispatch(setWindowStatus('min'))
  }
  const handleClose = () => {
    console.log('close')
  }
  const handleRestore = () => {
    console.log('restore')
    dispatch(setWindowStatus('default'))
  }
  const handleMax = () => {
    console.log('max')
    dispatch(setWindowStatus('max'))
  }

  return (
    <div className={styled.topOperation}>
      <div className="emptyElement" />
      <Space>
        <MinusSquareOutlined className='z-pointer' onClick={handleMin} />
        { windowStatus === 'max' || windowStatus === 'resize'? 
          <SwitcherOutlined className='z-pointer' onClick={handleRestore} /> : 
          <ExpandOutlined className='z-pointer' onClick={handleMax} /> 
        }
        <CloseSquareOutlined className='z-pointer' onClick={handleClose} />
      </Space>
    </div>
  )
}

export default TopFrame;