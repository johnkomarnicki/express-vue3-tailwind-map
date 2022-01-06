<template>
  <div
    class="w-full md:w-auto absolute md:top-[40px] md:left-[60px] z-[2] flex gap-4 px-6 py-8 md:px-0 md:py-0 bg-transparent"
  >
    <!-- Search -->
    <div class="relative flex-1 md:min-w-[350px]">
      <!-- Search Input -->
      <input
        class="pl-9 pr-4 py-3 text-sm focus:outline-none w-full shadow-md rounded-md"
        type="text"
        placeholder="Start your search..."
      />
      <!-- Search Icon -->
      <div class="absolute top-0 left-[8px] h-full flex items-center">
        <i class="fas fa-search"></i>
      </div>
      <!-- Search Results -->
      <div class="absolute mt-2 w-full">
        <!-- Results -->
        <div class="h-[200px] overflow-scroll bg-white rounded-md">
          <!-- Loading Spinner -->
          <!-- Display Results -->
          <div
            class="px-4 py-2 flex gap-x-2 cursor-pointer hover:bg-slate-600 hover:text-white"
          >
            <i class="fas fa-map-marker-alt"></i>
            <p class="text-xs">Testing Result</p>
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
export default {
  props: ["fetchCoords", "coords"],
};
</script>
