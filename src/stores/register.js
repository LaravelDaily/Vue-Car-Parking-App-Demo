import { reactive } from "vue";
import { defineStore } from "pinia";

export const useRegister = defineStore("register", () => {
  const form = reactive({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  function resetForm() {
    form.name = "";
    form.email = "";
    form.password = "";
    form.password_confirmation = "";
  }

  async function handleSubmit() {
    return window.axios.post("auth/register", form).then((response) => {
      console.log(response.data);
    });
  }

  return { form, resetForm, handleSubmit };
});
