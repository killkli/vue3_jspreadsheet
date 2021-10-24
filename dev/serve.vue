<script>
import { defineComponent } from 'vue';
import VueJSpreadsheet from '@/vue3_jspreadsheet.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    VueJSpreadsheet
  }
});
</script>

<template>
  <div id="app">
    <VueJSpreadsheet />
  </div>
</template>
