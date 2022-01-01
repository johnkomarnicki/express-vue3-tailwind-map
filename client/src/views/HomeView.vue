<template>
  <div class="h-screen relative">
    <div id="mapid" class="h-full z-[1]"></div>
  </div>
</template>

<script>
import leaflet from "leaflet";
import { onMounted, ref } from "vue";
export default {
  name: "HomeView",
  components: {},
  setup() {
    let map;
    onMounted(() => {
      // init map
      map = leaflet
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
        .addTo(map);

      // get users location
      getGelocation();
    });

    const coords = ref(null);
    const fetchCoords = ref(null);
    const geoMarker = ref(null);

    const getGelocation = () => {
      fetchCoords.value = true;
      navigator.geolocation.getCurrentPosition(setCoords, getLocError);
    };

    const setCoords = (pos) => {
      // stop fetching
      fetchCoords.value = null;

      // set coords in session storage
      const sessionCoords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      sessionStorage.setItem("coords", JSON.stringify(setCoords));

      // set ref coords value
      coords.value = sessionCoords;

      plotGeoLocation(coords);
    };

    const getLocError = (error) => {
      // stop fetching coords
      fetchCoords.value = null;
      console.warn(error);
    };

    const plotGeoLocation = (coords) => {
      // create custom marker
      const customMarker = leaflet.icon({
        iconUrl: require("../assets/map-marker-red.svg"),
        iconSize: [35, 35],
      });

      // create new marker with coords and custom marker
      geoMarker.value = leaflet
        .marker([coords.value.lat, coords.value.lng], { icon: customMarker })
        .addTo(map);

      // set map view to current location
      map.setView([coords.value.lat, coords.value.lng], 10);
    };
  },
};
</script>
