<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view />
    <vue-loading
      :active="isLoading"
      background-color="#f7f8fa"
      :lock-scroll="true"
    >
      <div class="loader-container">
        <img
          src="./assets/images/logo/volleyball-federation-logo.svg"
          alt="I.R.IRAN Volleyball Federation"
          class="loader"
        />
      </div>
    </vue-loading>
    <vue-snackbar
      ref="snackbar"
      baseSize="200px"
      :wrapClass="''"
      :colors="snackbarColors"
      position="bottom-center"
      :holdTime="5000"
      :multiple="true"
    ></vue-snackbar>
  </div>
</template>

<script>
import VueLoading from "vue-loading-overlay";
import VueSnackbar from "vuejs-snackbar";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: {
    VueLoading,
    VueSnackbar,
  },
  data() {
    return {
      snackbarColors: {
        open: "#56C5D0",
        info: "#1974FC",
        error: "#FF7D49",
        warn: "#EFD10B",
      },
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters["global/getLoading"];
    },
    errors() {
      return this.$store.getters["global/getErrors"];
    },
  },
  watch: {
    errors(errors) {
      switch (errors.type) {
        case "error":
          this.$refs.snackbar.error(errors.message);
          break;
        case "warn":
          this.$refs.snackbar.warn(errors.message);
          break;
        default:
          this.$refs.snackbar.info(errors.message);
          break;
      }
    },
  },
};
</script>

<style scoped>
.loader-container {
  width: 15rem;
  height: 15rem;
}

.loader {
  width: 100%;
  height: 100%;
  transition: 0.5s ease-in-out;
  animation: loaderAnimation 3s infinite;
}

@keyframes loaderAnimation {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.9);
  }
}
</style>
