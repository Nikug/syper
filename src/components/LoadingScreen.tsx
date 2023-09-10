import { Component, createSignal, For, onCleanup, onMount } from 'solid-js'

const dotCount = 15
const updateInterval = 50
const sizeMultiplier = 1.5

const getDots = (start: number): number[] => {
  const step = Math.PI / dotCount
  const sizes = Array(dotCount)
    .fill(0)
    .map((_, index) => ((start + index) % dotCount) * step)
  const waves = sizes.map((value) =>
    Math.floor(Math.abs(Math.sin(value) * dotCount * sizeMultiplier))
  )
  return waves
}

export const LoadingScreen: Component = () => {
  const [dotIndex, setDotIndex] = createSignal<number>(0)
  const [loadingDots, setLoadingDots] = createSignal<number[]>(getDots(0))
  const [intervalId, setIntervalId] = createSignal<NodeJS.Timeout | undefined>(undefined)

  onMount(() => {
    const id = setInterval(() => {
      setDotIndex((dotIndex() + 1) % dotCount)
      setLoadingDots(getDots(dotIndex()))
    }, updateInterval)
    setIntervalId(id)
  })

  onCleanup(() => clearInterval(intervalId()))

  return (
    <div class="bg-theme-base w-screen h-screen">
      <div class="flex flex-col justify-center items-center h-full">
        <p class="text-3xl font-bold mb-2">Waking up Azure services</p>
        <p class="mb-8">This usually takes around 15 seconds</p>
        <div>
          <For each={loadingDots()}>
            {(styles) => (
              <div style={{ height: `${styles}px` }} class="i-ri-cloud-fill inline-block w-8" />
            )}
          </For>
        </div>
      </div>
    </div>
  )
}
