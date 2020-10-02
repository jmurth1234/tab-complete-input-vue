<template>
  <div>
    <header class="main">
      <h1>
        {{
          $route.path === "/docs" ? "Documentation" : "Vue Tab Complete Input"
        }}
      </h1>

      <Button v-if="$route.path === '/'" to="/docs">
        <span>View the Docs</span>
      </Button>

      <Button v-if="$route.path === '/docs'" to="/">
        <span>Back</span>
      </Button>

      <Button
        href="https://github.com/rymate1234/tab-complete-input-vue"
        target="_blank"
      >
        <span>GitHub</span>
      </Button>
    </header>

    <router-view />
  </div>
</template>

<script>
import Button from "./components/primitive/Button.vue";

export default {
  components: { Button }
};
</script>

<style scoped>
#nav {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
