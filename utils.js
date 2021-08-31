import { format } from 'date-fns'

export function getTime(timestamp) {
  return format(new Date(timestamp), 'HH:mm')
}
