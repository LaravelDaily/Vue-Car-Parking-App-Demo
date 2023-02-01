import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useParking = defineStore("parking", () => {
  const router = useRouter();
  const errors = reactive({});
  const loading = ref(false);
  const form = reactive({
    vehicle_id: null,
    zone_id: null,
  });

  function resetForm() {
    form.vehicle_id = null;
    form.zone_id = null;

    errors.value = {};
  }

  function startParking() {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    return window.axios
      .post("parkings/start", form)
      .then(() => {
        router.push({ name: "parkings.active" });
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => (loading.value = false));
  }

  return { form, errors, loading, resetForm, startParking };
});
