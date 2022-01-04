<template>
  <div
    class="h-screen absolute w-full z-10 flex justify-center items-start pt-[125px] bg-black/50"
  >
    <div class="flex flex-col bg-white w-[80%] sm:w-[450px] px-6 py-4 rounded-md">
      <h1 class="text-lg mb-1">Error: {{ this.geoErrorMsg }}</h1>
      <p class="text-sm mb-4">
        To take advantage of this applications features, please ensure location services
        are enabled
      </p>
      <button
        @click="$emit('closeGeoError')"
        class="self-start py-2 px-4 bg-red-500 text-white rounded-md text-sm"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["geoErrorMsg"],
};
</script>
