import Vue from 'vue'
import Box from './components/box.vue'
import VueRouter from 'vue-router'
import Converter from './components/converter.vue'
import Graphic from './components/historyGraphic.vue'
import Rates from './components/rates.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {path:'/rates', component:Rates, name:'rates'},
    {path:'/converter', component:Converter, name:'converter'},
    {path:'/graphic', component:Graphic, name:'graphic'},
    {path:"/:catchAll(.*)", redirect:{name:'converter'}}
  ]
})

const app = new Vue ({
  el: "#app",
  router,
  components: {
    Box,
    Converter,
    Graphic
  },
  methods: {
    copyToClipboard(){
      const textArea = document.createElement('textarea');
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = 0;
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      textArea.value = document.getElementsByName("symbol")[0].value;

      document.body.appendChild(textArea);
      try {
        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        document.execCommand("copy");
      } catch (err) {
        console.log('Error: Unable to copy the text. ' + err);
      }
      document.body.removeChild(textArea);
    }
  },
  render: h => h(Box)
})
