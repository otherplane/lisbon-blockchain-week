<template>
  <FrameOutside @click="closeModal" @focus="closeModal">
    <div tabindex="0" class="modal" @keydown.esc="close">
      <div class="close-btn" @click="closeModal">
        <SvgIcon name="cross" />
      </div>
      <div class="main">
        <div
          class="header"
          :style="{
            background: `linear-gradient(rgb(240 234 229 / 60%), rgba(240 234 229)), url(${backgroundUrl})`,
            backgroundPosition: `50% 40%`,
            backgroundSize: `cover`,
          }"
        >
          <p class="time">{{ event.startTime }} - {{ event.endTime }}</p>
          <h2>
            {{ event.title }}
          </h2>
        </div>
        <div class="content">
          <h3 class="subtitle">Description</h3>
          <p v-for="paragraph in paragraphs" :key="paragraph" class="text">
            {{ paragraph }}
          </p>

          <h3 class="subtitle">Speakers</h3>
          <p v-for="speaker in speakers" :key="speaker" class="text">
            {{ speaker }}
          </p>
          <div v-if="sponsors.length">
            <h3 class="subtitle">Sponsors</h3>
            <p v-for="sponsor in sponsors" :key="sponsor" class="text">
              {{ sponsor }}
            </p>
          </div>
          <h3 v-if="event.venue || event.address" class="subtitle">Location</h3>
          <p class="text">
            {{ event.venue }}
            <a
              class="address"
              :href="`https://www.google.com/maps/dir/?api=1&destination=${event.address}`"
              target="_blank"
            >
              {{ event.address }}
            </a>
          </p>
          <a
            class="calendar-btn text"
            :href="`https://www.google.com/calendar/render?action=TEMPLATE&text=${event.title}&location=${event.address}&dates=${calendarStartDate}%2F${calendarEndDate}`"
            target="_blank"
            >Add event to Google Calendar</a
          >
          <h3 v-if="Array.isArray(event.url)" class="subtitle">Event urls</h3>
          <p v-if="event.urlNote" class="text">{{ event.urlNote }}</p>
          <a
            v-if="event.url && !Array.isArray(event.url)"
            class="register-btn text"
            :href="event.url"
            target="_blank"
            >Event Url</a
          >
          <div v-else>
            <a
              v-for="url in event.url"
              :key="url.label"
              class="register-btn text"
              :href="url.link"
              target="_blank"
              >{{ url.label }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </FrameOutside>
</template>

<script>
import { getCalendarDate } from '../utils'
import { DEFAULT_BACKGROUND_IMAGE } from '~/constants'

export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  computed: {
    calendarStartDate() {
      return this.getCalendarDate(this.event.startTimestamp)
    },
    calendarEndDate() {
      return this.getCalendarDate(this.event.endTimestamp)
    },
    backgroundUrl() {
      return (
        this.event.image ||
        DEFAULT_BACKGROUND_IMAGE ||
        require(`@/assets/default_background.jpg`)
      )
    },
    paragraphs() {
      return this.event.description
        .split(/<br>|\n/)
        .map((x) => x.trim())
        .filter((x) => !!x)
    },
    speakers() {
      return this.event.speakers
        .split(/<br>|\n/)
        .map((x) => x.trim())
        .filter((x) => !!x)
    },
    sponsors() {
      return this.event.sponsors
        .split(/<br>|\n/)
        .map((x) => x.trim())
        .filter((x) => !!x)
    },
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    getCalendarDate,
  },
}
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: $beige;
  border: 2px solid $blue;
  color: $black;
  min-width: 400px;
  grid-gap: 24px;
  .main {
    max-height: 70vh;
    overflow-y: auto;
    overflow-x: hidden;
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  }
  .main::-webkit-scrollbar {
    display: none;
  }

  .close-btn {
    position: fixed;
    cursor: pointer;
    top: -2px;
    right: -2px;
  }
  .header {
    font-size: 16px;
    padding: 32px;
    font-family: 'SourceCode-Semibold', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    .time {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 16px;
    }
  }
  .content {
    padding: 0 32px 32px 32px;

    .subtitle {
      margin-bottom: 8px;
    }

    .text {
      line-height: 1.5;
      margin-bottom: 16px;
    }
    .address {
      color: $black;
      display: flex;
      flex-direction: column;
    }
    .calendar-btn {
      color: $blue;
      text-decoration: underline;
      cursor: pointer;
      display: block;
    }
    .register-btn {
      color: $blue;
      font-size: 20px;
      text-decoration: underline;
      cursor: pointer;
      display: block;
    }
  }
}
@media (max-width: 780px) {
  .modal {
    min-width: 0;
    .main {
      width: 95vw;
      height: 85vh;
      max-height: 100vh;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}
</style>
