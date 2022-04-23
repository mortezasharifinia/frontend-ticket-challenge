<template>
  <div class="not-found-container">
    <img
      src="../assets/images/logo/volleyball-federation-logo.svg"
      alt="I.R.IRAN Volleyball Federation"
      class="logo"
    />
    <h1 class="title-1">404</h1>
    <h3 class="title-2">دنبال چی می گردی؟ اینجا نیست</h3>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--background-secondary);
}

.not-found-container h1,
.not-found-container h3 {
  color: var(--secondary);
}

.logo {
  width: 75%;
  max-width: 500px;
}
</style>
