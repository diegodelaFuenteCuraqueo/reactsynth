import React, { useState } from "react"
import Key from "../Key/Key.js"
import "./Keyboard.css"

function Keyboard() {

  const [numberOfKeys, setNumberOfKeys] = useState(24)
  const [firstKey, setFirstKey] = useState(60)

  const keys = []

  for (let midinote = firstKey; midinote <= firstKey+numberOfKeys; midinote++) {
    const isBlackKey = [1, 3, 6, 8, 10].includes(midinote % 12);
    keys.push(<Key key={midinote} midinote={midinote} isBlackKey={isBlackKey} />);
  }


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
