import React, { useCallback, useEffect, useState } from 'react'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'


import './index.less'
// import { exitFull } from '../../utils/browser'
import {isFull, toggleFull } from '../../utils/browser'
import useKeyPress from '../../hooks/useKeyPress'

const Fullscreen: React.FC<any> = (props) => {
  const [isFulls, seIsFulls] = useState(false)
  const fullCallback = useCallback(() => {
    toggleFull()
    if(isFulls) {
      seIsFulls(isFull(document.documentElement))
      
    }else {
      seIsFulls(true)
    }
  }, [isFulls])
  let a = useKeyPress(27)
  useEffect(() => {
    window.onresize = function() {
      if (isFulls) {
        
        seIsFulls(isFull(document.documentElement))
      }
    }
    // seIsFulls(isFull(document.documentElement))
  }, [a, isFulls])
  
  return <div className='top-menu-fullscreen' onClick={fullCallback}>
    {isFulls? <FullscreenExitOutlined />: <FullscreenOutlined /> }
  </div>
}

export default Fullscreen

