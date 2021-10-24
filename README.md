# A simple Vue3 wrapper for [JSpreadsheet](https://github.com/jspreadsheet/ce)

## Requirement
Obviously, you need to have your Vue3 properly configured.


## Install

### node environment
```zsh
npm install vue3_jspreadsheet
```
...or with yarn
```zsh
yarn add vue3_jspreadsheet
```

### CDN
Import js from unpkg.com:
```html
<script src="https://unpkg.com/vue3_jspreadsheet" />
```
also requires to get the global css setting (from JSpreadsheet & JSuites).
```html
<link rel="stylesheet" href="https://unpkg.com/vue3_jspreadsheet/dist/vue3_jspreadsheet.css"/>
```

## Usage
### Node
You'll need to import global css first from the app's entry js file, as such:
```javascript
import 'vue3_jspreadsheet/dist/vue3_jspreadsheet.css';
```
then just import the component when you need it, for example:
```html
<template>
  <VueJSpreadsheet v-model="data" />
</template>

<script>
import VueJSpreadsheet from 'vue3_jspreadsheet';
import {ref} from 'vue';

export default {
  components: {
    VueJSpreadsheet
  },
  setup() {
    const data = ref([
      [123,42,4124,"test"],
      [4,525,124,"geg"],
      [4241,"24",32]
    ]);
    return {data};
  },
}
</script>
```

