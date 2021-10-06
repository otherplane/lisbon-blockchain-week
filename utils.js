import { format, utcToZonedTime, toDate, zonedTimeToUtc } from 'date-fns-tz'
import { formatISO } from 'date-fns'

const timeZone = 'Europe/Lisbon'

function getLisbonDate(timestamp) {
  return utcToZonedTime(new Date(timestamp), timeZone)
}

function getUtcFromLisbonTime(timestamp) {
  return zonedTimeToUtc(timestamp, timeZone)
}

export function getTime(timestamp) {
  return format(getLisbonDate(timestamp), 'HH:mm', { timeZone })
}

export function getCalendarDate(timestamp) {
  return formatISO(getUtcFromLisbonTime(timestamp), { format: 'basic' })
}

export function getDate(timestamp) {
  return format(getLisbonDate(timestamp), 'dd-MM-yyyy', { timeZone })
}

export function getDay(timestamp) {
  return format(getLisbonDate(timestamp), 'dd', { timeZone })
}

export function getTimestampFromDateAndTime(date, time) {
  const [month, day, year] = date.split('/')
  const [hour, min] = convertTime12to24(time).split(':')
  const fullHour = hour.length === 2 ? hour : '0' + hour
  const fullYear = year.length === 2 ? '20' + year : year
  const dateString = `${fullYear}-${month}-${day}T${fullHour}:${min}:00+01:00`
  const lisbonDate = toDate(dateString)

  return lisbonDate.getTime()
}

export function convertTime12to24(time12h) {
  const [time, modifier] = time12h.split(' ')
  // eslint-disable-next-line
  let [hours, minutes] = time.split(':')

  if (hours === '12') {
    hours = '00'
  }

  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12
  }

  return `${hours}:${minutes}`
}
