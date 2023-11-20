import React, { useEffect } from 'react'
import eventEmitter from "../EventEmitter/eventEmitter"
import Slider from "../Slider/Slider.js"
import "./Synth.css"

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

    eventEmitter.on('noteBtnOn', listenerPressed)
    eventEmitter.on('noteBtnOff', listenerReleased)

    return () => {
      eventEmitter.removeListener('noteBtnOn', listenerPressed)
      eventEmitter.removeListener('noteBtnOff', listenerReleased)
    }
  }, [])

  const harmChange = (value) => {
    window.sendMsgToWebPd("n_0_29" , "0" , [value]) // harm
  }

  const modIndxChange = (value) => {
    window.sendMsgToWebPd("n_0_30" , "0" , [value]) // modIndx
  }

  return (
    <div className="synth-container">
      <div className="synth-content">
      <p>Synth</p>
        <Slider label="harmonicity" min={0} max={10} value={1} onChange={harmChange} />
        <Slider label="modulation index" min={0} max={1000} value={1} onChange={modIndxChange} />
      </div>
    </div>
  )
}

export default Synth
