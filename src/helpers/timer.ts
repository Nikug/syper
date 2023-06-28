type Callback = () => void

export class Timer {
  private interval = 0
  private ticks = 0
  private startTime = 0
  private callback: Callback | null = null
  private timeout: NodeJS.Timeout | undefined
  private stopped = false

  constructor(callback: Callback | null, interval: number) {
    this.callback = callback
    this.interval = interval
  }

  start() {
    this.stopped = false
    this.startTime = performance.now()
    this.tick()
  }

  stop() {
    this.stopped = true
    clearTimeout(this.timeout)
  }

  private tick() {
    const now = performance.now()
    const targetPassedTime = this.ticks * this.interval
    const actualPassedTime = now - this.startTime
    const drift = actualPassedTime - targetPassedTime
    this.ticks += 1
    this.timeout = setTimeout(() => {
      if (!this.stopped) {
        this.tick()
        this.callback?.()
      }
    }, this.interval - drift)
  }
}
