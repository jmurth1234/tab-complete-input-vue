<template>
  <div class="home">
    <header>
      <h1>Vue Tab Complete Input</h1>

      <div class="buttons">
        <Button to="/docs">View the Docs</Button>
        <Button
          href="https://github.com/rymate1234/tab-complete-input-vue"
          target="_blank"
        >
          GitHub
        </Button>
      </div>
    </header>

    <ExampleContainer :source="'HomeExample.vue'">
      <HomeExample />
    </ExampleContainer>

    <h2>Downloading</h2>

    <div class="ex-container">
      <Source language="bash" source="yarn add vue-tab-complete-input" />
    </div>

    <h2>Using</h2>

    <div class="ex-container">
      <Source language="html" :source="str" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
import HomeExample from "../components/HomeExample.vue";
import ExampleContainer from "../components/ExampleContainer.vue";
import Button from "../components/primitive/Button.vue";

export default defineComponent({
  name: "App",
  components: {
    HomeExample,
    ExampleContainer,
    Button,
    Source: defineAsyncComponent(async () => {
      const component = await import("../components/Source.vue");

      return component.default;
    })
  },
  data() {
    return {
      str: require("!!raw-loader!../snippets/example.html").default
    }
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
  @apply p-4 text-center;
}

h1 {
  @apply my-4 text-3xl leading-8 font-extrabold tracking-tight text-gray-900;
}

h2 {
  @apply mt-8 mb-2 text-2xl leading-8 font-extrabold tracking-tight text-gray-800;
}

.ex-container {
  @apply rounded shadow-sm z-10 bg-gray-200 p-2;
}
</style>
