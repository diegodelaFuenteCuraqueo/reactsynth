import React, { useState, useEffect } from "react"
import eventEmitter from "../EventEmitter/eventEmitter"
import "./Key.css"

function Key({keynote, isBlackKey}) {

  const [isPressed, setIsPressed] = useState(false)

  useEffect(() => {
    const handleNoteOn = ({ midinote }) => {
      if (midinote === keynote) {
        setIsPressed(true)
      }
    }

    const handleNoteOff = ({ midinote }) => {
      if (midinote === keynote) {
        setIsPressed(false)
      }
    }

    eventEmitter.on('noteOn', handleNoteOn)
    eventEmitter.on('noteOff', handleNoteOff)

    return () => {
      eventEmitter.removeListener('noteOn', handleNoteOn)
      eventEmitter.removeListener('noteOff', handleNoteOff)
    }
  }, [])

  const handleMouseDown = () => {
    setIsPressed(true)
    eventEmitter.emit('noteOn', { midinote: keynote, vel: 60 })
  }

  const handleMouseUp = () => {
    setIsPressed(false)
    eventEmitter.emit('noteOff', { midinote: keynote, vel : 0 })
  }

  return (
    <button
      className={`keyButton ${isBlackKey ? 'isBlackKey' : ''} ${isPressed ? 'isPressed' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      { keynote }
    </button>
  )

}

export default Key
