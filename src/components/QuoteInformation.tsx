import { quote } from '../App'
export const QuoteInformation = () => {
  return (
    <div>
      <span class="mr-8">{quote().length} characters</span>
      <span>{quote().source}</span>
    </div>
  )
}
