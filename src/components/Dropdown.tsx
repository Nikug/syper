import { createSignal, For, JSX, onCleanup, onMount, Show } from 'solid-js'
import { Portal } from 'solid-js/web'

export interface Option<K, V> {
  key: K
  value: V
}

interface Props<K extends string | number, V> {
  value: string
  options: Option<K, V>[]
  onSelect?: (option: Option<K, V>) => void
}

export const Dropdown = <K extends string | number, V>(props: Props<K, V>) => {
  let dropdownRef: HTMLDivElement | undefined
  let panelRef: HTMLDivElement | undefined
  const [open, setOpen] = createSignal(false)

  onMount(() => {
    addEventListener('click', handleClick)
  })
  onCleanup(() => {
    removeEventListener('click', handleClick)
  })

  const handleClick = (event: MouseEvent) => {
    const target = event.target
    if (!dropdownRef?.contains(target as Node) && !panelRef?.contains(target as Node)) {
      setOpen(false)
    }
  }

  const dropdownPosition = (): JSX.CSSProperties => {
    if (!dropdownRef) return {}
    const bounds = dropdownRef.getBoundingClientRect()
    return {
      top: `${bounds.y + dropdownRef.clientHeight}px`,
      left: `${bounds.x}px`,
    }
  }

  const handleSelect = (option: Option<K, V>) => {
    setOpen(false)
    props.onSelect?.(option)
  }

  return (
    <div ref={dropdownRef} onClick={() => setOpen(!open())} class="cursor-pointer">
      <p>{props.value}</p>
      <Show when={open()}>
        <Portal mount={document.getElementById('root') ?? undefined}>
          <div
            ref={panelRef}
            class="absolute paper text-ctp-text"
            style={{ ...dropdownPosition() }}
          >
            <For each={props.options}>
              {(option) => (
                <div
                  class="hover:bg-ctp-overlay1 px-4 py-1 cursor-pointer"
                  onClick={() => handleSelect(option)}
                >
                  {option.key.toString()}
                </div>
              )}
            </For>
          </div>
        </Portal>
      </Show>
    </div>
  )
}
