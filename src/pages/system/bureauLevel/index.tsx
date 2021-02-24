import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Tree, Modal, Input, Button, message } from 'antd';

import { getUserSelectPromise, setUserSelectPromise } from '../../../store/reducers/system/bureauLevel/action'

interface IProps { }

const BureauLevel: React.FC<IProps> = (props) => {
  const dispatch = useDispatch();
  const [modelVisible, setModelVisible] = useState(false);
  const [treeVisible, setTreeVisible] = useState(false);
  const [modelTitle, setModelTitle] = useState('');
  const [key, setKey] = useState()
  const [nameKey, setNameKey] = useState()
  const [valInput, setValInput] = useState('')

  const { userSelect } = useSelector((state: any) => state.systemUser);
  const list_cyc = useCallback((value: any) => {
    if (value.children) {
      return {
        title: value.name,
        key: value.branchId,
        children: value.children.map((item: any) => {
          return list_cyc(item)
        })
      }
    } else {
      return {
        title: value.name,
        key: value.branchId
      }
    }
  }, []);
  const modelHandleOk = useCallback(() => {
    if (!key) {
      return
    }
    if(!valInput.trim()) {
      return message.error('请输入名称')
    }
    dispatch(setUserSelectPromise(key, valInput.trim()))
    setValInput('')
    setModelVisible(false);
  }, [dispatch, key, valInput]);
  const modelHandleCancel = useCallback(() => {
    setModelVisible(false);
  }, []);
  // 节点选中事件
  const treeSelect = useCallback((key, info) => {
    // console.log(key, info);
    setModelTitle(info.node.title)
    setKey(key[0])
    setNameKey(info.node.title)
    setTreeVisible(true);
  }, []);
  // input 事件操作
  const onInputEvnt = useCallback((e) => {
    setValInput(e.target.value)
  }, [])

  // 树的操作
  const treeHandleOk = useCallback(() => {
    setTreeVisible(false)
  }, []);
  const treeHandleCancel = useCallback(() => {
    setTreeVisible(false)
  }, []);
  // button 回调函数 增加
  const searchName = useCallback((title = '子菜单', num = 1) => {
    setModelVisible(true);
    setTreeVisible(false);
  }, []);
  // 修改
  const treePutHandle = useCallback((num = 2) => {
    setModelVisible(true);
    setTreeVisible(false);
  }, []);
  // 删除
  const treeHandleDelete = useCallback(() => {

  }, []);

  // let dg = userSelect.map((item: any) => (list_cyc(item)))
  // console.log(dg, 'dg s');

  useEffect(() => {
    console.log('请求tree');
    dispatch(getUserSelectPromise());
  }, [dispatch])

  return (
    <div>
      <Modal title={modelTitle}
        visible={modelVisible}
        onOk={modelHandleOk}
        onCancel={modelHandleCancel}
      >
        <em>归属区：</em>
        <p>{nameKey}</p>
        <em>名称：</em>
        <Input placeholder='请输入' onChange={onInputEvnt} value={valInput}></Input>
      </Modal>
      <Modal title='局站操作'
        visible={treeVisible}
        onOk={treeHandleOk}
        onCancel={treeHandleCancel}>
          <Button type='primary' onClick={searchName}>增加菜单</Button>&nbsp;
          <Button type='primary' onClick={treePutHandle}>修改菜单</Button>&nbsp;
          <Button type='primary' danger onClick={treeHandleDelete}>删除菜单</Button>&nbsp;
      </Modal>
      <Tree treeData={userSelect.map((item: any) => (list_cyc(item)))}
        onSelect={treeSelect} />
    </div>
  )

};

export default memo(BureauLevel);

/*
[
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
            {
              title: 'leaf',
              key: '0-0-0-2',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [
            {
              title: 'leaf',
              key: '0-0-1-0',
            },
          ],
        },
        {
          title: 'parent 1-2',
          key: '0-0-2',
          children: [
            {
              title: 'leaf',
              key: '0-0-2-0',
            },
            {
              title: 'leaf',
              key: '0-0-2-1',
            },
          ],
        },
      ],
    },
  ]
*/