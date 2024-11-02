import { Component, For, createSignal, onCleanup, onMount } from 'solid-js'
import { Character } from './Character'

const updateInterval = 100
const loadingText = 'loading...'.split('')

export const LoadingScreen: Component = () => {
  const [intervalId, setIntervalId] = createSignal<NodeJS.Timeout | undefined>(undefined)
  const [index, setIndex] = createSignal<number>(0)

  const updateIndex = () => {
    const max = loadingText.length
    if (index() + 1 === max) {
      setIndex(0)
    } else {
      setIndex(index() + 1)
    }
  }

  onMount(() => {
    const id = setInterval(() => updateIndex(), updateInterval)
    setIntervalId(id)
  })

  onCleanup(() => clearInterval(intervalId()))

  return (
    <div class="bg-theme-base w-screen h-screen">
      <div class="flex flex-col justify-center items-center h-full">
        <div class="font-mono text-5xl font-bold">
          <For each={loadingText}>
            {(char, i) => (
              <Character
                expected={char}
                actual={i() < index() ? loadingText[i()] : undefined}
                isNext={i() === index()}
              />
            )}
          </For>
        </div>
      </div>
    </div>
  )
}
