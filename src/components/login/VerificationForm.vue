<template>
  <div style="text-align: center">
    <h1 class="title-3">ورود با رمز یکبار مصرف</h1>
    <p class="body-2">کد ارسال شده به شماره همراه زیر را وارد کنید</p>
    <p class="body-1" style="margin-bottom: 2rem">{{ mobileNumber }}</p>
    <form class="form" @submit.prevent="submitVerificationCode">
      <div class="input-container">
        <label for="verification-code" class="body-2" style="text-align: right"
          >کد تایید</label
        >
        <input
          id="verification-code"
          class="input input-code"
          :class="{ error: error, success: success }"
          type="number"
          placeholder="******"
          autocomplete="off"
          @focus="changeInputStatus"
          v-model="verificationCode"
        />
      </div>
      <button class="button" type="submit">تایید کد ارسالی</button>
    </form>
  </div>
</template>

<script>
import rules from "@/utils/validationRules.js";
export default {
  props: {
    mobileNumber: {
      required: true,
    },
  },
  data() {
    return {
      error: false,
      success: false,
      verificationCode: "",
    };
  },
  methods: {
    submitVerificationCode() {
      if (rules.required(this.verificationCode)) {
        if (this.verificationCode == "123456") {
          this.success = true;
          console.log({
            mobileNumber: this.mobileNumber,
            verificationCode: this.verificationCode,
          });
          this.$cookies.set("mobileNumber", this.mobileNumber);
          this.$router.push({
            name: "home",
          });
        } else {
          this.error = true;
          this.$store.commit("global/SET_ERRORS", {
            type: "error",
            message: "کد تایید نادرست می باشد",
          });
        }
      } else {
        this.error = true;
      }
    },
    changeInputStatus() {
      this.error = false;
      this.success = false;
    },
  },
};
</script>

<style scoped>
.input-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.input-code {
  letter-spacing: 0.5rem;
}
</style>
