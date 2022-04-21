<template>
  <div class="container main-container login-container">
    <div class="col-6 sm-col-12 form-container">
      <mobile-form
        v-if="!next"
        @submit-mobileNumber="submitMobileNumberForm"
      ></mobile-form>
      <verification-form
        v-else
        :mobileNumber="submittedMobileNumber"
      ></verification-form>
    </div>
    <div class="col-6 logo-container sm-hidden">
      <img
        src="../assets/images/logo/volleyball-federation-logo.svg"
        alt="I.R.IRAN Volleyball Federation"
        class="logo"
      />
    </div>
  </div>
</template>

<script>
import MobileForm from "@/components/login/MobileForm.vue";
import VerificationForm from "@/components/login/VerificationForm.vue";
export default {
  components: {
    MobileForm,
    VerificationForm,
  },
  data() {
    return {
      next: false,
      submittedMobileNumber: "",
    };
  },
  methods: {
    submitMobileNumberForm(number) {
      this.submittedMobileNumber = number;
      this.next = true;
    },
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-container div {
  width: 45%;
  max-width: 350px;
}

.logo-container {
  position: relative;
  background: var(--background-secondary);
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.logo {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

@media only screen and (max-width: 768px) {
  .form-container div {
    width: 65%;
  }
}

@media only screen and (max-width: 425px) {
  .form-container div {
    width: 75%;
  }
}
</style>
