import React, { useContext, useState } from 'react'
import { PresetContext } from '../PresetsProvider/PresetsProvider.js'

const PresetPick = () => {
  const { presets, selectedPreset, selectPreset } = useContext(PresetContext);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState('');

  const handlePresetSelect = (event) => {
    const index = event.target.value;
    setSelectedPresetIndex(index)
    selectPreset(index)
  };

  return (
    <div>
      <select value={selectedPresetIndex} onChange={handlePresetSelect}>
        <option value="">Select a preset</option>
        {presets && presets.length > 0 &&
          presets.map((preset, index) => (
            <option key={index} value={index}>
              {preset.name}
            </option>
          ))}
      </select>
    </div>
  )
}

export default PresetPick;
