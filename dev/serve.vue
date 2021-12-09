<script>
import { defineComponent, ref } from 'vue';
import VueJSpreadsheet from '@/vue3_jspreadsheet.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    VueJSpreadsheet
  },
  setup() {
    const tableData = ref([['A1', 'B1', 'C1'],
        [1,2,3],
        [4,5,6],['A1', 'B1', 'C1'],
        [1,2,3],
        [4,5,6],['A1', 'B1', 'C1'],
        [1,2,3],
        [4,5,6]]);
    const setting = ref({
      filters: true,
    })
    const testFunc = ()=>{
      tableData.value = [
        ['A1', 'B1', 'C1'],
        [1,2,3],
        [4,5,6]
        ];
    }
    console.log(tableData);
    return {
      tableData,testFunc,setting
    }
  }
});
</script>

<template>
  <div id="app">
    <VueJSpreadsheet v-model="tableData" :options="setting"/>
    <button @click="testFunc">test</button>
  </div>
</template>
