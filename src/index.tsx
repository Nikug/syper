/* @refresh reload */
import { render } from 'solid-js/web'
import { Router } from '@solidjs/router'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import './index.css'
import './slider.css'
import { MetaProvider } from '@solidjs/meta'
import App from './App'

render(
  () => (
    <MetaProvider>
      <Router>
        <App />
      </Router>
    </MetaProvider>
  ),
  document.getElementById('root') as HTMLElement
)
