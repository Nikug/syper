/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, hashIntegration } from '@solidjs/router'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import './index.css'
import './slider.css'
import { MetaProvider } from '@solidjs/meta'
import App from './App'

render(
  () => (
    <MetaProvider>
      <Router source={hashIntegration()}>
        <App />
      </Router>
    </MetaProvider>
  ),
  document.getElementById('root') as HTMLElement
)
