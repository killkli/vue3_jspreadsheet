<script>
import { defineComponent, ref } from 'vue';
import VueJSpreadsheet from '@/vue3_jspreadsheet.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    VueJSpreadsheet
  },
  setup() {
    const tableData = ref([
      ['a', 'b'],
      ['d', 'e'],
      ['g', 'h']
    ]);
    const setting = ref({
      filters: false,
      search: true,
      pagination: 15,
      paginationOptions: [15, 20, 30, 40]
    })
    const testFunc = () => {
      tableData.value = [
        ['A1', 'B1', 'C1'],
        [1, 2, 3],
        [4, 5, 6]
      ];
    }
    return {
      tableData, testFunc, setting
    }
  }
});
</script>

<template>
  <div id="app">
    <VueJSpreadsheet v-model="tableData" :options="setting" />
    <button @click="testFunc">test</button>
  </div>
</template>
