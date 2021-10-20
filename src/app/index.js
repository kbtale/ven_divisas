import Vue from 'vue'
import Box from './components/box.vue'
import VueRouter from 'vue-router'
import "core-js/stable"
import "regenerator-runtime/runtime"
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
    copyToClipboard(text, successText, failText){
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
      textArea.value = text;

      document.body.appendChild(textArea);
      try {
        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        document.execCommand("copy");
        if (successText)
          this.createAlert(successText, "success")
      } catch (err) {
        console.log('Error: Unable to copy the text. ' + err);
        if (failText)
          this.createAlert(failText, "fail")
      }
      document.body.removeChild(textArea);
    },
    createAlert(text, aType){
      const alert = document.createElement("div");
      alert.className = `alert alert-${aType} alert-dismissible fade hide`;
      alert.setAttribute("role", "alert");
      alert.style.zIndex = "12";
      var content = document.createElement("h6");
      content.innerHTML = text;
      var closeBtn = document.createElement("button");
      closeBtn.setAttribute("type", "button");
      closeBtn.className = "btn-close";
      closeBtn.dataset.bsDismiss = "alert";
      closeBtn.setAttribute("aria-label", "Close");
      alert.insertAdjacentElement("afterbegin",content);
      alert.insertAdjacentElement("beforeend",closeBtn);
      if (!document.getElementById("AlertsContainer")) {
        var container = document.createElement("div");
        container.className = "position-fixed bottom-0 end-0 me-2";
        container.setAttribute("id","AlertsContainer");
        container.style.zIndex = "11";
        document.body.insertAdjacentElement("beforeend", container);
      } else {
        container = document.getElementById("AlertsContainer");
      }
      container.insertAdjacentElement("afterbegin", alert);
      setTimeout(function(){alert.classList.toggle("hide"); alert.classList.toggle("show")},350);
      setTimeout(function(){alert.classList.toggle("hide"); alert.classList.toggle("show")},4000);
      setTimeout(function(){alert.remove()},4350);
    }
  },
  render: h => h(Box)
})
