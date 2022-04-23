<template>
  <div class="container main-container ticket-container">
    <div class="ticket">
      <div class="logo-container col-3 md-col-12">
        <img
          src="../assets/images/logo/volleyball-federation-logo.svg"
          alt="I.R.IRAN Volleyball Federation"
          class="logo"
        />
      </div>
      <div class="match-container col-6 md-col-12">
        <div class="match-competitors">
          <div class="centralized">
            <img
              :src="competitor1Flag"
              :alt="selectedMatch.competitors[0].name"
              class="flag"
            />
            <p class="title-2">{{ selectedMatch.competitors[0].nameFa }}</p>
          </div>
          <div>-</div>
          <div class="centralized">
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
      <div class="seat-container col-3 md-col-12">
        <div class="seat">
          <p class="title-3">جایگاه: {{ selectedStage.index + 1 }}</p>
          <div>
            <p class="body-1">ردیف: {{ selectedSeat.x }}</p>
            <p class="body-1">صندلی: {{ selectedSeat.y }}</p>
          </div>
        </div>
        <div class="barcode">
          <vue-barcode
            :value="ticket"
            :options="{ displayValue: false, height: 150 }"
            tag="svg"
          ></vue-barcode>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueBarcode from "@chenfengyuan/vue-barcode";
import { findFlagUrlByCountryName } from "country-flags-svg";
import moment from "jalali-moment";
export default {
  components: {
    VueBarcode,
  },
  data() {
    return {};
  },
  computed: {
    selectedMatch() {
      return this.$store.getters["booking/getSelectedMatch"];
    },
    selectedStage() {
      return this.$store.getters["booking/getSelectedStadiumMap"];
    },
    selectedSeat() {
      return this.$store.getters["booking/getSelectedSeat"];
    },
    ticket() {
      return this.$store.getters["booking/getTicket"];
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
  padding: 2.5rem 0;
  justify-content: center;
  align-items: center;
}

.ticket {
  position: relative;
  width: 90%;
  max-width: 1200px;
  height: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: var(--background-secondary);
}

.ticket:hover {
  background: #f2f2f2;
}

.ticket::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 12px;
  background: linear-gradient(-135deg, #fff 6px, transparent 0%),
    linear-gradient(135deg, #fff 6px, transparent 0%);
  background-size: 12px;
}

.ticket::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 12px;
  background: linear-gradient(-45deg, #fff 6px, transparent 0%),
    linear-gradient(45deg, #fff 6px, transparent 0%);

  background-size: 12px;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.logo {
  width: 15rem;
  height: 15rem;
}

.flag {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
}

.match-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  border-left: 2px dashed var(--info-alpha);
  border-right: 1px solid var(--info-alpha);
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
.seat-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.barcode > svg {
  width: 200px;
}

@media only screen and (max-width: 768px) {
  .ticket {
    flex-direction: column;
    height: auto;
  }

  .match-container {
    padding: 1rem 0;
    border: none;
    border-bottom: 2px dashed var(--info-alpha);
    border-top: 1px solid var(--info-alpha);
  }

  .seat-container {
    padding: 1rem 0;
  }
}

@media only screen and (max-width: 425px) {
  .ticket {
    width: 90%;
  }
}
</style>
