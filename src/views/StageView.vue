<template>
  <div class="container main-container selected-stage-container">
    <stage-rows
      v-if="StageDisplayStatus"
      :stageRows="stageSeats"
      @select-row="rowSelected"
    ></stage-rows>
    <stage-seats
      v-else
      :rowSeats="stageSeatsByRow"
      @select-seat="seatSelected"
    ></stage-seats>
  </div>
</template>

<script>
import StageRows from "@/components/stage/StageRows.vue";
import StageSeats from "@/components/stage/StageSeats.vue";
export default {
  components: {
    StageRows,
    StageSeats,
  },
  data() {
    return {
      StageDisplayStatus: true,
      selectedRow: "",
      selectedSeat: "",
    };
  },
  computed: {
    stageSeatRowNumber() {
      return this.$store.getters["booking/getStageSeatsRowsNumber"];
    },
    stageSeats() {
      return this.$store.getters["booking/getStageSeats"] || [];
    },
    stageSeatsByRow() {
      return this.stageSeats[this.selectedRow] || [];
    },
  },
  methods: {
    rowSelected(row) {
      this.selectedRow = row;
      this.StageDisplayStatus = false;
    },
    seatSelected(seat) {
      this.selectedSeat = seat;
      this.$store.dispatch("booking/bookTicket", {
        x: this.selectedRow,
        y: seat,
      });
    },
  },
};
</script>

<style scoped>
.selected-stage-container {
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
