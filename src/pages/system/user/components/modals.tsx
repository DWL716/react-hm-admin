import React, { memo } from 'react'
import { Modal, Input, Select } from 'antd'

import './index.less'

const { Option } = Select;

interface IProps {
  modelVisible: boolean,
  userName: string,
  userPhone: string,
  userSex: string,
  userPassword: string,
  modelOk: () => void,
  modelCancel: () => void,
  onInputCall: (type: string, e: any) => void,
}

const ModalComp: React.FC<IProps> = (props) => {



  // const onSelectCall = useCallback((value) => {
  //   console.log(value);
    
  // }, [])
  return <>
    <Modal
      visible={props.modelVisible}
      onCancel={props.modelCancel}
      onOk={props.modelOk}
    >
      <div className='user-modal1'>
        <em>用户名：</em>
        <Input value={props.userName} placeholder='请输入用户名' onChange={props.onInputCall.bind(this, 'userName')}></Input>
      </div>
      <div className='user-modal1'>
        <em>手机号：</em>
        <Input value={props.userPhone} placeholder='请输入手机号' type='tel' onChange={props.onInputCall.bind(this, 'userPhone')}></Input>
      </div>
      <div className='user-modal1'>
        <em>性别：</em>
        <Select value={Boolean(props.userSex) ? props.userSex : "请选择"} style={{ width: 120 }} onChange={props.onInputCall.bind(this, 'sex')}>
          <Option value="0">男</Option>
          <Option value="1">女</Option>
        </Select>
      </div>
      <div className='user-modal1'>
        <em>密码：</em>
        <Input value={props.userPassword} placeholder='请输入密码' onChange={props.onInputCall.bind(this, 'userPassword')}></Input>
      </div>
    </Modal>
  </>
}

export default memo(ModalComp)