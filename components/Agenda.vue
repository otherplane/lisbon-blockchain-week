<template>
  <div class="agenda">
    <div class="day-switch">
      <div
        v-for="day in Object.keys(days2)"
        :key="day"
        class="day"
        :class="{ current: currentDay === day }"
        @click="currentDay = day"
      >
        {{ day }}
      </div>
    </div>
    <div v-if="filteredEvents.length" class="events-list">
      <div
        v-for="event in filteredEvents"
        :key="event.title"
        class="row"
        :class="{ current: event.current }"
      >
        <p class="col">{{ `${getTime(event.from)}-${getTime(event.to)}` }}</p>
        <p class="col">{{ event.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'

export default {
  data() {
    return {
      days2: {
        23: 1629723224000,
        24: 1629809624000,
        25: 1629896024000,
        26: 1629982424000,
        27: 1630068824000,
        28: 1630155224000,
        29: 1630241624000,
      },
      days: [
        { timestamp: 1629723224000, value: '23' },
        { timestamp: 1629809624000, value: '24' },
        { timestamp: 1629896024000, value: '25' },
        { timestamp: 1629982424000, value: '26' },
        { timestamp: 1630068824000, value: '27' },
        { timestamp: 1630155224000, value: '28' },
        { timestamp: 1630241624000, value: '29' },
      ],
      filteredEvents: [],
      currentDay: 23,
      events: [
        {
          title: 'Event day 1',
          description: '',
          current: false,
          favorite: false,
          location: '',
          organizers: '',
          categogy: '',
          from: new Date().getTime(),
          to: new Date().getTime() + 80000,
        },
      ],
    }
  },
  computed: {
    defaultDay() {
      return format(new Date(1634544000000), 'dd-MM-yyyy')
    },
  },
  watch: {
    currentDay() {
      this.filterEvents()
    },
  },
  mounted() {
    this.setCurrentEvent()
    this.filterEvents()
  },
  methods: {
    getTime(timestamp) {
      return format(new Date(timestamp), `HH:mm 'm'`)
    },
    getDate(timestamp) {
      console.log(timestamp)
      return format(new Date(timestamp), 'dd-MM-yyyy')
    },
    getDay(timestamp) {
      return format(new Date(timestamp), 'dd')
    },
    setCurrentEvent() {
      this.events.map((event) => {
        if (
          event.from < new Date().getTime() &&
          event.to > new Date().getTime()
        ) {
          console.log('0', event.from)
          this.currentDay = this.getDay(event.from)
          console.log('1', this.getDate(event.from))
          event.current = true
        } else {
          event.current = false
        }
        return event
      })
    },
    filterEvents() {
      this.filteredEvents = this.events.filter((event) => {
        console.log('2', event.from)
        console.log('3', this.days2[this.currentDay])
        return (
          this.getDate(event.from) === this.getDate(this.days2[this.currentDay])
        )
      })
    },
  },
}
</script>

<style scoped lang="scss">
.agenda {
  min-height: 100vh;
}
.current {
  color: red;
}
.day-switch {
  display: flex;
}
.row {
  display: flex;
}
.col {
  margin: 16px;
}
.day {
  margin: 16px;
  font-size: 24px;
  cursor: pointer;
}
</style>
