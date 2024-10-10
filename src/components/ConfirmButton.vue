<template>
  <div>
    <Button
      v-if="!confirmMode"
      :id="id"
      :text="id.toString()"
      @submit="buttonPressed"
      :disabled="disabled"
    />
    <Button
      v-if="confirmMode"
      :id="id"
      text="Sikker?"
      @submit="buttonConfirmed"
      :disabled="disabled"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Button from "../components/Button.vue";

const props = defineProps({
  id: {
    required: true,
  },
  disabled: {
    default: false,
  },
});

const emit = defineEmits(["submit"]);

const confirmMode = ref(false);

const buttonPressed = () => {
  confirmMode.value = true;
};

const buttonConfirmed = () => {
  emit("submit", props.id);
  confirmMode.value = false;
};
</script>
