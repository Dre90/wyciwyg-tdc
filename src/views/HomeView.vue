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
          WYCIWYG er inspirert av Code in the Dark og er en konkurranse der du
          skal skrive HTML og CSS for å kopiere et referansebilde uten mulighet
          til å forhåndsvise resultatet. <br />
          Fyll ut feltene under for å starte – det blir trukket en vinner etter
          TDC. <br />
          PS! Du har kun 4 minutter på deg
        </h1>
      </div>
      <div class="wrapper">
        <label for="name">Navn<span class="required-star">*</span></label>
        <input type="text" name="Game pin" v-model="name" required />
        <label for="email">Epost<span class="required-star">*</span></label>
        <input type="email" name="Game pin" v-model="email" required />
        <label for="phone">Telefon</label>
        <input type="tel" name="Game pin" v-model="phone" />

        <label class="container personverner">
          <p>
            <span class="required-star">*</span>
            Jeg samtykker til at personopplysninger lagres fram til konkurransen
            er avsluttet og senest til 31.10.24. Opplysningene blir kun brukt
            til å kontakte deg som eventuell vinner av konkurransen.
            <a href="/personvern" target="_blank" rel="noopener noreferrer"
              >Personvernerklæring</a
            >
          </p>
          <input
            type="checkbox"
            id="checkbox"
            v-model="personvernerChecked"
            required
          />
          <span class="checkmark"></span>
        </label>

        <label class="container">
          <p>
            Jeg samtykker til at Bouvet kan kontakte meg i rekruttering
            sammenheng.
          </p>
          <input type="checkbox" id="checkbox" v-model="rekrutteringChecked" />
          <span class="checkmark"></span>
        </label>

        <span class="errorMsg" v-if="errorMsg">{{ errorMsg }}</span>

        <button @click="startGame">Enter</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { supabase } from "@/supabase";
import router from "@/router";
import { usePlayerInfoStore } from "@/stores/playerInfo";
import { useEditorValuesStore } from "@/stores/editorValues";

const gamePin = "N6878F";
const name = ref("");
const email = ref("");
const phone = ref("");
const personvernerChecked = ref(false);
const rekrutteringChecked = ref(false);
const errorMsg = ref(null);
const playerInfoStore = usePlayerInfoStore();
const editorValuesStore = useEditorValuesStore();

async function startGame() {
  if (!name.value || !email.value || !personvernerChecked.value) {
    errorMsg.value = "Vennligst fyll ut alle påkrevde feltene.";
    return;
  }
  await setPlayerInfo();
  await findChallenge();
}

async function setPlayerInfo() {
  playerInfoStore.setName(name.value);
  playerInfoStore.setEmail(email.value);
  playerInfoStore.setPhone(phone.value);
  playerInfoStore.setPersonvernerChecked(personvernerChecked.value);
  playerInfoStore.setRekrutteringChecked(rekrutteringChecked.value);
}

async function findChallenge() {
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

onBeforeMount(() => {
  editorValuesStore.updateResetEditorValue(true);
  playerInfoStore.setName("");
  playerInfoStore.setEmail("");
  playerInfoStore.setPhone("");
  playerInfoStore.setPersonvernerChecked(false);
  playerInfoStore.setRekrutteringChecked(false);
});
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
  max-width: 700px;
  margin-bottom: 40px;
  p {
    font-size: 18px;
    line-height: 28px;
  }

  a {
    text-decoration: underline;

    &:hover {
      color: $bv-green;
    }
  }
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

input[type="checkbox"] {
  width: 30px;
  height: 30px;
  border: 2px solid $bv-orange;
  color: $bv-orange;
  cursor: pointer;
}

.errorMsg {
  margin-top: 40px;
  margin-bottom: 10px;
  font-size: 30px;
  color: $bv-orange;
}

label {
  font-size: 20px;
  line-height: 28px;
  color: $text-color;
  margin-bottom: 10px;
  display: flex;

  .required-star {
    color: $bv-orange;
    margin-left: 5px;
    font-size: 25px;
  }
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

/* The container */
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 30px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

.personverner .checkmark {
  top: 10px;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: $bv-orange;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
