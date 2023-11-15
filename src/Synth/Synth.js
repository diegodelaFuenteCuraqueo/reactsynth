import React, { useEffect } from 'react'
import eventEmitter from "../EventEmitter/eventEmitter"
import Slider from "../Synth/Slider.js"

const Synth = () => {
  useEffect(() => {
    const listenerPressed = ({ midinote, velocity }) => {
      window.sendMsgToWebPd("n_0_34" , "0" , [velocity]) // vel
      window.sendMsgToWebPd("n_0_33" , "0" , [midinote]) // midinote
      window.sendMsgToWebPd("n_0_32" , "0" , [1]) // voice
    }

    const listenerReleased = ({ midinote, velocity=0 }) => {
      window.sendMsgToWebPd("n_0_34" , "0" , [velocity]) // vel
      window.sendMsgToWebPd("n_0_33" , "0" , [midinote]) // midinote
      window.sendMsgToWebPd("n_0_32" , "0" , [1]) // voice
    }

    eventEmitter.on('noteOn', listenerPressed)
    eventEmitter.on('noteOff', listenerReleased)

    return () => {
      eventEmitter.removeListener('noteOn', listenerPressed)
      eventEmitter.removeListener('noteOff', listenerReleased)
    }
  }, [])

  const harmChange = (value) => {
    window.sendMsgToWebPd("n_0_29" , "0" , [value]) // harm
  }

  const modIndxChange = (value) => {
    window.sendMsgToWebPd("n_0_30" , "0" , [value]) // modIndx
  }

  return (
    <div>
      <p>Synth</p>
      <div>
        <Slider label="harmonicity" min={0} max={10} value={1} onChange={harmChange} />
        <Slider label="modulation index" min={0} max={1000} value={1} onChange={modIndxChange} />
      </div>
    </div>
  )
}

export default Synth
