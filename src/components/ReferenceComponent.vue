<template>
  <div ref="ReferenceContainer" class="reference" :onClick="close">
    <div class="wrapper">
      <span class="close" :onClick="close">Close</span>
      <div class="content">
        <img :src="props.imageUrl" alt="Reference image" />
      </div>
    </div>
  </div>
  <img
    class="smallReference"
    :onclick="show"
    :src="props.imageUrl"
    alt="Reference image"
  />
</template>

<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from "vue";

const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
});
const ReferenceContainer = ref(null);

function show() {
  ReferenceContainer.value.style.display = "block";
}

function close() {
  ReferenceContainer.value.style.display = "none";
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
.reference {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  .wrapper {
    background-color: $bv-light-bg;
    color: $bv-text-color-dark;
    margin: 2% auto;
    width: 95%; /* Could be more or less, depending on screen size */
    display: flex;
    flex-direction: column;

    .content {
      white-space: pre-line;
    }

    /* The Close Button */
    .close {
      align-self: end;
      color: $bv-text-color-dark;
      cursor: pointer;
      font-weight: 700;
      font-size: 20px;
      line-height: 26px;
      margin-top: 5px;
      margin-bottom: 5px;
      margin-right: 20px;
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

.smallReference {
  width: 100%;
  height: 250px;
  grid-column-start: 1;
  grid-column-end: 3;
  border: 2px solid #3480eb;
  cursor: pointer;
}
</style>
