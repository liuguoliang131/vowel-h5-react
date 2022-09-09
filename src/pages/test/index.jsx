import React, { useState } from 'react'
import { PullToRefresh, List } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'
// import { lorem } from 'demos'

function getNextData () {
  const ret = []
  for (let i = 0; i < 18; i++) {
    ret.unshift(i + i)
    // ret.unshift(lorem.generateWords(1))
  }
  return ret
}

function Test () {
  const [data, setData] = useState(() => getNextData())
  return (
    <PullToRefresh
      style={{ overflow: 'auto', height: '100vh' }}
      onRefresh={async () => {
        await sleep(1000)
        setData([...getNextData(), ...data])
      }}
    >
      <List style={{ minHeight: '100vh' }}>
        {data.map((item, index) => (
          <List.Item key={index}>{item}</List.Item>
        ))}
      </List>
    </PullToRefresh>
  )
}
export default Test
