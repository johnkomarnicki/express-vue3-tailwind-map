<template>
  <div
    class="w-full md:w-auto absolute md:top-[40px] md:left-[60px] z-[2] flex gap-4 px-6 py-8 md:px-0 md:py-0 bg-transparent"
  >
    <!-- Search -->
    <div class="relative flex-1 md:min-w-[350px]">
      <!-- Search Input -->
      <input
        class="pl-9 pr-4 py-3 text-[14px] focus:outline-none w-full shadow-md rounded-md"
        type="text"
        placeholder="Start your search..."
        v-model="searchQuery"
        @input="search"
      />
      <!-- Search Icon -->
      <div class="absolute top-0 left-[8px] h-full flex items-center">
        <i class="fas fa-search"></i>
      </div>
      <!-- Search Results -->
      <div class="absolute mt-[8px] w-full">
        <!-- Search Queries -->
        <div class="h-[200px] overflow-scroll bg-white rounded-md">
          <!-- Loading Spinner -->
          <!-- Display Results -->
          <div
            class="px-4 py-2 flex gap-x-2 cursor-pointer hover:bg-slate-600 hover:text-white"
          >
            <i class="fas fa-map-marker-alt"></i>
            <p class="text-[12px]">Testing Result</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Geolocation -->
    <div
      class="px-4 bg-white flex items-center shadow-md rounded-md min-h-[45px]"
      @click="$emit('getGeolocation')"
      :class="{ 'bg-slate-600': coords }"
    >
      <i
        class="fas fa-location-arrow 'text-slate-600' text-[18px]"
        :class="{ 'text-white': coords, 'animate-pulse': fetchCoords }"
      ></i>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
export default {
  props: ["fetchCoords", "coords"],
  setup(props) {
    const searchQuery = ref(null);
    const searchData = ref(null);
    const queryTimeout = ref(null);

    const search = () => {
      clearTimeout(queryTimeout.value);

      // reset data on a new search
      searchData.value = null;
      queryTimeout.value = setTimeout(async () => {
        // Only make search, if there is value in query input
        if (searchQuery.value !== "") {
          const params = new URLSearchParams({
            fuzzyMatch: true,
            language: "en",
            limit: 10,
            proximity: props.coords ? `${props.coords.lng},${props.coords.lat}` : "0,0",
          });
          const data = await axios.get(
            `http://localhost:3200/api/search/${searchQuery.value}?${params}`
          );
          searchData.value = data.data.features;
        }
      }, 750);
    };

    return { searchQuery, search };
  },
};
</script>
