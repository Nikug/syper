/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, hashIntegration } from '@solidjs/router'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'
import './index.css'
import App from './App'

render(
  () => (
    <Router source={hashIntegration()}>
      <App />
    </Router>
  ),
  document.getElementById('root') as HTMLElement
)
