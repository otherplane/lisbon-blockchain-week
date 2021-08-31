import Papa from 'papaparse'
import { getTime } from './utils'

export function fetchEvents(fileUrl) {
  return new Promise((resolve, reject) => {
    Papa.parse(fileUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      trimHeaders: true,
      transformHeader: (h) => h.trim(),
      complete(results) {
        if (results.data) {
          return resolve(
            results.data.map(normalizeEvent).filter((event) => event)
          )
        } else {
          return reject(results.errors)
        }
      },
    })
  })
}

function normalizeEvent(rawEvent) {
  if (rawEvent['Title of your event']) {
    const startTimestamp = getTimestampFromDateAndTime(
      rawEvent['Event date'],
      rawEvent['Starting time']
    )
    const endTimestamp = getTimestampFromDateAndTime(
      rawEvent['Event date'],
      rawEvent['End time']
    )
    return {
      id: `${rawEvent['Title of your event']} ${startTimestamp}`,
      sponsors: rawEvent['Sponsor(s)'],
      speakers: rawEvent['Speaker(s)'],
      eventType: rawEvent['Event type'],
      title: rawEvent['Title of your event'],
      description: rawEvent['Long description of your event'],
      startTimestamp,
      endTimestamp,
      venue: rawEvent.Venue,
      address: rawEvent.Address,
      image: rawEvent.Image,
      registrationUrl: rawEvent['Registration Url'],
      startTime: getTime(startTimestamp),
      endTime: getTime(endTimestamp),
      categories: rawEvent['Event type']
        .split(',')
        .map((category) => category.trim()),
    }
  } else {
    return null
  }
}

function getTimestampFromDateAndTime(date, time) {
  return new Date(`${date} ${time}`).getTime()
}
