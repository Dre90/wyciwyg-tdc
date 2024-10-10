<template>
  <div ref="instructionsContainer" class="instructions" :onClick="close">
    <div class="wrapper">
      <p>This will send in your code and wipe the editor clean.</p>
      <p>Are you sure you want to do this?</p>
      <div class="buttons">
        <button :onClick="close">Cancel</button>
        <button :onClick="save">Yes!</button>
      </div>
    </div>
  </div>
  <button :onclick="show">Finish!</button>
</template>

<script setup>
import { supabase } from "@/supabase";
import { ref, onBeforeMount } from "vue";
import router from "@/router";
import { useEditorValuesStore } from "@/stores/editorValues";
import { useNameStore } from "@/stores/name";

const props = defineProps({
  challengeID: {
    type: Number,
    required: true,
  },
});

const editorValuesStore = useEditorValuesStore();
const nameStore = useNameStore();
const instructionsContainer = ref(null);

function show() {
  instructionsContainer.value.style.display = "block";
}

function close() {
  instructionsContainer.value.style.display = "none";
}

async function save() {
  const id = "challenge" + props.challengeID;
  const storeEditorValueObject = editorValuesStore.getEditorValueById(id);
  const code = storeEditorValueObject.value;
  const name = nameStore.name;

  try {
    const { error, status } = await supabase
      .from("Results")
      .insert([{ name: name, value: code, challenge_id: props.challengeID }]);

    if (error && status !== 406) throw error;

    if (status == 201) {
      editorValuesStore.updateResetEditorValue(true);
      close();
      router.push("/");
    }
  } catch (error) {
    alert(error.message);
  }
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
    background-color: $dark-gray-plus1;
    color: $text-color;
    margin: 10% auto; /* 15% from the top and centered */
    padding: 50px;
    border: 1px solid $blue;
    width: 600px;
    position: relative;

    p {
      font-size: 24px;
      line-height: 34px;
      text-align: center;
      margin-bottom: 40px;
    }
  }

  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    gap: 25px;
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
