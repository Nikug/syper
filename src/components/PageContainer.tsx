import { Component, JSX } from 'solid-js'
import { Header } from './Header'

interface Props {
  children: JSX.Element
}

export const PageContainer: Component<Props> = (props) => {
  return (
    <div class="max-w-7xl px-16 mx-auto">
      <Header />
      <div class="mt-16">{props.children}</div>
    </div>
  )
}
