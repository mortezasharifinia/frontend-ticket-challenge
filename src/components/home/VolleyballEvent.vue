<template>
  <div
    class="volleyball-event-container"
    @mouseenter.prevent="$emit('show-picture', match.status)"
    @mouseleave="$emit('hidden-picture')"
  >
    <button
      class="volleyball-event-button"
      :class="[match.status]"
      :disabled="match.status != 'now'"
      @click="bookingMatch"
    >
      <div class="col-3">
        <img
          :src="competitor1Flag"
          :alt="match.competitors[0].name"
          class="flag"
        />
        <p class="title-2">{{ match.competitors[0].nameFa }}</p>
      </div>
      <div class="col-6 volleyball-event-details">
        <template v-if="status">
          <div>
            <p class="title-3">
              {{ matchDate }}
            </p>
            <p class="body-1">{{ matchHour }}</p>
          </div>
          <div>
            <span class="status" :style="statusBackgroundColor">{{
              match.status
            }}</span>
          </div>
        </template>
        <template v-else>
          <div>
            <p class="title-2">{{ match.finalResult }}</p>
            <div class="results">
              <span
                v-for="(result, index) in match.results"
                :key="index"
                class="caption-1"
                >{{ result }}</span
              >
            </div>
          </div>
          <div>
            <p class="body-2">{{ matchDate }}</p>
            <p class="caption-1">{{ matchHour }}</p>
          </div>
          <div>
            <span class="status" :style="statusBackgroundColor">{{
              match.status
            }}</span>
          </div>
        </template>
      </div>
      <div class="col-3">
        <img
          :src="competitor2Flag"
          :alt="match.competitors[1].name"
          class="flag"
        />
        <p class="title-2">{{ match.competitors[1].nameFa }}</p>
      </div>
    </button>
  </div>
</template>

<script>
import { findFlagUrlByCountryName } from "country-flags-svg";
import moment from "jalali-moment";
export default {
  props: {
    match: {
      type: Object,
      required: true,
    },
  },
  computed: {
    competitor1Flag() {
      return findFlagUrlByCountryName(this.match.competitors[0].name);
    },
    competitor2Flag() {
      return findFlagUrlByCountryName(this.match.competitors[1].name);
    },
    status() {
      return this.match.status == "now" || this.match.status == "future";
    },
    matchDate() {
      return moment(this.match.date, "X")
        .locale("fa")
        .format("dddd، jDD jMMMM jYYYY");
    },
    matchHour() {
      return moment(this.match.date, "X").locale("fa").format("HH:mm");
    },
    statusBackgroundColor() {
      switch (this.match.status) {
        case "future":
          return { background: "var(--success)" };
        case "now":
          return { background: "var(--info)" };
        case "finished":
          return { background: "var(--danger)" };
        default:
          return { background: "var(--primary)" };
      }
    },
  },
  methods: {
    bookingMatch() {
      this.$store.dispatch("booking/selectMatch", this.match);
    },
  },
};
</script>

<style scoped>
.volleyball-event-container {
  width: 80%;
  margin: 0.5rem 0;
}
.volleyball-event-button {
  width: 100%;
  min-height: 11rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: var(--background-secondary);
  border: none;
  border-radius: 1rem;
  transition: 0.5s ease-in-out;
  cursor: pointer;
}

.volleyball-event-button:hover.now {
  background: var(--info-alpha);
}

.volleyball-event-button:active.now {
  transform: scale(0.98);
}

.volleyball-event-button:hover.future {
  background: var(--success-alpha);
}

.volleyball-event-button:hover.finished {
  background: var(--danger-alpha);
}

.volleyball-event-button:disabled {
  color: var(--sub-primary);
}

.results {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.results span {
  padding: 0.25rem 0.5rem;
  border: 1.5px solid var(--primary);
  border-radius: 0.5rem;
  text-align: center;
}

.flag {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  object-fit: cover;
}

.status {
  display: inline-block;
  width: 4rem;
  padding: 0.1rem 0.25rem;
  border-radius: 1rem;
  background: var(--info);
  font-size: 0.625rem;
  font-weight: 500;
  line-height: 1rem;
  text-align: center;
  color: var(--text-secondary);
}
</style>
