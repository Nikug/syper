import { saveTestResult } from '../api/testResults'
import { getUserId } from '../authentication/Supabase'
import { CharactersPerWord } from '../constants'
import { getAccuracy, getCorrectness, getWordsPerMinute } from '../helpers/mathHelpers'
import { isQuoteMode, isTimeMode } from '../helpers/optionsHelpers'
import { startSyncing, stopSyncing } from '../SyncingManager'
import { Attempt, DatabaseTestResultInput, TextMode, TypingTest } from '../types'

export const submitTestResult = async (
  attempt: Attempt,
  textMode: TextMode,
  typingTest: TypingTest
): Promise<void> => {
  const userId = getUserId()
  if (!userId || attempt.measurements.startTime == null || !attempt.measurements.endTime) return

  startSyncing()
  try {
    const duration = attempt.measurements.endTime - attempt.measurements.startTime

    const testResult: DatabaseTestResultInput = {
      userId: userId,
      textMode: textMode,
      quoteId: isQuoteMode() ? typingTest.id.toString() : undefined,
      source: typingTest.source,
      characters: typingTest.length,
      words: isTimeMode()
        ? Math.round(typingTest.length / CharactersPerWord)
        : typingTest.words.length,
      duration: duration,
      wordsPerMinute: getWordsPerMinute(attempt.measurements, typingTest) ?? 0,
      correctness: getCorrectness(typingTest, attempt),
      accuracy: getAccuracy(typingTest, attempt),
    }

    await saveTestResult(testResult)
  } finally {
    stopSyncing()
  }
}
