import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import Box from './components/box.vue'
import Converter from './components/converter.vue'
import Graphic from './components/historyGraphic.vue'
import Rates from './components/rates.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/rates', component: Rates, name: 'rates' },
    { path: '/converter', component: Converter, name: 'converter' },
    { path: '/graphic', component: Graphic, name: 'graphic' },
    { path: '/:catchAll(.*)', redirect: { name: 'converter' } }
  ]
})

const pinia = createPinia()
const app = createApp(Box)

app.use(router)
app.use(pinia)

app.config.globalProperties.copyToClipboard = async (text, successText, failText) => {
  try {
    await navigator.clipboard.writeText(text)
    if (successText) app.config.globalProperties.createAlert(successText, 'success')
  } catch (err) {
    console.error('Failed to copy: ', err)
    if (failText) app.config.globalProperties.createAlert(failText, 'fail')
  }
}

app.config.globalProperties.createAlert = (text, aType) => {
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
  
  let container = document.getElementById("AlertsContainer");
  if (!container) {
    container = document.createElement("div");
    container.className = "position-fixed bottom-0 end-0 me-2";
    container.setAttribute("id","AlertsContainer");
    container.style.zIndex = "11";
    document.body.insertAdjacentElement("beforeend", container);
  }
  
  container.insertAdjacentElement("afterbegin", alert);
  setTimeout(() => { alert.classList.toggle("hide"); alert.classList.toggle("show") }, 350);
  setTimeout(() => { alert.classList.toggle("hide"); alert.classList.toggle("show") }, 4000);
  setTimeout(() => { alert.remove() }, 4350);
}

app.mount('#app')
