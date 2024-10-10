<template>
  <div ref="instructionsContainer" class="instructions">
    <div class="blocker" :onClick="close"></div>
    <div class="wrapper">
      <span class="close" :onClick="close">Close</span>
      <div class="content">
        {{ props.instructions }}
      </div>
    </div>
  </div>
  <button :onclick="show">Instructions</button>
</template>

<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from "vue";

const props = defineProps({
  instructions: {
    type: String,
    required: true,
  },
});
const instructionsContainer = ref(null);

function show() {
  instructionsContainer.value.style.display = "block";
}

function close() {
  instructionsContainer.value.style.display = "none";
}

function escapeHandler(e) {
  if (e.key === "Escape") {
    close();
  }
}

onBeforeMount(() => {
  document.addEventListener("keydown", escapeHandler);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", escapeHandler);
});
</script>

<style lang="scss" scoped>
.instructions {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */

  .blocker {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    content: " ";
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4);
  }

  .wrapper {
    background-color: $bv-light-bg;
    color: $bv-text-color-dark;
    margin: 3% auto; /* 15% from the top and centered */
    width: 60%; /* Could be more or less, depending on screen size */
    position: relative;
    display: flex;
    flex-direction: column;
    .content {
      white-space: pre-line;
      font-weight: 700;
      font-size: 18px;
      line-height: 30px;
      margin: 20px 150px 65px;
    }

    /* The Close Button */
    .close {
      align-self: end;
      color: $bv-text-color-dark;
      cursor: pointer;
      font-weight: 700;
      font-size: 20px;
      line-height: 26px;
      margin-top: 35px;
      margin-right: 55px;
      padding: 10px 15px;

      &:hover,
      &:focus {
        background-color: rgba(30, 30, 30, 0.1);
        text-decoration: underline;
      }

      &:active {
        background-color: $bv-text-color-dark;
        color: $bv-citrine-white;
      }
    }
  }
}

button {
  background-color: $bv-blue;
  color: $bv-green;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  border: 2px solid $bv-blue;

  &:hover {
    background: linear-gradient(
        0deg,
        rgba(121, 254, 157, 0.2),
        rgba(121, 254, 157, 0.2)
      ),
      $bv-blue;
  }

  &:active {
    background-color: $bv-green;
    color: $bv-blue;
    border: 2px solid $bv-blue;
  }
}
</style>
