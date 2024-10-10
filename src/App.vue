<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import "the-new-css-reset/css/reset.css";
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap");

body {
  font-family: "JetBrains Mono", monospace;
  font-size: 18px;
  font-style: normal;
  background-color: $dark-gray;
  color: $text-color;
  min-height: 100vh;
  transition: color 0.5s, background-color 0.5s;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: $text-color;
}

button {
  cursor: pointer;
  min-width: 100%;
  min-height: 50px;
  text-align: center;
  transition: 0.2s all;

  @media only screen and (min-width: 600px) {
    min-width: 180px;
  }
}
</style>
