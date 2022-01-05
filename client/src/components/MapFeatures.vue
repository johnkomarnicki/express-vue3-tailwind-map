<template>
  <div class="flex gap-4 px-6 py-8 bg-transparent md:px-0 md:py-0">
    <!-- Geolocation -->
    <div
      class="px-4 bg-white flex items-center shadow-md rounded-md min-h-[45px]"
      @click="$emit('getGeolocation')"
      :class="{ 'bg-slate-600': coords }"
    >
      <i
        class="fas fa-location-arrow text-[18px]"
        :class="{ 'text-white': coords, 'text-slate-600': !coords }"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["fetchCoords", "coords"],
};
</script>
