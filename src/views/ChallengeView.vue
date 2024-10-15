<template>
  <header>
    <router-link to="/">Back</router-link>
    <div class="timer">
      <span>Time left:</span>
      <span :class="['time', { pulsating: isPulsating }]">{{
        formattedTime
      }}</span>
    </div>
    <div class="iconName-Wrapper">
      <img
        v-if="challenge.practice"
        src="../assets/images/figur1.svg"
        alt="Figur"
        class="figur1"
      />
      <img
        v-else
        src="../assets/images/figur2.svg"
        alt="Figur"
        class="figur2"
      />
      <h1>{{ challenge.name }}</h1>
    </div>
  </header>
  <div v-if="isLoading" class="loading">
    <p class="text-4xl text-bv-green">Loading..</p>
  </div>
  <div v-else>
    <div class="wrapper">
      <MonacoEditor
        v-bind:challengeID="challenge.id"
        @combo-update="comboUpdate"
      />
    </div>

    <div class="name">
      {{ playerInfoStore.name }}
    </div>
    <div class="button-container">
      <Reference :imageUrl="challenge.image_url" />
      <Instructions
        ref="instructions"
        :instructions="challenge.instructions"
        @close-instructions="startTimer"
      />
      <ResultViewer v-if="challenge.practice" :challengeID="challenge.id" />
      <FinishedConfirmation
        ref="finishedConfirmation"
        v-if="!challenge.practice"
        :challengeID="challenge.id"
        :imageUrl="challenge.image_url"
      />
    </div>
    <Combo
      :value="combo"
      :challengeID="challenge.id"
      :resultID="playerInfoStore.name"
    />
  </div>
</template>

<script setup>
import { onBeforeMount, ref, computed, onMounted } from "vue";
import { supabase } from "@/supabase";
import { usePlayerInfoStore } from "@/stores/playerInfo";

import MonacoEditor from "@/components/MonacoEditor.vue";
import Instructions from "@/components/InstructionsComponent.vue";
import Reference from "@/components/ReferenceComponent.vue";
import ResultViewer from "@/components/ResultViewer.vue";
import FinishedConfirmation from "../components/FinishedConfirmation.vue";
import Combo from "../components/ComboComponent.vue";

const playerInfoStore = usePlayerInfoStore();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const challenge = ref("");
let comboTimer = ref("");
const combo = ref(0);
const isLoading = ref(true);
const timeLeft = ref(0);
const finishedConfirmation = ref(null);
const instructions = ref(null);

const comboUpdate = () => {
  combo.value++;
  clearTimeout(comboTimer.value);
  comboTimer.value = setTimeout(() => {
    combo.value = 0;
  }, 10000);
};

async function getChallengeById(id) {
  const { data, error } = await supabase
    .from("Challenges")
    .select("id, name, instructions, image_url, active, practice")
    .eq("id", id)
    .single();

  if (data || error) isLoading.value = false;

  //if (error) errorObj.value = error;
  if (error) console.log(error);

  if (data) challenge.value = data;
}

const formattedTime = computed(() => {
  if (timeLeft.value < 60) {
    return timeLeft.value;
  } else {
    const minutes = Math.floor(timeLeft.value / 60);
    const seconds = timeLeft.value % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
});

const startTimer = () => {
  const TIME = 300; // 300 = 5 minutes
  timeLeft.value = TIME; // Reset timer to 5 minutes
  countdown();
};

const countdown = () => {
  if (timeLeft.value > 0) {
    setTimeout(() => {
      timeLeft.value--;
      countdown();
    }, 1000);
  } else {
    timeUp();
  }
};

const isPulsating = computed(() => timeLeft.value < 30);

const timeUp = () => {
  console.log("Time is up!");
  if (finishedConfirmation.value && finishedConfirmation.value.showResult) {
    finishedConfirmation.value.showResult();
  }
};

onBeforeMount(() => {
  getChallengeById(props.id);
});
</script>

<style lang="scss" scoped>
header {
  align-items: center;
  background-color: $dark-gray;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
  color: $bv-green;
  a {
    color: $bv-green;
    font-weight: 500;
    font-size: 32px;
    line-height: 42px;
    padding: 15px 30px;

    &:hover,
    &:focus {
      background-color: $bv-green-hover-bg;
      text-decoration: underline;
    }

    &:active {
      background-color: $bv-green;
      color: $dark-gray;
    }
  }

  .timer {
    display: flex;
    gap: 10px;
    align-items: center;
    span {
      font-weight: 700;
      font-size: 22px;
      line-height: 32px;
    }
    .time {
      font-weight: 700;
      font-size: 3em;
      transition: font-size 0.5s ease;
    }
    .pulsating {
      font-size: 3.5em;
      color: $bv-orange;
      animation: pulse 1s infinite;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  }
  .iconName-Wrapper {
    display: flex;

    .figur1 {
      width: 40px;
    }

    .figur2 {
      width: 50px;
    }

    h1 {
      font-weight: 700;
      font-size: 50px;
      line-height: 66px;
      margin-left: 20px;
    }
  }
}

.loading {
  font-size: 36px;
  line-height: 40px;
  color: $bv-green;
  padding: 35px 50px;
}

.wrapper {
  display: flex;
}

.name {
  background-color: $bv-blue;
  bottom: 0;
  color: $bv-green;
  font-weight: 700;
  font-size: 40px;
  line-height: 53px;
  padding: 25px 70px;
  position: absolute;
  margin: 20px;
}

.button-container {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 30px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}
</style>
