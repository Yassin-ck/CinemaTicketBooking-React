import React, { useState } from 'react'
import MobilePhoneUpdation from './MobilePhoneUpdation'
import MobileOtpView from './MobileOtpView'

const MobileUpdationModal = () => {
const [sid,setSid] = useState()
const [PhoneView,setPhoneView] = useState(true)

const phoneClickHandler = (e)=>{
    setSid(e.sid)
    setPhoneView(false)
}

  return (
      
      <div>
    { PhoneView ?
        < MobilePhoneUpdation   byClick={e=>phoneClickHandler(e)} />
        :
        < MobileOtpView  sid={sid} />

    }
    </div>
  )
}

export default MobileUpdationModal