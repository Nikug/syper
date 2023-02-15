import { Component } from 'solid-js'
import { quote } from '../StateManager'

export const QuoteInformation: Component = () => {
  return (
    <div class="truncate">
      <span class="mr-8">{quote().length} characters</span>
      <span>{quote().source}</span>
    </div>
  )
}
