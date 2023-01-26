<script setup>
import { defineProps } from "vue";
const props = defineProps(["errors", "field"]);
</script>

<template>
  <ul
    v-if="props?.errors?.value?.[props.field]?.length"
    class="flex flex-col text-red-600 gap-1"
  >
    <li v-for="message in props.errors.value[props.field]" :key="message">
      {{ message }}
    </li>
  </ul>
</template>
