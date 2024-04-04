import { Component } from 'solid-js'

export const References: Component = () => {
  return (
    <div class="w-full">
      <h2 class="h2">References</h2>
      <div class="mb-8">
        <h3 class="h3">Quotes</h3>
        <p>
          <b class="mr-4">Quotes:</b>
          <a class="link" href="https://monkeytype.com">
            Monkeytype
          </a>
        </p>
      </div>
      <div class="mb-8">
        <h3 class="h3">Dictionaries</h3>
        <p>
          <b class="mr-4">Finnish 100K:</b>
          <a class="link" href="https://www.kotus.fi/aineistot/sana-aineistot/nykysuomen_sanalista">
            Nykysuomen sanalista. Kotimaisten kielten keskus.
          </a>
        </p>
      </div>
    </div>
  )
}
