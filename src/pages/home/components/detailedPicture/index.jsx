
import React from 'react'
import './index.scss'
function DetailedPicture (props) {
  return (
    <div className="detailedPicture">
      <div className="detailedPicture-content">
        {
          props.picList && props.picList.map(item => (
            <img src={item} alt="" key={item} />
          ))
        }
      </div>
    </div>
  )
}

export default DetailedPicture
