<template>
  <div class="home">
    <header>
      <h1>Vue Tab Complete Input</h1>
      <a>View the Docs</a>
    </header>

    <ExampleContainer :source="'HomeExample.vue'">
      <HomeExample />
    </ExampleContainer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeExample from "../components/HomeExample.vue";
import ExampleContainer from "../components/ExampleContainer.vue";

export default defineComponent({
  name: "App",
  components: {
    HomeExample,
    ExampleContainer
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
}

header {
  @apply p-8 text-center;
}

h1 {
  @apply my-8 text-3xl leading-8 font-extrabold tracking-tight text-gray-900;
}

a {
  @apply bg-indigo-600 px-8 py-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white transition duration-150 ease-in-out inline;
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
