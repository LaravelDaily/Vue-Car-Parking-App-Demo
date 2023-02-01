<script setup>
import { watchEffect, onBeforeUnmount } from "vue";
import { useParking } from "@/stores/parking";
import { useRoute } from "vue-router";

const store = useParking();
const route = useRoute();

watchEffect(async () => {
  store.getParking({ id: route.params.id });
});

onBeforeUnmount(store.resetParkingDetails);
</script>

<template>
  <div
    class="flex flex-col mx-auto md:w-96 w-full"
    v-if="store.parking.id !== undefined"
  >
    <h1 class="text-2xl font-bold mb-4 text-center">Parking order details</h1>

    <div class="border p-2 font-mono">
      <div class="font-bold uppercase mb-4">
        parking order #{{ store.parking.id }}
      </div>

      <div class="font-bold uppercase">license plate</div>
      <div class="plate text-2xl">{{ store.parking.vehicle.plate_number }}</div>

      <div class="font-bold uppercase">description</div>
      <div>{{ store.parking.vehicle.description }}</div>

      <div class="font-bold uppercase">zone</div>
      <div>{{ store.parking.zone.name }}</div>

      <div class="font-bold uppercase">price</div>
      <div>
        {{ (store.parking.zone.price_per_hour / 100).toFixed(2) }} &euro; per
        hour
      </div>

      <div class="font-bold uppercase">from</div>
      <div>{{ store.parking.start_time }}</div>

      <div class="font-bold uppercase">to</div>
      <div>{{ store.parking.stop_time }}</div>

      <div class="font-bold uppercase">total</div>
      <div class="text-xl">
        {{ (store.parking.total_price / 100).toFixed(2) }} &euro;
      </div>
    </div>

    <div class="border-t h-[1px] my-6"></div>

    <RouterLink
      :to="{ name: 'parkings.history' }"
      class="btn btn-secondary uppercase"
    >
      return
    </RouterLink>
  </div>
</template>
