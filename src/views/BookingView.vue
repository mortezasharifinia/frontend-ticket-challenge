<template>
  <div class="container main-container booking-container">
    <stadium-plan></stadium-plan>
  </div>
</template>

<script>
import StadiumPlan from "@/components/booking/StadiumPlan.vue";
export default {
  components: {
    StadiumPlan,
  },
};
</script>

<style scoped>
.booking-container {
  justify-content: center;
  align-items: center;
}
</style>
