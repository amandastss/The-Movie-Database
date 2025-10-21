<script setup>
import { defineProps, onMounted } from "vue";
import { usetvStore } from "@/stores/tv";

const tvStore = usetvStore();

const props = defineProps({
  TvId: {
    type: Number,
    required: true,
  },
});
onMounted(async () => {
  await tvStore.getTvDetail(props.TvId);
});
</script>

<template>
  <div class="main">
    <div class="content">
      <img
        :src="`https://image.tmdb.org/t/p/w185${tvStore.currentTv.poster_path}`"
        :alt="tvStore.currentTv.title"
      />

      <div class="details">
        <h1>Filme: {{ tvStore.currentTv.title }}</h1>
        <p>{{ tvStore.currentTv.tagline }}</p>
        <p>{{ tvStore.currentTv.overview }}</p>
        <p>Orçamento: ${{ tvStore.currentTv.budget }}</p>
        <p>Avaliação: {{ tvStore.currentTv.vote_average }}</p>
      </div>
    </div>
  </div>

  <p>Produtoras</p>
  <div class="companies">
    <template
      v-for="company in tvStore.currentTv.production_companies"
      :key="company.id"
    >
      <img
        v-if="company.logo_path"
        :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
        :alt="company.name"
      />
      <p v-else>{{ company.name }}</p>
    </template>
  </div>
</template>

<style scoped>
.main {
  background-color: #ffffff; /* tom escuro bonito */
  min-height: 100vh;
}
</style>
