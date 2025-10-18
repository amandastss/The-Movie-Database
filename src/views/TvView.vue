<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';
import { useGenreStore } from '@/stores/genre';


const genreStore = useGenreStore();

const isLoading = ref(false);
const tvShows = ref([]);


const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');


const listTv = async (genreId) => {
  isLoading.value = true;
  try {
    const response = await api.get('discover/tv', {
      params: {
        with_genres: genreId,
        language: 'pt-BR',
      },
    });
    tvShows.value = response.data.results;
  } catch (error) {
    console.error('Erro ao carregar programas de TV:', error);
  } finally {
    isLoading.value = false;
  }
};


onMounted(async () => {
  isLoading.value = true;
  await genreStore.getAllGenres('tv'); 
  isLoading.value = false;
});
</script>

<template>
  <h1>Programas de TV</h1>

  <!-- Lista de gêneros -->
  <ul class="genre-list">
    <li
      v-for="genre in genreStore.genres"
      :key="genre.id"
      @click="listTv(genre.id)"
      class="genre-item"
    >
      {{ genre.name }}
    </li>
  </ul>

  <loading v-model:active="isLoading" is-full-page />

  <!-- Lista de programas -->
  <div class="tv-list">
    <div v-for="tv in tvShows" :key="tv.id" class="tv-card">
      <img
        :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`"
        :alt="tv.name"
      />
      <div class="tv-details">
        <p class="tv-title">{{ tv.name }}</p>
        <p class="tv-release-date">
          Estreia: {{ formatDate(tv.first_air_date) }}
        </p>
        <p class="tv-genres">
          <span
            v-for="genre_id in tv.genre_ids"
            :key="genre_id"
            @click="listTv(genre_id)"
          >
            {{ genreStore.getGenreName(genre_id) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: #387250;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #4e9e5f;
  box-shadow: 0 0 0.5rem #387250;
}

.tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.tv-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.tv-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  object-fit: cover;
}

.tv-details {
  padding: 0 0.5rem;
}

.tv-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.tv-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

.tv-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.tv-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}
</style>
