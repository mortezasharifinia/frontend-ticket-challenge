<template>
  <div class="stadium">
    <div
      v-for="(map, index) in stadiumMaps"
      :key="map.id"
      class="stage"
      :class="`stage-${index + 1}`"
      @click="$emit('selected-stage', map)"
    >
      {{ index + 1 }}
    </div>
    <!-- <div class="stage stage-2">2</div>
    <div class="stage stage-3">3</div>
    <div class="stage stage-4">4</div>
    <div class="stage stage-5">5</div>
    <div class="stage stage-6">6</div>
    <div class="stage stage-7">7</div>
    <div class="stage stage-8">8</div>
    <div class="stage stage-9">9</div>
    <div class="stage stage-10">10</div> -->
    <div class="volleyball-court">
      <div class="volleyball-net"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    stadiumMaps: {
      type: Array,
    },
  },
};
</script>

<style scoped>
.stadium {
  position: relative;
  width: 800px;
  height: 400px;
  background-color: var(--primary);
  border: 30px solid var(--info);
  border-radius: 75px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}

.stage {
  position: absolute;
  background-color: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.5s;
}

.stage:hover {
  background-color: var(--secondary);
  border: 3px solid var(--warning);
}

.stage:active {
  background-color: var(--warning);
  border: 3px solid var(--secondary);
}

.stage-1 {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 98%;
  height: 14.5%;
  clip-path: polygon(0 0, 100% 0, 85% 100%, 15% 100%);
}

.stage-3 {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 98%;
  height: 14.5%;
  clip-path: polygon(15% 0, 85% 0, 100% 100%, 0 100%);
}

.stage-4 {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 14.5%;
  height: 98%;
  clip-path: polygon(0 0, 100% 15%, 100% 85%, 0 100%);
}

.stage-2 {
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 14.5%;
  height: 98%;
  clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 85%);
}

.stage-5 {
  top: 16%;
  left: 50.5%;
  width: 34%;
  height: 12.5%;
  clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
}

.stage-10 {
  top: 16%;
  right: 50.5%;
  width: 34%;
  height: 12.5%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 15% 100%);
}

.stage-6 {
  top: 50%;
  right: 15.5%;
  transform: translateY(-50%);
  width: 5%;
  height: 64%;
  clip-path: polygon(0 20%, 100% 0, 100% 100%, 0 80%);
}

.stage-7 {
  bottom: 16%;
  left: 50.5%;
  width: 34%;
  height: 12.5%;
  clip-path: polygon(0 0, 85% 0, 100% 100%, 0 100%);
}

.stage-8 {
  bottom: 16%;
  right: 50.5%;
  width: 34%;
  height: 12.5%;
  clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%);
}

.stage-9 {
  top: 50%;
  left: 15.5%;
  transform: translateY(-50%);
  width: 5%;
  height: 64%;
  clip-path: polygon(0 0, 100% 20%, 100% 80%, 0 100%);
}

.volleyball-court {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25%;
  height: 20%;
  background: var(--danger);
  border: 2px solid #fff;
}

.volleyball-court::before {
  content: "";
  position: absolute;
  left: 35%;
  width: 2px;
  height: 100%;
  background: #fff;
}

.volleyball-court::after {
  content: "";
  position: absolute;
  right: 35%;
  width: 2px;
  height: 100%;
  background: #fff;
}

.volleyball-net {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 140%;
  background: #fff;
}

.volleyball-net::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  background: var(--info);
  border-radius: 50%;
}

.volleyball-net::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  background: var(--info);
  border-radius: 50%;
}

@media only screen and (max-width: 768px) {
  .stadium {
    width: 700px;
    height: 350px;
  }
}

@media only screen and (max-width: 425px) {
  .stadium {
    width: 600px;
    height: 300px;
    transform: rotate(90deg);
  }
}
</style>
