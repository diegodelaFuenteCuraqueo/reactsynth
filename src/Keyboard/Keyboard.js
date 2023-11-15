import React, { useState } from "react"
import Key from "../Key/Key.js"

function Keyboard() {

  const [numberOfKeys, setNumberOfKeys] = useState(12)
  const [firstKey, setFirstKey] = useState(60)

  const keys = []

  for (let midinote = firstKey; midinote <= firstKey+numberOfKeys; midinote++) {
    const isBlackKey = [1, 3, 6, 8, 10].includes(midinote % 12);
    keys.push(<Key key={midinote} midinote={midinote} isBlackKey={isBlackKey} />);
  }


  return (
    <div>
      <p>Keyboard</p>
      <div>
        <label>Number of keys : {numberOfKeys}</label>
        <input
          type="range"
          min={1}
          max={127}
          value={numberOfKeys}
          step={1}
          onChange={(event) => setNumberOfKeys(parseInt(event.target.value))}
        />
      </div>
      <div>
        <label>Lower key : {firstKey}</label>
        <input
          type="range"
          min={0}
          max={127}
          value={firstKey}
          step={1}
          onChange={(event) => setFirstKey(parseInt(event.target.value))}
        />
      </div>
      <div style={{ display: "flex" }}>{keys}</div>
    </div>

  )
}

export default Keyboard
