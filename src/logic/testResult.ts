import { saveTestResult } from '../api/testResults'
import { getUserId } from '../authentication/Authentication'
import { startSyncing, stopSyncing } from '../SyncingManager'
import { Attempt, DatabaseTestResultInput, TextMode, TypingTest } from '../types'
import { numberOfMatchingItems, wordsPerMinute } from '../util'

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
      quoteId: textMode === 'quote' ? typingTest.id.toString() : undefined,
      source: typingTest.source,
      characters: typingTest.length,
      words: typingTest.words.length,
      duration: duration,
      wordsPerMinute: wordsPerMinute(typingTest.length, duration) ?? 0,
      correctness: numberOfMatchingItems(typingTest.text, attempt.finalText) / typingTest.length,
      accuracy: numberOfMatchingItems(typingTest.text, attempt.finalText) / attempt.allText.length,
    }

    await saveTestResult(testResult)
  } finally {
    stopSyncing()
  }
}
