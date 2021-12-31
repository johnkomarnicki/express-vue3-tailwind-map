<template>
  <div class="h-screen relative">
    <div id="mapid" class="h-full z-[1]"></div>
  </div>
</template>

<script>
import leaflet from "leaflet";
import { onMounted } from "vue";
export default {
  name: "HomeView",
  components: {},
  setup() {
    let mymap;
    onMounted(() => {
      // init map
      mymap = leaflet
        .map("mapid", {
          zoomControl: false,
        })
        .setView([28.538336, -81.379234], 10);

      // add tile layers
      leaflet
        .tileLayer(
          `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_API_KEY}`,
          {
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken: process.env.VUE_APP_API_KEY,
          }
        )
        .addTo(mymap);
    });
  },
};
</script>
