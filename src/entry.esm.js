import component from '@/vue3_jspreadsheet.vue';

export default /*#__PURE__*/(() => {
  // Get component instance
  const installable = component;

  // Attach install function executed by Vue.use()
  installable.install = (app) => {
    app.component('VueJSpreadsheet', installable);
  };
  return installable;
})();

