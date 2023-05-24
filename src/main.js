import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import "../src/assets/custom.css"

Vue.use(Vuetify);

Vue.config.productionTip = false

const vuetify = new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        mainBg: '#fff',
        btnBg: '#F2F2F2',
        primaryText: '#0F0F0F',
        secondaryText: '#787878',
        sheetBg: '#F2F2F2',
      },
      dark: {
        mainBg: '#0F0F0F',
        btnBg: '#272727',
        primaryText: '#F1F1F1',
        secondaryText: '#96AA9B',
        sheetBg: '#0F0F0F',
      }
    }
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
