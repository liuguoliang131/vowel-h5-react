import React from 'react'

function Vbtn (props) {
  return (
    <div className="v-btn" onClick={() => props.click()}>
      {props.text}
    </div>
  )
}

export default Vbtn
