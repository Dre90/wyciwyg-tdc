<template>
  <div ref="instructionsContainer" class="instructions">
    <div ref="wrapper" class="wrapper">
      <p>This will send in your code and wipe the editor clean.</p>
      <p>Are you sure you want to do this?</p>
      <div class="buttons">
        <button :onClick="close">Cancel</button>
        <button :onClick="showResult">Yes!</button>
      </div>
    </div>
  </div>
  <div ref="resultContainer" class="result">
    <div class="resultWrapper">
      <div class="comparison">
        <div>
          <h2>Orginal</h2>
          <img :src="props.imageUrl" alt="Reference image" />
        </div>
        <div>
          <h2>Din kode</h2>
          <iframe ref="resContainer" class="content"></iframe>
        </div>
      </div>
      <div class="score">
        <h2>Score</h2>
        <div v-if="loadingScore">
          <grid-loader :loading="loadingScore" :color="color" :size="size">
          </grid-loader>
        </div>

        <span v-else>{{ score }}/100</span>
      </div>
      <div class="buttons">
        <button :onClick="reset">Restart</button>
      </div>
    </div>
  </div>
  <button :onclick="show">Finish!</button>
</template>

<script setup>
import { supabase } from "@/supabase";
import { ref } from "vue";
import GridLoader from "vue-spinner/src/GridLoader.vue";
import { useRouter } from "vue-router";

import { useEditorValuesStore } from "@/stores/editorValues";
import { usePlayerInfoStore } from "@/stores/playerInfo";

const props = defineProps({
  challengeID: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const editorValuesStore = useEditorValuesStore();
const playerInfoStore = usePlayerInfoStore();

const instructionsContainer = ref(null);
const resultContainer = ref(null);
const resContainer = ref(null);

const score = ref("");
const loadingScore = ref(true);
const color = "#79fe9d";
const size = "25px";
const savedContentID = ref("");

function show() {
  instructionsContainer.value.style.display = "flex";
}

async function showResult() {
  const id = "challenge" + props.challengeID;
  resContainer.value.srcdoc = editorValuesStore.getEditorValueById(id).value;

  instructionsContainer.value.style.display = "none";
  resultContainer.value.style.display = "flex";

  await getScore();
  await save();
}

function close() {
  instructionsContainer.value.style.display = "none";
  resultContainer.value.style.display = "none";
}

async function getScore() {
  const id = "challenge" + props.challengeID;
  await fetchData(
    "https://imagecompare.prototyp.io/api/wyciwyg",
    editorValuesStore.getEditorValueById(id).value
  )
    .then((data) => {
      score.value = data.score;
      loadingScore.value = false;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function save() {
  const id = "challenge" + props.challengeID;
  const storeEditorValueObject = editorValuesStore.getEditorValueById(id);
  const code = storeEditorValueObject.value;

  try {
    const { data, error, status } = await supabase
      .from("TDC2024")
      .upsert({
        name: playerInfoStore.name,
        email: playerInfoStore.email,
        phone: playerInfoStore.phone,
        personvern: playerInfoStore.personvernerChecked,
        rekruttering: playerInfoStore.rekrutteringChecked,
        value: code,
        score: score.value,
        challenge_id: props.challengeID,
      })
      .select("id");

    if (error && status !== 406) throw error;

    if (status == 201) {
      savedContentID.value = data[0].id;
    }
  } catch (error) {
    alert(error.message);
  }
}

async function reset() {
  editorValuesStore.updateResetEditorValue(true);
  playerInfoStore.setName("");
  playerInfoStore.setEmail("");
  playerInfoStore.setPhone("");
  playerInfoStore.setPersonvernerChecked(false);
  playerInfoStore.setRekrutteringChecked(false);
  close();
  router.push("/");
}

const fetchData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: data,
    });
    if (!response.ok) {
      console.log(response);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

defineExpose({
  showResult,
});
</script>

<style lang="scss" scoped>
.instructions,
.result {
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
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .wrapper,
  .resultWrapper {
    background-color: $dark-gray-plus1;
    color: $text-color;
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

  .resultWrapper {
    width: 95%;

    .comparison {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;

      .content {
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        width: 1478px;
        height: 433px;
        background-color: #ffffff;
        position: absolute;
        transform-origin: top left;
        scale: 0.6;
      }
    }

    .score {
      width: 100%;
      margin-top: 100px;
      margin-bottom: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;

      h2 {
        font-weight: 700;
        font-size: 50px;
        line-height: 66px;
        margin-bottom: 10px;
        color: $bv-orange;
      }
      span {
        font-weight: 700;
        font-size: 150px;
        line-height: 156px;
        color: $bv-green;
      }
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
