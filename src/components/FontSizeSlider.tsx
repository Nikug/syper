import { Component } from 'solid-js'
import { setUserOptions, userOptions } from '../StateManager'
import { persistUserOptions } from '../helpers/optionsHelpers'

export const FontSizeSelector: Component = () => {
  const handleInput = (value: string) => {
    const newFontSize = parseInt(value)
    if (isNaN(newFontSize)) return
    setUserOptions({ fontSize: newFontSize })
  }

  const handleChange = async (value: string) => {
    const newFontSize = parseInt(value)
    if (isNaN(newFontSize)) return
    setUserOptions({ fontSize: newFontSize })
    await persistUserOptions()
  }

  return (
    <div class="flex gap-2 items-center">
      <p>{userOptions.fontSize}px</p>
      <input
        type="range"
        min={4}
        max={64}
        step={4}
        value={userOptions.fontSize}
        onInput={(event) => handleInput(event.target.value)}
        onChange={(event) => handleChange(event.target.value)}
        class="slider"
      />
    </div>
  )
}
