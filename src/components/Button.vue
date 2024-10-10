<template>
  <button :id="props.id" :class="buttonClasses" :disabled="props.disabled" @click.prevent="$emit('submit', props.id)">
    {{props.text}}
  </button>
</template>

<script setup>
const props = defineProps({
  id: {
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    default: 'standard',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const buttonClasses = {
  'button': true,
  [`button--${props.style}`]: true,
  'button--disabled': props.disabled,
};

</script>

<style lang="scss" scoped>
.button {
  border: 0;
  display: block;
  width: 100%;
  max-width: 100%;
  margin: 0;
  &--standard {
    background-color: #F9A86F;
    color: #11133C;
    font-weight: 700;
  }
  &--disabled {
    background-color: gray;
  }
}



</style>