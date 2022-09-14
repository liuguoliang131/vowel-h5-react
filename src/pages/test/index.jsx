import React, { useEffect, useState, createRef } from 'react'

import QRCode from 'qrcodejs2'
function Test () {
  const canvasRef = createRef()
  const getQrcode = (qWidth, qHeight, qText, qRender, dom) => {
    const qr = new QRCode(dom, {
      width: qWidth,
      height: qHeight,
      text: qText,
      render: qRender
    })
  }
  const initCanvas = () => {
    if (canvasRef.current) {
      getQrcode(100, 100, 'asdasdasd', 'canvas', canvasRef.current)
    }
  }
  useEffect(() => {
    initCanvas()
  }, [canvasRef])
  return (
    <>
      <div ref={canvasRef}></div>
    </>
  )
}
export default Test
