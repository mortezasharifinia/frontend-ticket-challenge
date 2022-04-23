<template>
  <div class="container main-container ticket-container">
    <div class="ticket">
      <div class="logo-container col-3">
        <img
          src="../assets/images/logo/volleyball-federation-logo.svg"
          alt="I.R.IRAN Volleyball Federation"
          class="logo"
        />
      </div>
      <div class="match-container col-6">
        <div class="match-competitors">
          <div>
            <img
              :src="competitor1Flag"
              :alt="selectedMatch.competitors[0].name"
              class="flag"
            />
            <p class="title-2">{{ selectedMatch.competitors[0].nameFa }}</p>
          </div>
          <div>-</div>
          <div>
            <img
              :src="competitor2Flag"
              :alt="selectedMatch.competitors[1].name"
              class="flag"
            />
            <p class="title-2">{{ selectedMatch.competitors[1].nameFa }}</p>
          </div>
        </div>
        <div class="match-details">
          <p class="title-3">
            {{ matchDate }}
          </p>
          <p class="body-1">{{ matchHour }}</p>
          <p class="body-1">{{ selectedMatch.location }}</p>
        </div>
      </div>
      <div class="col-3">
        <div class="seat-container">
          <p class="title-3">جایگاه: {{ selectedStage.index + 1 }}</p>
          <div>
            <p class="body-1">ردیف: {{ selectedSeat.x }}</p>
            <p class="body-1">صندلی: {{ selectedSeat.y }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findFlagUrlByCountryName } from "country-flags-svg";
import moment from "jalali-moment";
export default {
  data() {
    return {
      matchTest: {
        id: "3988646623df45eaac389612474c181d",
        competitors: [
          {
            name: "Argentina",
            nameFa: "آرژانتین",
          },
          {
            name: "Netherlands",
            nameFa: "هلند",
          },
        ],
        date: "1651249800",
        location: "سالن ۱۲ هزار نفری آزادی",
        status: "now",
        finalResult: null,
        results: null,
      },
      stateTest: {
        id: "546789123dwsxxrf",
        status: "avaliabile",
        index: 5,
      },
      seatTest: {
        x: "129",
        y: "1643",
      },
    };
  },
  computed: {
    selectedMatch() {
      return this.$store.getters["booking/getSelectedMatch"] || this.matchTest;
    },
    selectedStage() {
      return (
        this.$store.getters["booking/getSelectedStadiumMap"] || this.stateTest
      );
    },
    selectedSeat() {
      return this.$store.getters["booking/getSelectedSeat"] || this.seatTest;
    },
    competitor1Flag() {
      return findFlagUrlByCountryName(this.selectedMatch.competitors[0].name);
    },
    competitor2Flag() {
      return findFlagUrlByCountryName(this.selectedMatch.competitors[1].name);
    },
    matchDate() {
      return moment(this.selectedMatch.date, "X")
        .locale("fa")
        .format("dddd، jDD jMMMM jYYYY");
    },
    matchHour() {
      return moment(this.selectedMatch.date, "X").locale("fa").format("HH:mm");
    },
  },
};
</script>

<style scoped>
.ticket-container {
  justify-content: center;
  align-items: center;
}

.ticket {
  width: 75%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: var(--background-secondary);
}

.logo {
  width: 100%;
  height: 100%;
}

.flag {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
}

.match-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
}

.match-competitors {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.match-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
