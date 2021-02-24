import React, { useCallback, useState } from 'react'
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'


import './index.less'
import { exitFull, requestFullScreen } from '../../utils/browser'

const Fullscreen: React.FC<any> = (props) => {
  const [isFull, seIsFull] = useState(false)
  const fullCallback = useCallback(() => {
    console.log('缩放');
    seIsFull(!isFull)
    if(isFull) {
      requestFullScreen()
    }else {
      exitFull()
    }
  }, [isFull])
  return <div className='top-menu-fullscreen' onClick={fullCallback}>
    {isFull ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
  </div>
}

export default Fullscreen

