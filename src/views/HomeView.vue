<template>
  <div class="container main-container">
    <div class="col-6 image-container sm-hidden">
      <img
        src="../assets/images/logo/volleyball-federation-logo.svg"
        alt="I.R.IRAN Volleyball Federation"
        class="logo"
      />
      <img
        :src="matchPicture"
        class="picture"
        :style="{ width: matchPictureState ? '100%' : '0' }"
      />
    </div>
    <div class="col-6 sm-col-12 event-container">
      <volleyball-event
        v-for="match in matches"
        :key="match.id"
        :match="match"
        @show-picture="showMatchPicture"
        @hidden-picture="hiddenMatchPicture"
      ></volleyball-event>
    </div>
  </div>
</template>

<script>
import { matches } from "@/utils/fakeData";
import VolleyballEvent from "@/components/home/VolleyballEvent.vue";
export default {
  components: {
    VolleyballEvent,
  },
  data() {
    return {
      matches: matches,
      matchStatus: "now",
      matchPictureState: false,
    };
  },
  computed: {
    matchPicture() {
      switch (this.matchStatus) {
        case "future":
          return require("@/assets/images/matches/volleyball-court-future.jpeg");
        case "now":
          return require("@/assets/images/matches/volleyball-court-now.jpeg");
        case "finished":
          return require("@/assets/images/matches/volleyball-court-finished.jpeg");
        default:
          return require("@/assets/images/matches/volleyball-court-now.jpeg");
      }
    },
  },
  methods: {
    showMatchPicture(status) {
      this.matchStatus = status;
      this.matchPictureState = true;
    },
    hiddenMatchPicture() {
      this.matchPictureState = false;
    },
  },
};
</script>

<style scoped>
.image-container {
  position: relative;
  background: var(--background-secondary);
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
}

.logo {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
}

.picture {
  position: absolute;
  right: 0;
  width: 0;
  height: 100%;
  z-index: 100;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  transition: 0.5s ease-in-out;
}

.event-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 768px) {
}

@media only screen and (max-width: 425px) {
}
</style>
