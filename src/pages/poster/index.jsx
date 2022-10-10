import React, { useRef, useState, useEffect } from 'react'
import './index.scss'
import { Toast } from 'antd-mobile'
import Crumbs1 from '../../components/crumbs1'
import utils from '../../utils/index'
import QRCode from 'qrcodejs2'
import { promotionSharePosterListApi } from '../../axios/api'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
const saveBtnImage = require('../../assets/saveposter.png')
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
  // 转换成blob
  const getBlob = (base64) => {
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0] // mime类型
    const byteString = atob(base64.split(',')[1]) // base64 解码
    const arrayBuffer = new ArrayBuffer(byteString.length) // 创建缓冲数组
    const intArray = new Uint8Array(arrayBuffer) // 创建视图
    for (let i = 0; i < byteString.length; i += 1) {
      intArray[i] = byteString.charCodeAt(i)
    }
    return new Blob([intArray], {
      type: mimeString
    })
  }
  const blobToBase64 = (blob) => {
    console.log('blobToBase64 1', blob)
    const fileReader = new FileReader()
    fileReader.readAsDataURL(blob)
    return new Promise((resolve) => {
      fileReader.onload = (e) => {
        resolve(e.target.result)
      }
    })
  }
  // 获取二进制流 转base 转blob
  const getImageToBlob = async (url) => {
    const res = await axios.get(url, { responseType: 'blob' })
    const baseData = await blobToBase64(new Blob([res.data], { type: res.headers['content-type'] }))
    // const blob = getBlob(baseData)
    return baseData
  }
  const getData = async () => {
    const res = await promotionSharePosterListApi({
      promotion_id: location.state.id
    })
    if (res.code !== 0) {
      return false
    }
    const resData = {
      posterUrl: '',
      userAvatar: ''
    }
    resData.posterUrl = await getImageToBlob(res.data.poster_url)
    resData.userAvatar = await getImageToBlob(res.data.user_avatar)
    console.log('resData', resData)
    setData({ ...res.data, ...resData })
  }

  const initCanvas = () => {
    console.log('viewRef', viewRef)
    if (fullRef.current && viewRef.current) {
      // 获取父盒子宽度
      const full = fullRef.current
      const canvas = viewRef.current
      const scaleNumber = 3 // 展示的是几倍图  越大越清晰
      canvas.width = full.offsetWidth * scaleNumber
      canvas.height = full.offsetHeight * scaleNumber
      // 参照比例
      const scaleWidth = 315
      const scaleHeight = 417
      const ava = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }// 头像
      ava.x = scaleNumber * full.offsetWidth * 14 / scaleWidth
      ava.y = scaleNumber * full.offsetHeight * 12 / scaleHeight
      ava.width = scaleNumber * full.offsetWidth * 30 / scaleWidth
      ava.height = scaleNumber * full.offsetWidth * 30 / scaleWidth
      // 文本
      const title = {
        x: scaleNumber * full.offsetWidth * 50 / scaleWidth,
        y: scaleNumber * full.offsetHeight * 33 / scaleHeight,
        fontSize: scaleNumber * full.offsetHeight * 15 / scaleHeight
      }
      // 二维码
      const qr = {
        x: scaleNumber * full.offsetWidth * 121 / scaleWidth,
        y: scaleNumber * full.offsetHeight * 315 / scaleHeight,
        width: scaleNumber * full.offsetWidth * 74 / scaleWidth,
        height: scaleNumber * full.offsetWidth * 74 / scaleWidth
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
      qrCanvas.height = scaleNumber * qr.height
      qrCanvas.width = scaleNumber * qr.width
      const shareUrl = window.location.protocol + '//' + window.location.host + `/#/layout/home?id=${location.state.id}&share_sign=${data.share_sign}`
      const qrcodeObj = getQrcode(qr.width, qr.height, shareUrl, 'canvas', qrCanvas)
      const codeCanvas = qrcodeObj._el.querySelector('canvas')
      const base64Text = codeCanvas.toDataURL('image/png')
      // const blob = getBlob(base64Text) // 将base64转换成blob对象
      console.log('qrcodeObj src', qrcodeObj._el.children[1])
      codeImg.onload = function () {
        console.log('codeImg.src1', codeImg.src)
        ctx.drawImage(codeImg, qr.x, qr.y, qr.width, qr.width)
      }
      codeImg.onerror = function (e) {
      }

      // 设置图片地址
      // image.src = data.poster_url + '?v=' + Math.random()
      // image.src = data.posterUrl
      // 必须要在onLoad之后再进行绘制图片，否则不会渲染
      image.onerror = function (e) {
        console.log('image error', e)
      }
      image.onload = function () {
        console.log('image')
        // 4各参数 图片的起始坐标和宽高
        ctx.drawImage(image, 0, 0, scaleNumber * full.offsetWidth, scaleNumber * full.offsetHeight)

        // 绘制文本
        ctx.font = `${title.fontSize}px PingFang SC` // 设置文案大小和字体
        // ctx.direction = 'ltr' // 文本方向从左向右
        ctx.textAlign = 'left' // 左对齐
        // ctx.fillStyle = '#ffff'
        console.log('title.x, title.y', title.x, title.y)
        ctx.fillText(data.user_name, title.x, title.y)

        // 赋值
        codeImg.src = base64Text

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
        avaImg.src = data.user_avatar
        console.log('avaImg src', avaImg.src)
      }
      image.src = data.poster_url
      console.log('image.src', image)
    }
  }

  // 保存海报到本地
  const handleSavePoster = () => {
    // onSave()
    try {
      const posterBase = viewRef.current.toDataURL('image/png;base64')
      utils.ownApp(() => {
        utils.saveBase64Image(posterBase)
      }, () => {
        const btn = document.createElement('a')
        btn.download = '分享海报'
        btn.href = posterBase
        btn.click()
      })
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
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
  // 导出图片成base64
  const onExportBase64 = () => {
    const posterBase = viewRef.current.toDataURL('image/png;base64')
    return posterBase
  }
  // 分享到微信微博
  const handleShareWebToWX = (share_way) => {
    const share_title = location.state.title || '元音符'
    // const url = window.location.origin + '/#/layout/home?share_sign=' + data.share_sign + '&id=' + location.state.id
    const img = onExportBase64()
    let appConfig = window.localStorage.getItem('AppConfigInfo')
    if (appConfig) {
      appConfig = JSON.parse(appConfig)
    } else {
      appConfig = {
        'version-code': '1710'
      }
    }
    if (Number(appConfig['version-code']) >= 1750) {
      utils.shareBase64Image({
        share_title,
        share_way,
        img
      })
    } else {
      const share_url = window.location.origin + '/#/layout/home?share_sign=' + data.share_sign + '&id=' + location.state.id
      utils.shareWebToWX(share_title, '', share_url, img)
    }
  }
  // const bottomRender = () => {
  //   let bottomComponent = null
  //   utils.ownApp(() => {
  //     bottomComponent = (
  //     <div className="bottom-box-share">
  //       <div className="line">
  //         <div className="line-1"></div>
  //         <div className="line-1"></div>
  //       </div>
  //       <div className="share-title">分享至微信或朋友圈</div>
  //       <div className="share-btns">
  //         <div className="share-btns-friends">
  //           <img onClick={() => handleShareWebToWX()} src={require('../../assets/share-wx.png')} alt="" />
  //           <span>微信</span>
  //         </div>
  //         <div className="share-btns-friends">
  //         <img onClick={() => handleShareWebToWX()} src={require('../../assets/share-friends.png')} alt="" />
  //           <span>朋友圈</span>
  //         </div>
  //       </div>
  //     </div>
  //     )
  //   }, () => {

  //   })
  //   return bottomComponent
  // }
  const bottomRender = () => {
    return (
      <div className="bottom-box-share">
        <div className="share-1">可分享至</div>
        <img src={require('../../assets/share-wx.png')} alt="" className="share-2" onClick={() => handleShareWebToWX('wxFriend')} />
        <img src={require('../../assets/share-friends.png')} alt="" className="share-3" onClick={() => handleShareWebToWX('wxFriend')} />
        <img src={require('../../assets/share-weibo.png')} alt="" className="share-3" onClick={() => handleShareWebToWX('weibo')} />
      </div>
    )
  }
  useEffect(() => {
    getData()
    return () => {

    }
  }, [])
  useEffect(() => {
    initCanvas()
  }, [viewRef, fullRef, data])
  return (
    <div className="poster">
      {/* <Crumbs1 text="活动海报"></Crumbs1> */}
      {
        data.share_sign
          ? (
            <>
            <div className="share-tips">邀请好友参加，可获得更多抽奖机会</div>
            <div className="poster-box">
            <div className='full' ref={fullRef}>
              <canvas ref={viewRef}></canvas>
            </div>
          </div>
          <div className="bottom-box">
          {/* <a className="save-the" download href="javascript:;" onClick={() => handleSavePoster()}>
            点击保存海报
          </a> */}
          <img src={saveBtnImage} className="save-the" onClick={() => handleSavePoster()} />
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
