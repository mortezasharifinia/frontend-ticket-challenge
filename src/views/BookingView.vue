<template>
  <div class="container main-container booking-container">
    <stadium-plan
      :stadiumMaps="stadiumMaps"
      @selected-stage="getSeatsOfStage"
    ></stadium-plan>
  </div>
</template>

<script>
import StadiumPlan from "@/components/booking/StadiumPlan.vue";
export default {
  components: {
    StadiumPlan,
  },
  computed: {
    stadiumMaps() {
      return this.$store.getters["booking/getStadiumMaps"];
    },
  },
  methods: {
    getSeatsOfStage(map) {
      const matchId = this.$route.params.matchId;
      this.$store.dispatch("booking/getStadiumSeats", { map, matchId });
    },
  },
};
</script>

<style scoped>
.booking-container {
  justify-content: center;
  align-items: center;
}
</style>
