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

    <div>There will be our vehicles list.</div>
  </div>
</template>
