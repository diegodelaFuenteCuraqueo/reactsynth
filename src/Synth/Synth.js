import React, { useEffect } from 'react'
import eventEmitter from "../EventEmitter/eventEmitter"
import Slider from "../Slider/Slider.js"
import Poly from "./Poly.js"
import "./Synth.css"

const Synth = () => {
  useEffect(() => {
    const listenerPressed = ({ midinote, vel }) => {
      const { voice, note, velocity } = Poly.requestVoice(midinote, vel)
      window.sendMsgToWebPd("n_0_34" , "0" , [velocity])
      window.sendMsgToWebPd("n_0_33" , "0" , [note])
      window.sendMsgToWebPd("n_0_32" , "0" , [voice])
    }

    const listenerReleased = ({ midinote, vel=0 }) => {
      const { voice, note, velocity } = Poly.requestVoice(midinote, vel)
      window.sendMsgToWebPd("n_0_34" , "0" , [velocity])
      window.sendMsgToWebPd("n_0_33" , "0" , [note])
      window.sendMsgToWebPd("n_0_32" , "0" , [voice])
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
