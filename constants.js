export const SUBMIT_EVENT_URL =
  process.env.SUBMIT_EVENT_URL ||
  'https://docs.google.com/forms/d/e/1FAIpQLSe1ZK-NHycf2ZX4R6DUbKklErE2KyEBnAmsED8BtwBt9XMing/viewform'
export const EVENTS_URL =
  process.env.EVENTS_URL ||
  'https://raw.githubusercontent.com/otherplane/liscon-week/main/events.csv'

export const DEFAULT_BACKGROUND_IMAGE = process.env.DEFAULT_BACKGROUND_IMAGE

export const languages = [
  {
    name: 'English',
    code: 'en',
    iso: 'en-US',
    isCatchallLocale: true,
  },
  {
    name: 'Português',
    code: 'pt',
    iso: 'pt-PT',
  },
]

export const EVENT_CATEGORIES = [
  { label: 'All' },
  { label: 'Favorites' },
  { label: 'Events' },
  { label: 'Hackathons' },
  { label: 'Workshops' },
  { label: 'Drinks' },
]

export const WEEK = {
  18: {
    key: '18',
    timestamp: 1634515200000,
    name: 'Mon',
  },
  19: {
    key: '19',
    timestamp: 1634601600000,
    name: 'Tue',
  },
  20: {
    key: '20',
    timestamp: 1634688000000,
    name: 'Wed',
  },
  21: {
    key: '21',
    timestamp: 1634774400000,
    name: 'Thur',
  },
  22: {
    key: '22',
    timestamp: 1634860800000,
    name: 'Fri',
  },
  23: {
    key: '23',
    timestamp: 1634947200000,
    name: 'Sat',
  },
  24: {
    key: '24',
    timestamp: 1635033600000,
    name: 'Sun',
  },
}
