import React, { useRef, useState, useEffect } from 'react'
import './index.scss'
import { Toast } from 'antd-mobile'
import Crumbs1 from '../../components/crumbs1'
import utils from '../../utils/index'
import QRCode from 'qrcodejs2'
import { promotionSharePosterListApi } from '../../axios/api'
import { useLocation } from 'react-router-dom'

function Poster () {
  const [data, setData] = useState({
    user_name: '',
    user_avatar: '',
    poster_url: ''
  })
  const fullRef = useRef()
  const viewRef = useRef()
  const location = useLocation()
  // 生成二维码函数
  const getQrcode = (qWidth, qHeight, qText, qRender, dom) => {
    return new QRCode(dom, {
      width: qWidth,
      height: qHeight,
      text: qText,
      render: qRender,
      correctLevel: 1
    })
  }
  const getData = async () => {
    const res = await promotionSharePosterListApi({
      promotion_id: location.state.id || 1
    })
    if (res.code !== 0) {
      return false
    }
    setData(res.data)
  }
  const initCanvas = () => {
    console.log('viewRef', viewRef)
    if (fullRef.current && viewRef.current) {
      // 获取父盒子宽度
      const full = fullRef.current
      const canvas = viewRef.current
      canvas.width = full.offsetWidth
      canvas.height = full.offsetHeight
      // 参照比例
      const scaleWidth = 375
      const scaleHeight = 517
      const ava = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }// 头像
      ava.x = full.offsetWidth * 14 / scaleWidth
      ava.y = full.offsetHeight * 17 / scaleHeight
      ava.width = full.offsetWidth * 30 / scaleWidth
      ava.height = full.offsetWidth * 30 / scaleWidth
      // 文本
      const title = {
        x: full.offsetWidth * 50 / scaleWidth,
        y: full.offsetHeight * 37 / scaleHeight,
        fontSize: full.offsetHeight * 15 / scaleHeight
      }
      // 二维码
      const qr = {
        x: full.offsetWidth * 147 / scaleWidth,
        y: full.offsetHeight * 405 / scaleHeight,
        width: full.offsetWidth * 82 / scaleWidth,
        height: full.offsetWidth * 82 / scaleWidth
      }
      const ctx = canvas.getContext('2d')
      // 创建图片 背景图
      let image = null
      image = new Image()
      image.crossOrigin = 'anonymous'
      image.setAttribute('crossOrigin', 'anonymous')

      // 二维码图片
      const codeImg = new Image()
      codeImg.setAttribute('crossOrigin', 'anonymous')
      codeImg.crossOrigin = 'anonymous'
      // 生成二维码
      const qrCanvas = document.createElement('div')
      qrCanvas.height = qr.height
      qrCanvas.width = qr.width
      const shareUrl = window.location.protocol + '//' + window.location.host + `/#/layout/home?id=${location.state.id}&share_sign=${data.share_sign}`
      const qrcodeObj = getQrcode(qr.width, qr.height, shareUrl, 'canvas', qrCanvas)
      console.log('qrcodeObj src', qrcodeObj._el.children[1])
      codeImg.onload = function () {
        console.log('codeImg.src1', codeImg.src)
        ctx.drawImage(codeImg, qr.x, qr.y, qr.width, qr.width)
      }
      codeImg.onerror = function (e) {
      }

      // 设置图片地址
      image.src = data.poster_url + '?v=' + Math.random()
      // 必须要在onLoad之后再进行绘制图片，否则不会渲染
      image.onload = function () {
        // 4各参数 图片的起始坐标和宽高
        ctx.drawImage(image, 0, 0, full.offsetWidth, full.offsetHeight)

        // 绘制文本
        ctx.font = `${title.fontSize}px PingFang SC` // 设置文案大小和字体
        // ctx.direction = 'ltr' // 文本方向从左向右
        ctx.textAlign = 'left' // 左对齐
        // ctx.fillStyle = '#ffff'
        console.log('title.x, title.y', title.x, title.y)
        ctx.fillText(data.user_name, title.x, title.y)

        // 赋值二维码图片 出发加载事件
        if (qrcodeObj._el.children[1].src.includes('data:')) {
          Toast.show({
            content: '1'
          })
          codeImg.src = qrcodeObj._el.children[1].src
        } else {
          Toast.show({
            content: '2'
          })
          // const before = 'data:image/jpeg;base64,'
          // codeImg.src = before + qrcodeObj._el.children[1].src
          codeImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABJCAYAAABxcwvcAAAAAXNSR0IArs4c6QAABAFJREFUeF7tnO12gzAMQ+H9H7o76wYtAXGlhH3W+1kgEMWWZBM2T9N0m8K/2217yTzP9xHa39Wwy/nLcTVee/1yXns/dX91Xjjd6X12t3Ry7cO2kyUQ2odU56dgKFCX33sXs0A6CasF1A1I7YqqCEnTQ62ku7JppFEaq0xQ8y2QDiKpBXEIJHeFicBTTiTiVeO5RF4gPamwSy9DkaRUinKe1DBVqdQC0PNdGkkvCRLlOvkWWlE1vjKJtAjkt1x1Js68xCfRJFXup5Mgy+ByTCoUd5AognrLgzTyvuv8dL4FkoHYbBduxmDEEZSW6fWUrpSe7pQKJAMpK93IV6Sc5fqklGDTms1tvRRI0zShYLxzUq90pn2jthtAK08Rl0YanS99XoH0IAsLJMpRt6ai83pVTEVeb4S66nhXN8zJzx42TZ7Sluw/pdePgeQ4bsplt8ZKF4NUNe2QUm0p+1AF0l7ddov+DBJ19Nx0oLQgDuntIKZvcVT67yK0QNpDtQNppHYjn+S2SFxC/2pfJXv2BdLeJ+1o5chMuqph57SwEK5Poe6BG7Guuu563AXSYw+DAvG0fUvv1VJzSRGhVI/uQ9dRJUGqXiCd7IZZguQQJIogd2XI7/RGFjlxFXnEXYojC6QD9Rkiblp5t6ecRmqqguToXV+2zjdRt5cGqUWeOIfUhpy42zWgiKCqniKQ5r0ef3bcrtkqkA62pigHTv6CrkvVjxx+usjUJ1stQBJJKjzd9OmdBEk30QO1UIjINy8n00mowVW1rsCk6t4VDLovgS3BSiIpvYkbzr8epLOmG/me0chLnTMJRm/ao4oWSA9oT5tu7qsg1ykT91BtlaomdQGUX6LfNz6pQPrYx6Zw2LycdNWq19+QSpEUk+8iB01CojKgQDqJjI2ZHFWpVMJH/YxrDiniKXMOOYmcKw1K6eAWvuTHvh2ko+/dKLLc8oQ4xlUXNQ6BRV0CCor1eIFk7HRzvpxM/ZGbVqlDVpFHzn30uPVFQIH09A0u1WrEMeSDUq6jWo3UizjHVdnDT7l6TddLgDRac9HK944/WpuRdaHnjt7gUmFKN/uzIF2x9cbNfQJZmVFSNYo06iogNxVIj6WTYDobS9MIGE0rut4VFlJTcuRrhBZI+/+x0vpCy0y6tVqvbyH/RTUecSJxEnFhgXSwP+k0kqiNSzlOtRiVN6RixCFUo/X6paF/nkBlTJp+/xqkq0wklTXEjdR9oExQxy+JpALpZJcJpRM5WZcjiIvUfeg6UsWNTyLCo8Hc611QSABUGUI9dpWutNhDFsBdKffh6DxKa/cFgrtYy3gF0gliG5BcZMn50krTfXrVh7iPIh6f64raTd3ELUQpzYgTvxqkN+KubjF5hYo3AAAAAElFTkSuQmCC'
          alert(codeImg.src)
        }

        // 层级之上
        const avaImg = new Image()
        avaImg.crossOrigin = 'anonymous'
        avaImg.setAttribute('crossOrigin', 'anonymous')
        avaImg.onload = function () {
          console.log('ava.x, ava.y, ava.width, ava.height', ava.x, ava.y, ava.width, ava.height)
          // 创建圆形裁剪路径
          ctx.arc(ava.x + (ava.width / 2), ava.y + (ava.height / 2), ava.width / 2, 0, Math.PI * 2)
          ctx.clip()
          // 创建完后绘制
          ctx.drawImage(avaImg, ava.x, ava.y, ava.width, ava.height)
        }
        avaImg.src = data.user_avatar + '?v=' + Math.random()
        console.log('avaImg src', avaImg.src)
      }
    }
  }

  // 保存海报到本地
  const handleSavePoster = () => {
    onSave()
    // try {
    //   const btn = document.createElement('a')
    //   btn.download = '分享海报'
    //   btn.href = viewRef.current.toDataURL('image/png;base64')
    //   btn.click()
    // } catch (error) {
    //   console.log(error)
    //   Toast.show({
    //     content: `${JSON.stringify(error)}`
    //   })
    // }
  }
  const onSave = () => {
    viewRef.current.toBlob((blob) => {
      const timestamp = Date.now().toString()
      const a = document.createElement('a')
      document.body.append(a)
      a.download = `${timestamp}.png`
      a.href = URL.createObjectURL(blob)
      a.click()
      a.remove()
    })
  }
  const handleShareWebToWX = () => {
    const title = location.state.title
    const desc = location.state.desc
    const url = window.location.origin + '/#/layout/home?share_sign=' + data.share_sign + '&id=' + location.state.id
    const coverurl = ''
    utils.shareWebToWX(title, desc, url, coverurl)
  }
  const bottomRender = () => {
    let bottomComponent = null
    utils.ownApp(() => {
      bottomComponent = (
      <div className="bottom-box-share">
        <div className="line">
          <div className="line-1"></div>
          <div className="line-1"></div>
        </div>
        <div className="share-title">分享至微信或朋友圈</div>
        <div className="share-btns">
          <div className="share-btns-friends">
            <img onClick={() => handleShareWebToWX()} src={require('../../assets/share-wx.png')} alt="" />
            <span>微信</span>
          </div>
          <div className="share-btns-friends">
          <img onClick={() => handleShareWebToWX()} src={require('../../assets/share-friends.png')} alt="" />
            <span>朋友圈</span>
          </div>
        </div>
      </div>
      )
    }, () => {

    })
    return bottomComponent
  }
  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    initCanvas()
  }, [viewRef, fullRef, data])
  return (
    <div className="poster">
      <Crumbs1 text="抽奖海报"></Crumbs1>
      {
        data.share_sign
          ? (
            <>
            <div className="poster-box">
            <div className='full' ref={fullRef}>
              <canvas ref={viewRef}></canvas>
            </div>
          </div>
          <div className="bottom-box">
          <a className="save-the" download href="javascript:;" onClick={() => handleSavePoster()}>
            点击保存海报
          </a>
          {
            bottomRender()
          }
        </div>
            </>

            )
          : null

      }

    </div>
  )
}

export default Poster
