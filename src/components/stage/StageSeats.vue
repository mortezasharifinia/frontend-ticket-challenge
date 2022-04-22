<template>
  <div class="selected-row">
    <button
      class="seat"
      :class="{ selected: selectedSeat === index }"
      v-for="(seat, index) in rowSeats"
      :key="index"
      @click="selectSeat(index)"
      :disabled="!!seat"
    >
      <span class="title-3">{{ index + 1 }}</span>
    </button>
  </div>
  <!-- <recycle-scroller
    class="selected-row"
    :items="rowSeats"
    key-field="id"
    v-slot="{ item, index }"
  >
    <button
      class="row"
      :class="{ selected: selectedRow === index }"
      @click="selectSeatsRow(index)"
      :disabled="item.state"
    >
      <span class="title-3">راهرو {{ index + 1 }}</span>
    </button>
  </recycle-scroller> -->
</template>

<script>
// import { RecycleScroller } from "vue-virtual-scroller";
// import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
export default {
  components: {
    // RecycleScroller,
  },
  props: {
    rowSeats: {
      type: Array,
    },
  },
  data() {
    return {
      selectedSeat: "",
    };
  },
  methods: {
    selectSeat(seat) {
      console.log(seat);
      this.selectedSeat = seat;
      this.$emit("select-seat", seat);
    },
  },
};
</script>

<style scoped>
.selected-row {
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0.5rem;
  margin: 0.5rem;
  border: 2px solid var(--danger);
  border-radius: 1rem;
}
.seat {
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
  background-image: url("../../assets/images/icons/stadium-chairs.png");
  background-size: 10rem 10rem;
  background-repeat: no-repeat;
  background-position: top;
  margin: 2.5px;
  border: none;
  border-radius: 1rem;
  color: var(--sub-secondary);
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 2rem;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}

.seat:hover {
  background: var(--secondary);
}

.seat:active {
  transform: scale(0.98);
}

.seat:disabled {
  cursor: not-allowed;
  background-color: var(--danger);
  color: var(----sub-primary);
}

.seat.selected {
  background-color: var(--info);
}
</style>
