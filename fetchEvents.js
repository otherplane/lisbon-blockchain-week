import Papa from 'papaparse'
import { getTimestampFromDateAndTime, convertTime12to24 } from './utils'

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
      url: parseUrls(rawEvent['Event URL']),
      urlNote: rawEvent['Url note'],
      startTime: convertTime12to24(rawEvent['Starting time']),
      endTime: convertTime12to24(rawEvent['End time']),
      categories: rawEvent['Event type']
        .split(',')
        .map((category) => category.trim()),
    }
  } else {
    return null
  }
}

function parseUrls(url) {
  if (url.includes(',')) {
    const urls = url.split(',')

    return urls.map((link) => {
      if (link.includes('##')) {
        return {
          label: link.split('##')[0],
          link: link.split('##')[1],
        }
      } else {
        return {
          label: 'Link 1',
          link,
        }
      }
    })
  } else {
    return url
  }
}
