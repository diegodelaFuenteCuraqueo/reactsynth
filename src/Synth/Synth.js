import React, { useEffect, useState, useContext } from 'react'
import eventEmitter from "../EventEmitter/eventEmitter"
import Slider from "../Slider/Slider.js"
import Poly from "./Poly.js"
import "./Synth.css"
import { PresetContext } from '../PresetsProvider/PresetsProvider.js';
import usePreset from '../PresetPick/usePreset.js';

const Synth = () => {

  const { selectedPreset } = useContext(PresetContext)
  const [harm, setHarm] = useState(selectedPreset?.harmonicity || 1)
  const [modIndx, setModIndx] = useState(selectedPreset?.modulation_index || 1)

  useEffect(() => {
    const listenerPressed = async ({ midinote, vel }) => {
      const { voice, note, velocity } = await Poly.requestVoice(midinote, vel)
      window.sendMsgToWebPd("n_0_34" , "0" , [velocity])
      window.sendMsgToWebPd("n_0_33" , "0" , [note])
      window.sendMsgToWebPd("n_0_32" , "0" , [voice])
    }

    const listenerReleased = async ({ midinote, vel=0 }) => {
      const { voice, note, velocity } = await Poly.requestVoice(midinote, vel)
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

  usePreset(selectedPreset, (preset) => {
    if (preset) {
      setHarm(preset.harmonicity)
      setModIndx(preset.modulation_index)
      harmChange(preset.harmonicity)
      modIndxChange(preset.modulation_index)
    }
  });


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
        <Slider label="harmonicity" min={0} max={10} value={ harm } onChange={harmChange} />
        <Slider label="modulation index" min={0} max={1000} value={ modIndx } onChange={modIndxChange} />
      </div>
    </div>
  )
}

export default Synth
