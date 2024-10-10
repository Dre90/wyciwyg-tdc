<template>
  <div ref="instructionsContainer" class="instructions" :onClick="close">
    <div class="wrapper">
      <span class="close" :onClick="close">Close</span>
      <iframe ref="resContainer" class="content"></iframe>
    </div>
  </div>
  <button :onclick="show">See Result</button>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useEditorValuesStore } from "@/stores/editorValues";

const props = defineProps({
  challengeID: {
    type: Number,
    required: true,
  },
});

const resContainer = ref(null);
const instructionsContainer = ref(null);
const editorValuesStore = useEditorValuesStore();

function show() {
  instructionsContainer.value.style.display = "block";
  const id = "challenge" + props.challengeID;
  resContainer.value.srcdoc = editorValuesStore.getEditorValueById(id).value;
}

function close() {
  instructionsContainer.value.style.display = "none";
}

onBeforeMount(() => {});
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
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  .wrapper {
    background-color: $bv-light-bg;
    color: $bv-text-color-dark;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .content {
      width: 100%;
      height: 100%;
      background-color: #ffffff;
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

button {
  background-color: $bv-orange;
  color: $bv-text-color-dark;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  border: 2px solid $bv-orange;

  &:hover {
    background-color: $bv-dark-orange;
  }

  &:active {
    background-color: $bv-text-color-dark;
    color: $bv-orange;
    border: 2px solid $bv-orange;
  }
}
</style>
