<template>
  <div style="text-align: center">
    <h1 class="title-3">ورود به سامانه فروش بلیط</h1>
    <p class="body-2" style="margin-bottom: 2rem">
      لطفا شماره تلفن همراه خود را وارد کنید
    </p>
    <form class="form" @submit.prevent="submitMobileNumber">
      <div class="input-container">
        <label for="mobile-number" class="body-2" style="text-align: right"
          >شماره تلفن همراه</label
        >
        <input
          id="mobile-number"
          class="input"
          :class="{ error: error, success: success }"
          type="tel"
          placeholder="09"
          maxlength="11"
          autocomplete="off"
          @focus="changeInputStatus"
          v-model="mobileNumber"
        />
      </div>
      <button class="button" type="submit">تایید شماره تلفن همراه</button>
    </form>
  </div>
</template>

<script>
import rules from "@/utils/validationRules.js";
export default {
  data() {
    return {
      error: false,
      success: false,
      mobileNumber: "",
    };
  },
  methods: {
    submitMobileNumber() {
      if (rules.mobile(this.mobileNumber)) {
        this.success = true;
        console.log({
          mobileNumber: this.mobileNumber,
        });
        this.$emit("submit-mobileNumber", this.mobileNumber);
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
</style>
