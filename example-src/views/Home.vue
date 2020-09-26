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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeExample from "../components/HomeExample.vue";
import ExampleContainer from "../components/ExampleContainer.vue";
import Button from "../components/primitive/Button.vue";

export default defineComponent({
  name: "App",
  components: {
    HomeExample,
    ExampleContainer,
    Button
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

</style>
