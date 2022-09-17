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
        alert('code2onload')
        console.log('codeImg.src1', codeImg.src)
        ctx.drawImage(codeImg, qr.x, qr.y, qr.width, qr.width)
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
        codeImg.src = qrcodeObj._el.children[1].src

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
          <div className="bottom-box-share">
            <div className="line">
              <div className="line-1"></div>
              <div className="line-1"></div>
            </div>
            <div className="share-title">分享至微信或朋友圈</div>
            <div className="share-btns">
              <div className="share-btns-friends">
                <img onClick={() => utils.shareWebToWX('title', 'desc', 'https://www.baidu.com', 'coverurl')} src={require('../../assets/share-wx.png')} alt="" />
                <span>微信</span>
              </div>
              <div className="share-btns-friends">
              <img onClick={() => utils.shareWebToWX('title', 'desc', 'https://www.baidu.com', 'coverurl')} src={require('../../assets/share-friends.png')} alt="" />
                <span>朋友圈</span>
              </div>
            </div>
          </div>
        </div>
            </>

            )
          : null

      }

    </div>
  )
}

export default Poster
