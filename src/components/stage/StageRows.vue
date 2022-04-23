<template>
  <div class="selected-stage">
    <button
      class="row"
      :class="{ selected: selectedRow === index }"
      v-for="(row, index) in stageRows"
      :key="index"
      @click="selectSeatsRow(index)"
    >
      <span class="title-3">راهرو {{ index + 1 }}</span>
    </button>
  </div>

  <!-- <recycle-scroller
    class="selected-stage"
    :items="stageRows"
    itemSize="32"
    key-field="id"
    v-slot="{ index }"
  >
    <button
      class="row"
      :class="{ selected: selectedRow === index }"
      @click="selectSeatsRow(index)"
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
    stageRows: {
      type: Array,
    },
  },
  data() {
    return {
      selectedRow: "",
    };
  },
  methods: {
    selectSeatsRow(row) {
      this.selectedRow = row;
      this.$emit("select-row", row);
    },
  },
};
</script>

<style scoped>
.selected-stage {
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

.row {
  width: 23%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--primary);
  background-image: url("../../assets/images/icons/stadium-chairs.png");
  background-size: 3.3rem 3.3rem;
  background-repeat: repeat;
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

.row:hover {
  background: var(--secondary);
}

.row:active {
  transform: scale(0.98);
}

.row.selected {
  background: var(--info);
}
</style>
