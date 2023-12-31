import React, { useEffect, useState } from "react"
import "./Slider.css"

function Slider({label, min=0, max=127, value, onChange}) {
  const [sliderValue, setSliderValue] = useState(value)

  const handleSliderChange = (event) => {
    const newValue = parseFloat(event.target.value)
    setSliderValue(newValue)
    onChange(newValue)
  }

  useEffect(() => {
    setSliderValue(value)
  }, [value])

  return (
    <div className="slider-container">
      <label className="slider-label">{label} : <small>{sliderValue}</small></label>
      <input
        style={{width: "100%"}}
        className="slider"
        type="range"
        min={min}
        max={max}
        step={0.01}
        value={sliderValue}
        onChange={handleSliderChange}
      />
    </div>

  )
}

export default Slider
