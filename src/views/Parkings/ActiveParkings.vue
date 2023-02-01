<script setup>
import { onBeforeUnmount } from "vue";
import { useParking } from "@/stores/parking";

const store = useParking();

store.getActiveParkings();

function poll(callback) {
  return setInterval(callback, 3000);
}

const interval = poll(store.getActiveParkings);

onBeforeUnmount(() => clearInterval(interval));
</script>

<template>
  <div class="flex flex-col mx-auto md:w-96 w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">Active parkings</h1>

    <RouterLink
      :to="{ name: 'parkings.create' }"
      class="btn btn-primary w-full"
    >
      Order parking
    </RouterLink>

    <div class="border-t h-[1px] my-6"></div>

    <div class="flex flex-col gap-1">
      <div
        v-for="parking in store.parkings"
        :key="parking.id"
        class="flex flex-col p-2 border gap-1"
      >
        <div class="plate text-2xl">{{ parking.vehicle.plate_number }}</div>
        <div class="text-sm text-gray-600">
          {{ parking.vehicle.description }}
        </div>
        <div class="bg-gray-100 p-2">
          {{ parking.zone.name }}
          ({{ (parking.zone.price_per_hour / 100).toFixed(2) }} &euro;/h)
        </div>
        <div>
          <div class="font-bold uppercase">from</div>
          <span class="font-mono">{{ parking.start_time }}</span>
        </div>
        <div class="flex items-top">
          <span class="text-2xl font-bold text-blue-600">{{
            (parking.total_price / 100).toFixed(2)
          }}</span>
          <span class="pt-0.5">&nbsp;&euro;</span>
        </div>
        <button
          type="button"
          @click="store.stopParking(parking)"
          class="btn btn-danger uppercase ml-auto"
        >
          stop
        </button>
      </div>
    </div>
  </div>
</template>
