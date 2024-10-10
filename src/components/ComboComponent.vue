<template>
  <div class="combo">
    <p class="combo__label">Combo</p>
    <p :class="{ bump: bump, combo__value: true }">{{ value }}</p>
  </div>
</template>

<script setup>
import { watch, ref } from "vue";
import { sendStats } from "../helpers/Stats";
import { throttle } from "lodash";
const props = defineProps({
  value: {
    type: Number,
    required: true,
  },
  resultID: {
    type: String,
    required: true,
  },
  challengeID: {
    type: Number,
    required: true,
  },
});

const updateDatabase = async () => {
  await sendStats("combo", props.value, props.challengeID, props.resultID);
};

const throttledUpdate = throttle(updateDatabase, 1000);

const bump = ref(false);

watch(
  () => props.value,
  () => {
    throttledUpdate();

    bump.value = true;
    setTimeout(() => {
      bump.value = false;
    }, 250);
  }
);
</script>

<style lang="scss" scoped>
.combo {
  color: $bv-green;
  font-family: "Press Start 2P", cursive;
  padding-right: 50px;
  position: absolute;
  right: 0;
  text-align: center;
  top: 120px;
  &__label {
    font-weight: 700;
    margin: 0;
    padding-bottom: 5px;
  }
  &__value {
    font-size: 62px;
    line-height: 1.2;
  }
  .bump {
    animation: grow 0.25s both;
  }

  @keyframes grow {
    0% {
      animation-timing-function: ease-out;
    }
    50% {
      transform: scale(1.3);
      animation-timing-function: ease-in;
    }
  }
}
</style>
