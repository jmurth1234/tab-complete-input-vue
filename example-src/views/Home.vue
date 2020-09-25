<template>
  <div class="home">
    <h1>Vue Tab Complete Input</h1>
    <a>View the Docs</a>

    <h2>Example</h2>
    <BasicExample />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BasicExample from "../components/BasicExample.vue";

export default defineComponent({
  name: "App",
  components: {
    BasicExample
  }
});
</script>

<style lang="postcss" scoped>
.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;

  max-width: 800px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
}

h1 {
  text-align: center;
  @apply my-8 text-3xl leading-8 font-extrabold tracking-tight text-gray-900;
}

h2 {
  @apply mt-8 text-2xl leading-8 font-extrabold tracking-tight text-gray-900;
}

a {
  @apply bg-indigo-600 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white transition duration-150 ease-in-out inline;
}

a:hover {
  @apply bg-indigo-500;
}

a:active {
  @apply bg-indigo-700;
}

a:focus {
  @apply border-indigo-700 outline-none shadow-outline-indigo;
}

</style>
