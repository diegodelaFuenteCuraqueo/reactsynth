import React, { useEffect, useState } from 'react'
import eventEmitter from '../EventEmitter/eventEmitter'

const MidiInput = () => {
  const [midiAccess, setMidiAccess] = useState(null)

  useEffect(() => {
    if (navigator.requestMIDIAccess) {    // Check for Web MIDI API support
      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure) // Request MIDI access
    } else {
      console.error('Web MIDI API is not supported in this browser.')
    }

    function onMIDISuccess(midiAccess) {
      setMidiAccess(midiAccess)

      // Attaches event listener to all devices
      const inputList = midiAccess.inputs.values()
      for(const dev of inputList) {
        dev.onmidimessage = onMIDIMessage(dev.name)
        console.log(dev)
      }
    }

    function onMIDIFailure(error) {
      console.error('Failed to get MIDI access:', error)
    }

    // Event handler for MIDI messages
    function onMIDIMessage(name) {
      return function(event) {
        const [command, note, velocity] = event.data

        // Log MIDI message data in the console
        if (command === 254) return
        switch (command) {
          case 144:
            eventEmitter.emit('noteOn', { note: note, velocity, device: name })
            break
          case 128:
            eventEmitter.emit('noteOff', { note: note, velocity, device: name })
            break
          default:
            console.log('Unknown command', command)
        }

        console.log(name, 'MIDI Message:', {
          command,
          note,
          velocity,
          device: name
        })
      }

    }

    return () => {
      if (midiAccess) {
        const inputList = midiAccess.inputs.values()
        for(const dev of inputList) {
          dev.onmidimessage = null
        }
      }
    }
  }, [])

  return (
    <div>
      <p>MIDI Input Component Active</p>
    </div>
  )
}

export default MidiInput
