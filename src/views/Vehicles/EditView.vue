<script setup>
import { watchEffect, onBeforeUnmount } from "vue";
import { useVehicle } from "@/stores/vehicle";
import { useRoute } from "vue-router";

const store = useVehicle();
const route = useRoute();

onBeforeUnmount(store.resetForm);

watchEffect(async () => {
  store.getVehicle({ id: route.params.id });
});
</script>

<template>
  <form
    @submit.prevent="store.updateVehicle({ id: route.params.id })"
    novalidate
  >
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Edit vehicle</h1>
      <div class="flex flex-col gap-2 mb-4">
        <label for="plate_number" class="required">License plate</label>
        <input
          v-model="store.form.plate_number"
          id="plate_number"
          name="plate_number"
          type="text"
          class="form-input plate"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="plate_number" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="description">Description</label>
        <input
          v-model="store.form.description"
          id="description"
          name="description"
          type="text"
          class="form-input"
          placeholder="My Ferrari, Big truck, Rental"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="description" />
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <div class="flex gap-2">
        <button
          type="submit"
          class="btn btn-primary w-full"
          :disabled="store.loading"
        >
          <IconSpinner class="animate-spin" v-show="store.loading" />
          Update vehicle
        </button>
        <RouterLink :to="{ name: 'vehicles.index' }" class="btn btn-secondary">
          Cancel
        </RouterLink>
      </div>
    </div>
  </form>
</template>
