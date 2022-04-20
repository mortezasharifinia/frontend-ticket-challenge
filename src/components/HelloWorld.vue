<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>تست متن فارسی 123</h2>
    <form class="form">
      <input
        class="input"
        placeholder="شماره موبایل"
        type="text"
        name=""
        id=""
        required
      />
      <button class="button" type="submit">ورود</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
