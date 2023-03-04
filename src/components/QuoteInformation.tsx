import { Component } from 'solid-js'
import { typingTest } from '../StateManager'

export const QuoteInformation: Component = () => {
  return (
    <div class="truncate">
      <span class="mr-8">{typingTest().length} characters</span>
      <span>{typingTest().source}</span>
    </div>
  )
}
