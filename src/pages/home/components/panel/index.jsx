import Item from 'antd/lib/list/Item'
import React, { useState, useEffect, useRef } from 'react'
import './index.scss'
function Panel () {
  const viewRef = useRef()
  const [data, setData] = useState([
    { title: '133xxxx1234 获得苹果手机x1' },
    { title: '122xxxx1234 获得苹果x1' },
    { title: '188xxxx1234 获得梨子x1' },
    { title: '165xxxx1234 获得弹夹x1' },
    { title: '133xxxx1234 获得苹果手机x1' }
  ])
  // 轮播动画
  const startScroll = () => {
    console.log('viewRef', viewRef)
    const theScroll = viewRef.current.children[0]
    const clientHeight = viewRef.current.clientHeight
    const scrollHeight = viewRef.current.scrollHeight
    const scrollTop = viewRef.current.scrollTop
    console.log('视口高度clientHeight', viewRef.current.clientHeight, '滚动块高度scrollHeight:', viewRef.current.scrollHeight, 'scrollTop:', viewRef.current.scrollTop, '底边距离：', scrollHeight - clientHeight - scrollTop)

    setInterval(() => {
      console.log('父盒子上距离', viewRef.current)
      console.log('1', theScroll.offsetTop)
      if (-1 * theScroll.offsetTop < theScroll.offsetHeight - clientHeight) {
        console.log('1', theScroll.offsetTop)
        theScroll.style.transition = 'all 0.5s'
        theScroll.style.top = (theScroll.offsetTop - clientHeight) + 'px'
      } else {
        console.log('2')
        theScroll.style.transition = 'none'
        theScroll.style.top = '0px'
        // theScroll.style.transition = 'all 0.5s'
        // theScroll.style.top = -clientHeight + 'px'
      }
    }, 5000)
  }
  useEffect(() => {
    startScroll()
  }, [data, viewRef])
  return (
    <div className="panel">
      <div className="panel-content" ref={viewRef}>
        <div className="panel-scroll">
        {data.map((item, index) => (
          <div className="panel-item" key={index}>
            {item.title}
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Panel
