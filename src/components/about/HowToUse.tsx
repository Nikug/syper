import { A } from '@solidjs/router'
import { Component } from 'solid-js'
import { Routes } from '../../helpers/routeHelpers'

export const HowToUse: Component = () => {
  return (
    <div class="w-full">
      <h2 class="text-3xl font-bold mb-8">How to use</h2>
      <p class="mb-4">
        To complete your first typing test, go to the{' '}
        {
          <A href={Routes.test} class="link">
            Test page
          </A>
        }{' '}
        and start typing the text you see in the middle of the screen. Once you have typed the full
        text, you will be taken to the statistics view that shows you in depth information about
        your performance.
      </p>
      <p class="mb-16">
        Typing mode and settings can be changed using the dropdowns under the Syper_ logo in the{' '}
        <A href={Routes.test} class="link">
          Test page
        </A>
        . More options for customization are found in the{' '}
        <A href={Routes.options} class="link">
          Options page
        </A>
        .
      </p>
      <h2 class="text-3xl font-bold mb-8">Definitions</h2>
      <p class="font-bold">Word per minute (WPM):</p>
      <p class="mb-4">
        Standardized measure of typing speed. Calculated by dividing the number of typed words by
        time it took to type them in minutes. A word is standardized to have 5 characters, so the
        word count is not the actual number of words, but the total number of characters divided by
        five.
      </p>
      <p class="font-bold">Duration:</p>
      <p class="mb-4">The time it took to finish the test.</p>
      <p class="font-bold">Accuracy:</p>
      <p class="mb-4">
        Describes how many of typed characters were correct. Calculated by dividing the number of
        correctly typed characters by the total number of characters typed (including characters
        that were fixed).
      </p>
      <p class="font-bold">Correctness:</p>
      <p class="mb-4">
        Describes how correct the final text was. Calculated by dividing the number of correctly
        typed characters by test length.
      </p>
      <p class="font-bold">WPM Chart:</p>
      <p class="mb-4">
        The chart shows typing speed over time during the test. <b>Words per minute</b> shows the
        average typing speed during the last five characters. <b>Total words per minute</b> shows
        the typing speed up to that point in the test.
      </p>
      <p class="font-bold">Words per minute by words:</p>
      <p class="mb-4">
        This section shows how quickly each word was typed. WPM is calculated from the time the
        first letter of the word was typed to the time the space after the words was typed.
      </p>
    </div>
  )
}
