import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useChangePassword = defineStore("change-password", () => {
  const errors = reactive({});
  const status = ref("");
  const loading = ref(false);
  const form = reactive({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  function resetForm() {
    form.current_password = "";
    form.password = "";
    form.password_confirmation = "";

    errors.value = {};
    status.value = "";
  }

  async function updatePassword() {
    loading.value = true;
    errors.value = {};
    status.value = "";

    return window.axios
      .put("password", form)
      .then(() => {
        status.value = "Password has been updated.";
      })
      .catch((error) => {
        if (error.response.status === 422) {
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => {
        form.current_password = "";
        form.password = "";
        form.password_confirmation = "";
        loading.value = false;
      });
  }

  return {
    form,
    loading,
    errors,
    resetForm,
    status,
    updatePassword,
  };
});
