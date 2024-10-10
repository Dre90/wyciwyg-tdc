<template>
  <header>
    <router-link to="/vote">Back</router-link>
    <h1>{{ challengeName }}</h1>
  </header>
  <div class="wrapper" v-if="!voted">
    <template v-for="result in challengeResults" :key="result.id">
      <ConfirmButton
        :id="result.id"
        :text="result.id.toString()"
        @submit="vote"
        :disabled="voted"
      />
    </template>
  </div>

  <div class="banner" v-if="voted">
    <p>Du har stemt allerede.</p>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import router from "@/router";
import { supabase } from "@/supabase";

import ConfirmButton from "../components/ConfirmButton.vue";

const emit = defineEmits(["submit"]);

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const challengeName = ref(null);
const challengeResults = ref([]);
const voted = ref(false);
const localStorageName = "votedChallenge" + props.id;

onBeforeMount(() => {
  getChallengeById(props.id);
  getChallengeResults();
  voted.value = localStorage.getItem(localStorageName);
});

async function getChallengeById(id) {
  const { data, error } = await supabase
    .from("Challenges")
    .select("name")
    .eq("id", id)
    .single();

  //if (data || error) isLoading.value = false;

  //if (error) errorObj.value = error;
  if (error) console.log(error);

  if (data) challengeName.value = data.name;
}

async function getChallengeResults() {
  try {
    let { data, error, status } = await supabase
      .from("Results")
      .select("id")
      .eq("challenge_id", props.id);

    if (error && status !== 406) throw error;

    if (data && status === 200) {
      challengeResults.value = data;
    }
  } catch (error) {
    alert(error.message);
  }
}

async function vote(vote_id) {
  try {
    const { error, status } = await supabase
      .from("Vote")
      .insert([{ result_id: vote_id, challenge_id: props.id }]);

    if (error && status !== 406) throw error;

    if (status == 201) {
      localStorage.setItem(localStorageName, true);
      router.push("/vote");
    }
  } catch (error) {
    alert(error.message);
  }
}
</script>

<style lang="scss" scoped>
header {
  align-items: center;
  background-color: $dark-gray;
  color: $bv-green;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 20px;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
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
  h1 {
    font-weight: 700;
    font-size: 50px;
    line-height: 66px;
  }
}
.wrapper {
  position: relative;
  margin: 20px 20px 60px 20px;
  font-size: 28px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media only screen and (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

.banner {
  padding: 20px;
  font-size: 22px;
  color: $bv-green;
}
</style>
