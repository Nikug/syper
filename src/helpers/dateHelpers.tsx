import { format } from 'date-fns'

export const toDateTimeString = (date: Date) => format(date, 'dd.MM.yyyy HH:mm')
