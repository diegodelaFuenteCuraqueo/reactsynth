import React, { useState } from "react"
import eventEmitter from "../EventEmitter/eventEmitter"

function Key({midinote, isBlackKey}) {
  const [isPressed, setIsPressed] = useState(false)

  const handleMouseDown = () => {
    setIsPressed(true)
    eventEmitter.emit('noteOn', { midinote, velocity : 127 })
    console.log('Button pressed')
  }

  const handleMouseUp = () => {
    setIsPressed(false)
    eventEmitter.emit('noteOff', { midinote, velocity : 0 })
    console.log('Button released')
  }

  return (
    <button
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{
        width: isBlackKey ? "35px" : "60px",
        height: isBlackKey ? "120px" : "200px",
        border: "1px solid black",
        color: "gray",
        marginLeft: isBlackKey ? "-25px" : "0", // Adjust for the positioning of black keys
        marginRight: isBlackKey ? "-25px" : "0",
        zIndex: isBlackKey ? 1 : 0,
        backgroundColor: isBlackKey
          ? (isPressed ? "red" : "black")
          : (isPressed ? "red" : "white"),
        display: "flex",
        flexDirection: "column", // Align text at the bottom
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      { midinote }
    </button>
  )

}

export default Key
