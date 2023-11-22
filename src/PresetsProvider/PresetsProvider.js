import React, { createContext, useEffect, useState } from 'react'

// Create a context
export const PresetContext = createContext()

// Parent component to fetch and provide preset data
function PresetsProvider ({ children }) {

  const [presets, setPresets] = useState([])
  const [selectedPreset, setSelectedPreset] = useState(null); // New state for selected preset

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/synth-presets')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setPresets(data.presets)
        window.presetData = data.presets
        console.log(data.presets) 
      } catch (error) {
        setPresets([])
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const selectPreset = (index) => {
    setSelectedPreset(presets[index]);
  };

  return (
    <PresetContext.Provider value={{ presets, selectedPreset, selectPreset }}> {/* Providing both presets and selectedPreset */}
      {children}
    </PresetContext.Provider>
  )
}

export default PresetsProvider

