import React, { useState, useContext } from "react"
import Key from "../Key/Key.js"
import "./Keyboard.css"
import { PresetContext } from '../PresetsProvider/PresetsProvider.js'
import usePreset from "../PresetPick/usePreset.js"

function Keyboard() {

  const { selectedPreset } = useContext(PresetContext)
  const [numberOfKeys, setNumberOfKeys] = useState(selectedPreset?.number_of_keys || 24)
  const [firstKey, setFirstKey] = useState(selectedPreset?.low_key || 60)

  const keys = []

  for (let midinote = firstKey; midinote <= firstKey+numberOfKeys; midinote++) {
    const isBlackKey = [1, 3, 6, 8, 10].includes(midinote % 12);
    keys.push(<Key key={midinote} keynote={midinote} isBlackKey={isBlackKey} />)
  }

  usePreset(selectedPreset, (preset) => {
    if (preset) {
      setFirstKey(preset.low_key)
      setNumberOfKeys(preset.number_of_keys)
    }
  });

  return (
    <div className="keyboard-container">
      <div className="controls">
        <p>Keyboard</p>
        <div className="config">

          <label>Lower</label>
          <input
            type="number"
            min={0}
            max={72}
            value={firstKey}
            step={1}
            style={{width: "100px", margin:"auto"}}
            onChange={(event) => setFirstKey(parseInt(event.target.value))}
          />
        </div>

        <div className="config">
          <label>Number</label>

          <input
            type="number"
            min={1}
            max={60}
            value={numberOfKeys}
            step={1}
            style={{width: "100px", margin:"auto"}}
            onChange={(event) => setNumberOfKeys(parseInt(event.target.value))}
          />
        </div>
      </div>
      <div style={{ display: "flex" , justifyContent: "center"}}>{keys}</div>
    </div>

  )
}

export default Keyboard
