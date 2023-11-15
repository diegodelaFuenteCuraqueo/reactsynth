import React, { useState } from "react"

function Slider({label, min=0, max=127, value, onChange}) {
  const [sliderValue, setSliderValue] = useState(value)

  const handleSliderChange = (event) => {
    const newValue = parseFloat(event.target.value)
    setSliderValue(newValue)
    onChange(newValue)
  }

  return (
    <div>
      <label>{label} : {sliderValue}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={0.01}
        onChange={handleSliderChange}
      />
    </div>

  )
}

export default Slider
