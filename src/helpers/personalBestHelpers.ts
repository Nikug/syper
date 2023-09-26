import { produce } from 'solid-js/store'
import { getPersonalBests, insertPersonalBest, updatePersonalBest } from '../api/personalBests'
import { getUserId } from '../authentication/Supabase'
import { personalBests, setAttempt, setPersonalBests } from '../StateManager'
import { DatabasePersonalBest, DatabaseTestResult } from '../supabaseTypes'
import { PersonalBestCategory, UserOptions } from '../types'
import { PersonalBestCorrectnessLimit } from '../constants'
import { getDictionaryName } from '../assets/files'

export const setupPersonalBests = async (): Promise<void> => {
  const bests = await getPersonalBests()
  setPersonalBests(bests)
}

export const areSameTestCategory = (best1: PersonalBestCategory, best2: PersonalBestCategory) => {
  return (
    best1.textMode === best2.textMode &&
    best1.words == best2.words &&
    best1.duration == best2.duration &&
    best1.source === best2.source
  )
}

export const findPersonalBest = (
  category: PersonalBestCategory
): DatabasePersonalBest | undefined => {
  return personalBests.find((best) => areSameTestCategory(best, category))
}

export const findPersonalBestFromOptions = (
  options: UserOptions
): DatabasePersonalBest | undefined => {
  const category = {
    textMode: options.textMode,
    words: options.textMode === 'words' ? options.wordCount : undefined,
    duration: options.textMode === 'time' ? options.timeDuration : undefined,
    source: getDictionaryName(options.dictionary),
  }
  return personalBests.find((best) => areSameTestCategory(best, category))
}

export const handlePersonalBestUpdate = async (test: DatabaseTestResult): Promise<void> => {
  const userId = getUserId()
  if (!userId || test.textMode === 'quote') return

  const databaseInput = {
    userId: userId,
    date: new Date(),
    testId: test.id,
    textMode: test.textMode,
    source: test.source,
    words: test.textMode === 'words' ? test.words : undefined,
    duration: test.textMode === 'time' ? test.duration : undefined,
    wordsPerMinute: test.wordsPerMinute,
  }

  const currentBest = findPersonalBest(testToCategory(test))

  let newBestFromDatabase: DatabasePersonalBest | null = null

  if (!currentBest) {
    if (test.correctness < PersonalBestCorrectnessLimit) {
      setAttemptPersonalBest(true, false)
    } else {
      newBestFromDatabase = await insertPersonalBest(databaseInput)
    }
  } else if (currentBest.wordsPerMinute < test.wordsPerMinute) {
    if (test.correctness < PersonalBestCorrectnessLimit) {
      setAttemptPersonalBest(true, false)
    } else {
      newBestFromDatabase = await updatePersonalBest(currentBest.id, databaseInput)
    }
  }

  if (!newBestFromDatabase) return
  const newBest = newBestFromDatabase

  setPersonalBests(
    produce((bests) => {
      const existingBestIndex = bests.findIndex((best) => areSameTestCategory(best, newBest))
      if (existingBestIndex !== -1) {
        bests[existingBestIndex] = newBest
      } else {
        bests.push(newBest)
      }
      return bests
    })
  )

  setAttemptPersonalBest(true, true)
}

const setAttemptPersonalBest = (isPersonalBest: boolean, hasApprovedCorrectness: boolean) => {
  setAttempt(
    produce((attempt) => {
      attempt.personalBest.isPersonalBest = isPersonalBest
      attempt.personalBest.hasApprovedCorrectness = hasApprovedCorrectness
    })
  )
}

export const testToCategory = (test: DatabaseTestResult): PersonalBestCategory => {
  return {
    textMode: test.textMode,
    words: test.textMode === 'words' ? test.words : null,
    duration: test.textMode === 'time' ? test.duration : null,
    source: test.source,
  }
}
