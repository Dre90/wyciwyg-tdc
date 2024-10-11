<template>
  <div class="home">
    <div class="logo-wrapper">
      <img
        src="../assets/images/logo.svg"
        alt="WYCIWYG - What you code is 
what you get"
      />
    </div>

    <div class="flex">
      <div class="info">
        <h1>
          WYCIWYG er et en utfordring der du skal skrive HTML og CSS for å lage
          det du ser i referanse bildet uten å se resultat. Fyll inn din
          informasjon for å starte. Det vil bli trekt en vinner etter TDC. PS.
          <br />Du har kun 5 minutter på deg.
        </h1>
      </div>
      <div class="wrapper">
        <label for="name">Navn</label>
        <input type="text" name="Game pin" v-model="name" required />
        <label for="email">Epost</label>
        <input type="email" name="Game pin" v-model="email" required />
        <label for="phone">Telefon</label>
        <input type="tel" name="Game pin" v-model="phone" required />

        <span class="errorMsg" v-if="errorMsg">{{ errorMsg }}</span>

        <button @click="startGame">Enter</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "@/supabase";
import router from "@/router";
import { usePlayerInfoStore } from "@/stores/playerInfo";

const gamePin = "N6878F";
const name = ref("");
const email = ref("");
const phone = ref("");
const errorMsg = ref(null);
const playerInfoStore = usePlayerInfoStore();

async function startGame() {
  if (!name.value || !email.value || !phone.value) {
    errorMsg.value = "Vennligst fyll ut alle feltene.";
    return;
  }
  await setPlayerInfo();
  await findChallenge();
}

async function setPlayerInfo() {
  playerInfoStore.setName(name.value);
  playerInfoStore.setEmail(email.value);
  playerInfoStore.setPhone(phone.value);
}

async function findChallenge() {
  console.log(gamePin);

  const challengeID = ref(null);
  if (gamePin) {
    challengeID.value = await getChallengeIdByGamePin(gamePin);

    if (challengeID.value) {
      router.push({
        name: "Challenge",
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
  padding-top: 40px;
  padding-bottom: 60px;
  justify-content: center;
}

.info {
  max-width: 800px;
  margin-bottom: 30px;
}
h1 {
  font-size: 28px;
}

h1 span {
  color: $bv-green;
}
.flex {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.wrapper {
  margin: 20px;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin-bottom: 40px;
}

input[type="text"],
input[type="tel"],
input[type="email"] {
  background: $dark-gray;
  border: 2px solid $bv-orange;
  padding: 20px;
  width: 100%;
  color: $bv-green;
  font-size: 40px;
  line-height: 1;
  margin-bottom: 20px;

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

  &:hover,
  &:focus {
    background-color: $bv-dark-orange;
  }

  &:active {
    background-color: $bv-text-color-dark;
    color: $bv-orange;
    border: 2px solid $bv-orange;
  }
}
</style>
