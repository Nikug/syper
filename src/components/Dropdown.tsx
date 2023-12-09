import clsx from 'clsx'
import { createSignal, For, JSX, onCleanup, onMount, Show } from 'solid-js'
import { Portal } from 'solid-js/web'

export interface Option<K, V> {
  key: K
  value: V
}

interface Props<K, V extends JSX.Element> {
  key: K | K[]
  options: Option<K, V>[]
  onSelect?: (option: Option<K, V>) => void
  valueFormatter?: (option: Option<K, V>) => JSX.Element
}

export const Dropdown = <K, V extends JSX.Element>(props: Props<K, V>) => {
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
      top: `${bounds.y + dropdownRef.clientHeight + window.scrollY}px`,
      left: `${bounds.x}px`,
      'min-width': `${dropdownRef.getBoundingClientRect().width}px`,
    }
  }

  const handleSelect = (option: Option<K, V>) => {
    setOpen(false)
    props.onSelect?.(option)
  }

  const getOption = (key: K | K[]): Option<K, V> | Option<K, V>[] =>
    Array.isArray(key)
      ? props.options.filter((option) => key.includes(option.key))
      : props.options.find((option) => option.key === key)!

  const formatValue = (key: K | K[]): JSX.Element => {
    const options = getOption(key)
    if (Array.isArray(options)) {
      if (props.valueFormatter) {
        return options.map((option) => props.valueFormatter!(option))
      } else {
        return options.map((option) => option.value).join(', ')
      }
    }

    return props.valueFormatter ? props.valueFormatter(options) : options.value
  }

  const formatOption = (option: Option<K, V>) => {
    const isSelected = () =>
      Array.isArray(props.key)
        ? props.key.some((value) => value === option.key)
        : props.key === option.key

    return (
      <div class="flex items-center gap-2">
        <Show when={Array.isArray(props.key)}>
          <Show when={isSelected()} fallback={<div class="w-4" />}>
            <div class="i-ri-check-line" />
          </Show>
        </Show>
        {option.value}
      </div>
    )
  }

  return (
    <div ref={dropdownRef} onClick={() => setOpen(!open())} class="cursor-pointer">
      <p class={clsx('px-2', { 'border-button': !open() }, { 'border-button-active': open() })}>
        {formatValue(props.key)}
      </p>
      <Show when={open()}>
        <Portal mount={document.getElementById('root') ?? undefined}>
          <div
            ref={panelRef}
            class="absolute paper text-theme-text"
            style={{ ...dropdownPosition() }}
          >
            <For each={props.options}>
              {(option) => (
                <div
                  class="hover:bg-theme-surface1 px-4 py-1 cursor-pointer"
                  onClick={() => handleSelect(option)}
                >
                  {formatOption(option)}
                </div>
              )}
            </For>
          </div>
        </Portal>
      </Show>
    </div>
  )
}
