import { Component } from 'solid-js'
import { DatabasePersonalBest } from '../supabaseTypes'
import { toDateTimeString } from '../helpers/dateHelpers'

interface Props {
  personalBest: DatabasePersonalBest | undefined
}

export const PersonalBestChartTooltip: Component<Props> = (props) => {
  return (
    <div class="bg-theme-surface1 rounded px-4 py-2 !border-theme-danger">
      <h3 class="font-semibold mb-2">
        {toDateTimeString(new Date(props.personalBest?.date ?? new Date()))}
      </h3>
      <div>
        <p>
          Words per minute:{' '}
          <span class="font-bold">{props.personalBest?.wordsPerMinute.toFixed(2)}</span>
        </p>
      </div>
    </div>
  )
}
