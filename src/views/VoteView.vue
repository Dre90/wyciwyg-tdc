<template>
  <div class="">
    <div class="logo-wrapper">
      <img
        src="../assets/images/logo.svg"
        alt="WYCIWYG - What you code is what you get"
      />
    </div>

    <div class="flex">
      <div class="wrapper">
        <label for="GamePin">Game pin</label>
        <input
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          placeholder="000000"
          name="Game pin"
          v-model="gamePin"
          max
        />
        <span class="errorMsg" v-if="errorMsg">{{ errorMsg }}</span>

        <button @click="findChallenge">Enter</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "@/supabase";
import router from "@/router";

const gamePin = ref(null);
const errorMsg = ref(null);

async function findChallenge() {
  const challengeID = ref(null);
  if (gamePin.value) {
    challengeID.value = await getChallengeIdByGamePin(gamePin.value);

    if (challengeID.value) {
      router.push({
        name: "Vote challenge",
        params: { id: challengeID.value },
      });
    }
  }
}

async function getChallengeIdByGamePin(gamePin) {
  const { data, error } = await supabase
    .from("Challenges")
    .select("id")
    .eq("game_pin", gamePin)
    .single();

  if (error) {
    errorMsg.value = "Found no challenge with that Game pin";
    return;
  } else {
    return data.id;
  }
}
</script>

<style lang="scss" scoped>
.logo-wrapper {
  display: flex;
  padding: 80px 25px;
  justify-content: center;

  @media only screen and (min-width: 600px) {
    padding-top: 200px;
    padding-bottom: 100px;
  }
}

.flex {
  display: flex;
  justify-content: center;
}

.wrapper {
  margin: 20px;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin-bottom: 40px;
}

input[type="text"] {
  background: $dark-gray;
  border: 2px solid $bv-orange;
  padding: 20px;
  width: 100%;
  color: $bv-green;
  font-size: 75px;
  line-height: 1;

  &::placeholder {
    color: #494949;
  }
}

.errorMsg {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 20px;
}

label {
  font-size: 20px;
  line-height: 28px;
  color: $text-color;
  margin-bottom: 10px;
}

button {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: $bv-orange;
  color: $bv-text-color-dark;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  border: 2px solid $bv-orange;
  padding: 20px;

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
