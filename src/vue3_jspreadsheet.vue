<template>
  <div ref="sheetEl" />
</template>
<script>
import { ref, onMounted, watch } from "vue";
import jspreadsheet from "./local/jspreadsheet";
import "./local/jexcel.css";

export default {
  name: "VueJSpreadsheet",
  props: {
    options: {
      type: Object,
      require: false,
    },
    modelValue: {
      type: Array,
      require: false,
    },
  },
  setup(props, { emit }) {
    const options = props.options ? { ...props.options } : {};
    const data = props.modelValue ? props.modelValue : [];
    let localLock = false;
    // 2022/4/14 update, updating value when data array size changed (both column and row)
    watch(
      () => [
        props.modelValue,
        props.modelValue?.length,
        props.modelValue?.reduce((max, cur) => {
          if (cur.length > max) return cur.length;
        }, 0),
      ],
      (newValue, oldValue) => {
        console.log(localLock)
        // localLock 用來檢查資料更新是否來自於jspreadsheet的事件，是的話就不需要進行動作，並解除這次的localLock
        if (localLock) {
          localLock = false;
          return;
        }
        const column_max = newValue[0].reduce((sum, cur) => {
          return Math.max(sum, cur.length);
        }, 0);
        const origina_column_max = oldValue[0][0].length;
        const column_diff = column_max - origina_column_max;
        if (column_diff > 0) {
          sheetEl.value.jexcel.insertColumn(column_diff);
        }
        sheetEl.value.jexcel.setData(newValue[0], true);
      }
    );

    options.data = data;
    let sheet_columns = [];
    for (let i = 0; i < data.length; i++) {
      let row = data[i];
      for (let j = 0; j < row.length; j++) {
        let cell = row[j];
        let cell_length = 0;
        if (typeof cell === "string" && cell.includes("\n")) {
          let cells = cell.split("\n");
          // get the largest cell
          let max = "";
          for (let k = 0; k < cells.length; k++) {
            if (cells[k].length > max.length) {
              max = cells[k];
            }
          }
          cell_length = max.length;
        } else if (typeof cell === "string") {
          cell_length = cell.length;
        } else {
          cell_length = 3;
        }

        if (sheet_columns[j] === undefined) {
          sheet_columns[j] = cell_length;
        } else {
          sheet_columns[j] = Math.max(sheet_columns[j], cell_length);
        }
      }
    }

    if (typeof options.columns === "undefined") {
      options.columns = sheet_columns.map((e) => ({ width: e * 20 }));
    } else {
      sheet_columns.forEach((e, i) => {
        if (options.columns[i].editor !== undefined) {
          return;
        }
        if (options.columns[i] === undefined) {
          options.columns[i] = { width: e * 20 };
        }
      });
    }

    options.onbeforechange = function (el, cell, x, y, value) {
      const instance = el.jexcel;
      if (typeof props.options?.onbeforechange === "function") {
        return props.options.onbeforechange(instance, cell, x, y, value);
      }
    };

    // 需將bind value 透過 onchange 傳遞給Vue component

    options.onevent = function (el, ...args) {
      const instance = el.jexcel;
      if (typeof instance !== "object") return;
      let result = undefined;
      if (typeof props.options?.onevent === "function") {
        result = props.options.onevent(instance, ...args);
      }
      const data = instance.getData();
      localLock = true;
      emit("update:modelValue", data);
      return result;
    };
    options.onchange = function (el, cell, x, y, value) {
      const instance = el.jexcel;
      if (typeof props.options?.onchange === "function") {
        props.options.onchange(instance, cell, x, y, value);
      }
    };
    options.onafterchanges = function (el, cell, x, y, value) {
      const instance = el.jexcel;
      if (typeof props.options?.onafterchanges === "function") {
        props.options.onafterchanges(instance, cell, x, y, value);
      }
    };

    // 需將bind value 透過 onload 傳遞給Vue component
    options.onload = function (el, cell, x, y, value) {
      const instance = el.jexcel;
      if (typeof props.options?.onload === "function") {
        props.options.onload(instance, cell, x, y, value);
      }
      const data = instance.getData();
      localLock = true;
      emit("update:modelValue", data);
    };

    if (typeof options.minDimensions === "undefined") {
      options.minDimensions = [1, 5];
    }

    const sheetEl = ref(null);
    onMounted(() => {
      jspreadsheet(sheetEl.value, options);
    });

    return { sheetEl };
  },
};
</script>
