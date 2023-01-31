<script setup>
import { onMounted } from "vue";
import { useVehicle } from "@/stores/vehicle";

const store = useVehicle();

onMounted(store.getVehicles);
</script>

<template>
  <div class="flex flex-col mx-auto md:w-96 w-full">
    <h1 class="text-2xl font-bold mb-4 text-center">My vehicles</h1>

    <RouterLink
      :to="{ name: 'vehicles.create' }"
      class="btn btn-primary w-full"
    >
      Add vehicle
    </RouterLink>

    <div class="border-t h-[1px] my-6"></div>

    <div class="flex flex-col gap-2">
      <div
        v-for="vehicle in store.vehicles"
        :key="vehicle.id"
        class="flex bg-gray-100 w-full p-2 justify-between"
      >
        <div class="flex items-center overflow-hidden w-full">
          <div class="text-xl plate">
            {{ vehicle.plate_number }}
          </div>
          <div class="font-normal text-gray-600 pl-2 grow truncate">
            {{ vehicle.description }}
          </div>
        </div>
        <div class="flex gap-1">
          <RouterLink
            :to="{ name: 'vehicles.edit', params: { id: vehicle.id } }"
            class="btn btn-secondary text-sm"
          >
            Edit
          </RouterLink>
          <button
            type="button"
            @click="store.deleteVehicle(vehicle)"
            class="btn text-white bg-red-600 hover:bg-red-500 text-sm"
          >
            X
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
