<script setup>
import { onMounted } from 'vue'
import { useRatesStore } from '@/app/stores/rates'

const store = useRatesStore()

onMounted(() => {
  store.fetchRates()
})
</script>

<template>
  <div class="main-wrapper d-flex align-items-center min-vh-100 py-3 py-md-5">
    <div class="container container-custom">
      <div class="row justify-content-center mx-0">
        <main class="card glass-card rounded-4 p-0 col-12 col-md-11 col-lg-10 shadow-lg border-0">
          <header class="card-header border-0 bg-transparent p-0 mt-2">
            <nav class="nav nav-pills nav-fill justify-content-center p-2 p-md-3 gap-1 gap-md-2" aria-label="Navegación principal">
              <li class="nav-item">
                <router-link class="nav-link premium-nav-link p-2 p-md-3 d-flex align-items-center justify-content-center gap-2" to="/rates">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-coin" viewBox="0 0 16 16">
                    <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path fill-rule="evenodd" d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                  </svg> 
                  <span class="d-none d-sm-inline">Precios</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link premium-nav-link p-2 p-md-3 d-flex align-items-center justify-content-center gap-2" to="/converter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
                    <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
                  </svg>
                  <span class="d-none d-sm-inline">Convertidor</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link premium-nav-link p-2 p-md-3 d-flex align-items-center justify-content-center gap-2" to="/graphic">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
                  </svg>
                  <span class="d-none d-sm-inline">Gráfico</span>
                </router-link>
              </li>
            </nav>
          </header>
          <div class="card-body p-3 p-md-4">
            <router-view v-slot="{ Component }">
              <transition name="page-fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.premium-nav-link {
  color: #64748b;
  font-weight: 500;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.premium-nav-link:hover {
  background: rgba(0, 97, 255, 0.05);
  color: #0061ff;
}

.router-link-active.premium-nav-link {
  background: #0061ff;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 97, 255, 0.3);
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>