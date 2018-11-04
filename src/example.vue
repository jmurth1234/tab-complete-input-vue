<template>
  <div id="app">
    <h1>Tab Complete Input - Demo</h1>
    <p>All examples use the following list of data: {{ staticList }}</p>
    <p>The dynamic examples additionally the following list of data: {{ commandList }}</p>

    <h2>Static List</h2>
    <p>This accesses the array directly</p>
    <p><tab-complete-input v-model="text[0]" :data-source="staticList" :format="getFormat" /></p>
    <p>Content: {{ text[0] }}</p>

    <h2>External Tab Example</h2>
    <p>This demonstrates use of an external tabbing method</p>
    <p><tab-complete-input ref='externalInput' v-model="text[1]" :data-source="staticList" :format="getFormat" /></p>
    <button @click="tab">Tab</button>
    <p>Content: {{ text[1] }}</p>

    <h2>Dynamic Data</h2>
    <p>In order to simulate network activity, this adds a delay</p>
    <p><tab-complete-input v-model="text[2]" :data-source="exampleData" /></p>
    <p>Content: {{ text[2] }}</p>

    <h2>Dynamic Data with Promises</h2>
    <p>The same as the previous dynamic data example, but with added promises</p>
    <p><tab-complete-input v-model="text[3]" :data-source="asyncData" /></p>
    <p>Content: {{ text[3] }}</p>

    <h2>External Listener Example</h2>
    <p>This demonstrates use of an event listener (press enter to display text) </p>
    <p><tab-complete-input ref='externalInput' v-model="text[4]" :data-source="staticList" :format="getFormat" v-on:keydown.13="enterText" v-on:keydown="logCurrent"/></p>
    <p>Content: {{ enteredText }}</p>

    <hr />

    <p><a href="https://github.com/rymate1234/tab-complete-input-vue">View the source on GitHub</a></p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      text: ['', '', '', '', ''], 
      staticList: ["John", "Jake", "Joe", "Noah", "Emma", "Will", "William", "Andrew", "Brady", "Ethan", "Dan", "Daniel", "Danny"],
      commandList: ["/help", "/msg", "/mode", "/me", "/join", "/part", "/kick", "/quit", "/quiet"],
      enteredText: ''
    }
  }, 
  methods: {
    sleep (milliseconds) {
      // bad practice be here
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
          break;
        }
      }
    },
    tab (e) {
      this.$refs.externalInput.tabComplete(e)
    },
    enterText () {
      this.enteredText = this.text[4]
      this.text[4] = ''
    },
    logCurrent () {
      console.log('Current Value:', this.text[4])
    },
    exampleData (word, position) {
      this.sleep(400);
      if (word.startsWith("/") && position == 0)
        return this.commandList;

      return this.staticList;
    }, 
    asyncData (word, position) {
      if (word.startsWith("/") && position == 0)
        return Promise.resolve(this.commandList).then(this.delayPromise(500));

      return Promise.resolve(this.staticList).then(this.delayPromise(500));
    }, 
    delayPromise (duration) {
      return function(...args){
        return new Promise(function(resolve, reject){
          setTimeout(function(){
            resolve(...args);
          }, duration)
        });
      };
    },
    getFormat (word, prev, position) {
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
