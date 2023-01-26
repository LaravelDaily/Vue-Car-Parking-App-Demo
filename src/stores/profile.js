import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useProfile = defineStore("profile", () => {
  const errors = reactive({});
  const status = ref("");
  const loading = ref(false);
  const form = reactive({
    name: "",
    email: "",
  });

  function resetForm() {
    form.name = "";
    form.email = "";

    errors.value = {};
    status.value = "";
  }

  async function fetchProfile() {
    return window.axios.get("profile").then((response) => {
      form.name = response.data.name;
      form.email = response.data.email;
    });
  }

  async function updateProfile() {
    loading.value = true;
    errors.value = {};
    status.value = "";

    return window.axios
      .put("profile", form)
      .then((response) => {
        form.name = response.data.name;
        form.email = response.data.email;
        status.value = "Profile has been updated.";
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }

  return {
    form,
    loading,
    errors,
    resetForm,
    status,
    fetchProfile,
    updateProfile,
  };
});
