<template>
  <div class="">
    <div class="logo-wrapper">
      <img
        src="../assets/images/logo.svg"
        alt="WYCIWYG - What you code is what you get"
      />
    </div>

    <div class="leaderboard-wrapper">
      <h1>Leaderboard</h1>
      <grid-loader
        :loading="isLoading"
        :color="color"
        :size="size"
        class="loading"
      >
      </grid-loader>
      <div v-if="errorMsg">Noe gikk galt</div>
      <div v-if="!errorMsg && !isLoading" class="leaderboard">
        <div
          v-for="(person, index) in leaderBoard"
          v-bind:key="person.id"
          class="person"
        >
          <div class="placement">{{ getCount(index) }}</div>

          <div class="name">{{ person.name }}</div>

          <div class="score">{{ person.score }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from "vue";
import { supabase } from "@/supabase";
import GridLoader from "vue-spinner/src/GridLoader.vue";

const isLoading = ref(true);
const leaderBoard = ref("");
const errorMsg = ref("");
const color = "#79fe9d";
const size = "40px";

function getCount(index) {
  return index + 1;
}

async function getLeaderBoard() {
  const { data, error } = await supabase
    .from("TDC2024")
    .select("id, name, score")
    .order("score", { ascending: false })
    .limit(10);

  if (data || error) isLoading.value = false;

  if (error) {
    console.log(error);
    errorMsg.value = error;
  }

  if (data) leaderBoard.value = data;
}

onBeforeMount(() => {
  getLeaderBoard();
});

// Set up interval to call getLeaderBoard every 2 minutes
const intervalId = setInterval(getLeaderBoard, 120000);

// Clear interval on unmount to avoid memory leaks
onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style lang="scss" scoped>
.logo-wrapper {
  display: flex;
  padding-top: 40px;
  padding-bottom: 60px;
  justify-content: center;
}

.loading {
  margin-top: 100px;
}

.leaderboard-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 50px;
    margin-bottom: 20px;
    color: $bv-orange;
  }
  .leaderboard {
    max-width: 800px;
    width: 600px;
    display: flex;
    flex-direction: column;

    .person {
      display: flex;
      border: 1px solid $bv-green;

      .placement,
      .name,
      .score {
        padding: 20px;
      }

      .placement {
        border-right: 1px solid $bv-green;
        width: 70px;
        display: flex;
        justify-content: center;
      }

      .score {
        border-left: 1px solid $bv-green;
        margin-left: auto;
        width: 70px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
