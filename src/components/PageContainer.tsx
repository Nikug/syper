import { Component, JSX } from 'solid-js'
import { Header } from './Header'

interface Props {
  children: JSX.Element
}

export const PageContainer: Component<Props> = (props) => {
  return (
    <div class="max-w-7xl md:px-16 px-2 mx-auto">
      <Header />
      <div class="mt-16 mb-32">{props.children}</div>
    </div>
  )
}
