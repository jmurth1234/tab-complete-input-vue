<template>
  <div id="app">
    <h1>Tab Complete Input - Demo</h1>
    <p>Both examples use the following list of data: {{ staticList }}</p>

    <h2>Static List</h2>
    <p>This accesses the array directly</p>
    <p><tab-complete-input v-model="text" :dataSource="staticList" :format="getFormat" /></p>
    <p>Content: {{ text }}</p>
    <h2>Dynamic Data</h2>
    <p>In order to simulate network activity, this adds a delay</p>
    <p><tab-complete-input v-model="text2" :dataSource="exampleData" /></p>
    <p>Content: {{ text2 }}</p>

    <hr />

    <p><a href="https://github.com/rymate1234/tab-complete-input-vue">View the source on GitHub</a></p>
  </div>
</template>

<script>
import TabCompleteInput from "./tab-complete-input"

export default {
  components: {
    TabCompleteInput
  },
  name: 'app',
  data () {
    return {
      text: '', 
      text2: '', 
      staticList: ["John", "Jake", "Joe", "Noah", "Emma", "Will", "William", "Andrew", "Brady", "Ethan", "Dan", "Daniel", "Danny"],
      commandList: ["/help", "/msg", "/mode", "/me", "/join", "/part", "/kick", "/quit", "/quiet"] 
    }
  }, 
  methods: {
    sleep: function (milliseconds) {
      // bad practice be here
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
      }
    },
    exampleData: function (word) {
      this.sleep(400);
      if (word.startsWith("/"))
        return this.commandList;

      return this.staticList;
    }, 
    getFormat: function(word, prev, position) {
      if (position === 0 || position > 0 && prev.search(",") != -1) {
        word = word + ": ";
      } else if (position > 0 && prev.search(":") != -1) {
        word = word + ": ";
        prev = prev.replace(":", ",");
      }
      return { word: word, prev: prev };
    }, 

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  width: 600px;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
