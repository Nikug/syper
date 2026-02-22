/* @refresh reload */
import { render } from 'solid-js/web'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import './index.css'
import './slider.css'
import { MetaProvider } from '@solidjs/meta'
import App from './App'

render(
  () => (
    <MetaProvider>
      <App />
    </MetaProvider>
  ),
  document.getElementById('root') as HTMLElement
)
