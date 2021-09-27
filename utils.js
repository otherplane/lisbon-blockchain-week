import { format, utcToZonedTime } from 'date-fns-tz'

const timeZone = 'Europe/Lisbon'

function getLisbonDate(timestamp) {
  return utcToZonedTime(new Date(timestamp), timeZone)
}

export function getTime(timestamp) {
  return format(getLisbonDate(timestamp), 'HH:mm', { timeZone })
}

export function getDate(timestamp) {
  return format(getLisbonDate(timestamp), 'dd-MM-yyyy', { timeZone })
}

export function getDay(timestamp) {
  return format(getLisbonDate(timestamp), 'dd', { timeZone })
}
