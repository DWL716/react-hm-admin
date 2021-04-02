import React, { memo, useCallback, useState } from 'react'
import { Button, message, DatePicker, Space } from 'antd'
import MD5 from 'crypto-js/md5';

import ModalComp from './components/modals'
import { userAdd } from '../../../http/system/user';

interface IProps { }

const User: React.FC<IProps> = (props) => {
  const [modelVisible, setModelVisible] = useState(false);
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [userSex, setUserSex] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const onInputCall = useCallback((type, e) => {
    switch (type) {
      case 'userName':
        return setUserName(e.target.value.trim());
      case 'userPhone':
        return setUserPhone(e.target.value.trim())
      case 'sex':
        return setUserSex(e)
      case 'userPassword':
        return setUserPassword(e.target.value.trim())
      default:
        break;
    }

  }, [])
  const modelOk = useCallback(() => {
    if (!Boolean(userName)) {
      return message.error('用户名不能为空')
    }
    console.log(userPhone);

    if (!Boolean(userPhone)) {
      return message.error('手机号不能为空')
    }
    if (!Boolean(userSex)) {
      return message.error('请选择性别')
    }
    if (!Boolean(userPassword)) {
      return message.error('密码不能为空')
    }

    const { REACT_APP_MD5_SUFFIX } = process.env;
    // 加密密码
    const newPassword = MD5(`${userPassword}${REACT_APP_MD5_SUFFIX}`).toString();
    
    userAdd(userName, userPhone, userSex, newPassword).then((res: any) => {
      console.log(res);
      if (res.code === 0) {
        setModelVisible(false)
        setUserName('')
        setUserPhone('')
        setUserSex('')
        setUserPassword('')
      }
    })

  }, [userName, userPassword, userPhone, userSex]);
  const modelCancel = useCallback(() => {
    setModelVisible(false)
  }, [])
  const onBtnCallback = useCallback(() => {
    setModelVisible(true)
  }, [])
  function onChange(date:any, dateString: any) {
    console.log(date, dateString);
  }

  return (<div>
    <ModalComp modelVisible={modelVisible}
      modelOk={modelOk}
      modelCancel={modelCancel}
      userName={userName}
      userPhone={userPhone}
      userSex={userSex}
      userPassword={userPassword}
      onInputCall={onInputCall}
    />
    <Button type="primary" onClick={onBtnCallback}>新增</Button>
    <Space direction="vertical">
    <DatePicker onChange={onChange} />
    <DatePicker onChange={onChange} picker="week" />
    <DatePicker onChange={onChange} picker="month" />
    <DatePicker onChange={onChange} picker="quarter" />
    <DatePicker onChange={onChange} picker="year" />
  </Space>,
  </div>)
}

export default memo(User)