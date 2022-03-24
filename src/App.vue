<script lang="ts">
export default {
  data() {
    return {
      name: "",
    };
  },
};
</script>
<template>
  <div class="flex items-center justify-center h-screen">
    <div>
      <h1 class="font-sans font-bold uppercase text-4xl text-center">
        Mets ton nom gros chien
      </h1>
      <input
        type="text"
        name="name"
        class="w-full my-6 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
        v-model="name"
      />
      <p v-if="name" class="text-xs text-slate-300">
        ({{ name }} mdrrr ca pue sa mere)
      </p>
      <button
        id="letsgo-button"
        class="w-full bg-purple-600 text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-purple-800 transition duration-300 disabled:bg-gray-300"
        :disabled="!name"
      >
        LET'S GOOOO
      </button>
    </div>
  </div>
</template>
