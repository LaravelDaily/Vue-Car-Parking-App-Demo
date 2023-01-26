<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { useProfile } from "@/stores/profile";

const store = useProfile();

onMounted(store.fetchProfile);
onBeforeUnmount(store.resetForm);
</script>

<template>
  <form @submit.prevent="store.updateProfile">
    <div class="flex flex-col mx-auto md:w-96 w-full">
      <h1 class="text-2xl font-bold mb-4 text-center">Edit profile</h1>
      <div class="alert alert-success mb-4" v-show="store.status">
        {{ store.status }}
      </div>
      <div class="flex flex-col gap-2 mb-4">
        <label for="name" class="required">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          class="form-input"
          v-model="store.form.name"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="name" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="email" class="required">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="form-input"
          v-model="store.form.email"
          :disabled="store.loading"
        />
        <ValidationError :errors="store.errors" field="email" />
      </div>

      <div class="border-t h-[1px] my-6"></div>

      <button type="submit" class="btn btn-primary" :disabled="store.loading">
        <IconSpinner class="animate-spin" v-show="store.loading" />
        Update profile
      </button>
    </div>
  </form>
</template>
