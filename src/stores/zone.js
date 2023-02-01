import { ref } from "vue";
import { defineStore } from "pinia";

export const useZone = defineStore("zone", () => {
  const zones = ref([]);

  function getZones() {
    return window.axios
      .get("zones")
      .then((response) => (zones.value = response.data.data));
  }

  return { getZones, zones };
});
