<script setup>
import { onBeforeUnmount } from "vue";
import { useVehicle } from "@/stores/vehicle";
import { useZone } from "@/stores/zone";
import { useParking } from "@/stores/parking";

const vehicleStore = useVehicle();
const zoneStore = useZone();
const parkingStore = useParking();

vehicleStore.getVehicles().then((response) => {
  if (response.length > 0) {
    parkingStore.form.vehicle_id = response[0].id;
  }
});

zoneStore.getZones().then((response) => {
  if (response.length > 0) {
    parkingStore.form.zone_id = response[0].id;
  }
});

onBeforeUnmount(parkingStore.resetForm);
</script>

<template>
  <form @submit.prevent="parkingStore.startParking" novalidate>
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Order parking</h1>

      <div class="flex flex-col gap-2 mb-4">
        <label for="vehicle_id" class="required">Vehicle</label>
        <select
          v-model="parkingStore.form.vehicle_id"
          name="vehicle_id"
          id="vehicle_id"
          class="form-input"
          :disabled="parkingStore.loading"
        >
          <option
            v-for="vehicle in vehicleStore.vehicles"
            :value="vehicle.id"
            :key="vehicle.id"
          >
            {{ vehicle.plate_number.toUpperCase() }}
            <span v-if="vehicle.description">({{ vehicle.description }})</span>
          </option>
        </select>
        <ValidationError :errors="parkingStore.errors" field="vehicle_id" />
      </div>

      <div class="flex flex-col gap-2">
        <label for="zone_id" class="required">Zone</label>
        <select
          v-model="parkingStore.form.zone_id"
          name="zone_id"
          id="zone_id"
          class="form-input"
          :disabled="parkingStore.loading"
        >
          <option
            v-for="zone in zoneStore.zones"
            :value="zone.id"
            :key="zone.id"
          >
            {{ zone.name }}
            ({{ (zone.price_per_hour / 100).toFixed(2) }} &euro;/h)
          </option>
        </select>
        <ValidationError :errors="parkingStore.errors" field="zone_id" />
        <ValidationError :errors="parkingStore.errors" field="general" />
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex gap-2">
        <button
          type="submit"
          class="btn btn-primary w-full"
          :disabled="parkingStore.loading"
        >
          <IconSpinner class="animate-spin" v-show="parkingStore.loading" />
          Start parking
        </button>
        <RouterLink :to="{ name: 'parkings.active' }" v-slot="{ navigate }">
          <button
            @click="navigate"
            :disabled="parkingStore.loading"
            class="btn btn-secondary"
          >
            Cancel
          </button>
        </RouterLink>
      </div>
    </div>
  </form>
</template>
