# Lesson 14 - Delete vehicle

The final function left to implement for vehicles crud is the delete button functionality in the index view which is very quick.

1. Extend vehicle store `src/stores/vehicle.js`.

```js
function deleteVehicle(vehicle) {
  window.axios.delete(`vehicles/${vehicle.id}`).then(getVehicles);
}
```

Then add it to the return statement:

```js
return {
  // ...
  updateVehicle,
  getVehicle,
  deleteVehicle,
};
```

When the delete method `deleteVehicle()` method is successful it will re-fetch the vehicles list and the index view will be rerendered.

Now our `src/stores/vehicle.js` store should look like this:

```js
import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useVehicle = defineStore("vehicle", () => {
  const router = useRouter();
  const errors = reactive({});
  const loading = ref(false);
  const vehicles = ref([]);
  const form = reactive({
    plate_number: "",
    description: "",
  });

  function resetForm() {
    form.plate_number = "";
    form.description = "";

    errors.value = {};
  }

  function getVehicles() {
    return window.axios
      .get("vehicles")
      .then((response) => (vehicles.value = response.data.data));
  }

  function storeVehicle() {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    window.axios
      .post("vehicles", form)
      .then(() => {
        router.push({ name: "vehicles.index" });
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => (loading.value = false));
  }

  function updateVehicle(vehicle) {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    window.axios
      .put(`vehicles/${vehicle.id}`, form)
      .then(() => {
        router.push({ name: "vehicles.index" });
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => (loading.value = false));
  }

  function getVehicle(vehicle) {
    window.axios.get(`vehicles/${vehicle.id}`).then((response) => {
      form.plate_number = response.data.data.plate_number;
      form.description = response.data.data.description;
    });
  }

  function deleteVehicle(vehicle) {
    window.axios.delete(`vehicles/${vehicle.id}`).then(getVehicles);
  }

  return {
    form,
    errors,
    loading,
    resetForm,
    storeVehicle,
    vehicles,
    getVehicles,
    updateVehicle,
    getVehicle,
    deleteVehicle,
  };
});
```

2. Update the delete button in the `src/views/Vehicles/IndexView.vue` component from:

```vue
<button
  type="button"
  class="btn text-white bg-red-600 hover:bg-red-500 text-sm"
>
  X
</button>
```

to:

```vue
<button
  type="button"
  @click="store.deleteVehicle(vehicle)"
  class="btn text-white bg-red-600 hover:bg-red-500 text-sm"
>
  X
</button>
```

Full `src/views/Vehicles/IndexView.vue` content.

```vue
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
```

Congratulations, you just finished implementing full functionality for users' vehicles. But let's not stop there, move forward to the next lesson and implement parking.