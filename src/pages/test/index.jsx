import React, { useState } from 'react'

import { Vertify } from '@alex_xu/react-slider-vertify'

function Test () {
  const [visible, setVisible] = useState(false)
  const show = () => {
    setVisible(true)
  }
  const hide = () => {
    setVisible(false)
  }
  const style = {
    display: 'inline-block',
    marginRight: '20px',
    marginBottom: '20px',
    width: '100px',
    padding: '5px 20px',
    color: '#fff',
    textAlign: 'center',
    cursor: 'pointer',
    background: '#1991FA'
  }
  return (
    <>
      <div onClick={show} style={style}>
        显示
      </div>
      <div onClick={hide} style={style}>
        隐藏
      </div>
      <Vertify
        width={320}
        height={160}
        imgUrl={require('../../assets/分享-分享图.png')}
        visible={visible}
        onSuccess={() => alert('success')}
        onFail={() => alert('fail')}
        onRefresh={() => alert('refresh')}
      />
    </>
  )
}
export default Test
