import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useVehicle = defineStore("vehicle", () => {
  const router = useRouter();
  const errors = reactive({});
  const loading = ref(false);
  const form = reactive({
    plate_number: "",
    description: "",
  });

  function resetForm() {
    form.plate_number = "";
    form.description = "";

    errors.value = {};
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

  return { form, errors, loading, resetForm, storeVehicle };
});
