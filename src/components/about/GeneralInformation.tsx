import { A } from '@solidjs/router'
import { Component } from 'solid-js'
import { Routes } from '../../helpers/routeHelpers'

export const GeneralInformation: Component = () => {
  return (
    <div class="w-full">
      <h2 class="h2">About</h2>
      <p class="mb-4">
        A solid typing experience. Syper is a clean, minimalistic and customizable typing game.
        Features include: quotes, multiple dictionaries, different test modes, multiple beautiful
        themes, detailed statistics and more. Sign in to save your typing history to view your
        results over time and remember your settings between devices.
      </p>
      <p class="mb-16">
        <A href={Routes.privacy} class="link">
          Privacy policy
        </A>{' '}
        can be read here. It describes what data is collected and how it is used.
      </p>
      <h2 class="h2">Development</h2>
      <p>
        The source code can be found here:{' '}
        <a class="link" href="https://github.com/nikug/syper">
          github.com/nikug/syper
        </a>
        . It is not really ready for open-source development but feel free to look around, create
        issues etc.
      </p>
    </div>
  )
}
