<script setup>
import { ref, computed } from 'vue'
import { useRatesStore } from '@/app/stores/rates'
import { showToast } from '@/app/utils/toast'

const store = useRatesStore()
const baseSelected = ref(0)

const references = {
  exchange_rate: "Monitor Paralelo",
  dolar_today: "EnParaleloVzla",
  bcv: "Banco Central (BCV)"
}

const activeRates = computed(() => {
  const source = baseSelected.value === 0 ? store.USD_rates_list : store.EUR_rates_list
  return Object.fromEntries(
    Object.entries(source).filter(([_, val]) => val > 0)
  )
})

const currentBase = computed(() => store.rates[baseSelected.value])

const formatToMoney = (value) => {
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'VES',
    minimumFractionDigits: 2
  }).format(value || 0)
}

const copyToClipboard = async (text, successMsg) => {
  try {
    await navigator.clipboard.writeText(text.toString())
    showToast(successMsg || 'Copiado al portapapeles.')
  } catch (err) {
    showToast('No se pudo copiar.', 'error')
  }
}
</script>

<template>
  <div class="rates-container">
    <div class="row justify-content-center mb-4">
      <div class="col-12 col-md-8">
        <div class="btn-group w-100 shadow-sm rounded-3 overflow-hidden">
          <button 
            v-for="(rate, i) in [store.rates[0], store.rates[1]]" 
            :key="i"
            class="btn py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
            :class="baseSelected === i ? 'btn-primary' : 'btn-outline-primary'"
            @click="baseSelected = i"
          >
            <div class="fflag ff-md" :class="[`fflag-${rate.country_code}`]"></div>
            {{ rate.fullname }}
          </button>
        </div>
      </div>
    </div>

    <div class="row justify-content-center mb-5">
      <div class="col-12 col-md-10 text-center">
        <div 
          class="promedio-badge p-4 rounded-4 shadow-sm border-0 bg-primary bg-gradient text-white"
          role="button"
          tabindex="0"
          @click="copyToClipboard(currentBase.VES_per_unity.toFixed(2), `Precio del ${currentBase.fullname} copiado.`)"
          @keydown.enter="copyToClipboard(currentBase.VES_per_unity.toFixed(2), `Precio del ${currentBase.fullname} copiado.`)"
          :aria-label="`Promedio actual ${currentBase.fullname}: ${formatToMoney(currentBase.VES_per_unity)}. Haz clic para copiar.`"
        >
          <h2 class="mb-0 h4 opacity-75">Promedio actual {{ currentBase.fullname }}</h2>
          <div class="display-5 fw-bold mt-2" aria-live="polite">
            {{ formatToMoney(currentBase.VES_per_unity) }}
          </div>
        </div>
      </div>
    </div>

    <div class="rates-list glass-effect rounded-4 overflow-hidden border" role="list" aria-label="Lista de referencias de precios">
      <div class="list-header d-flex p-3 bg-light border-bottom fw-bold text-muted" aria-hidden="true">
        <div class="flex-grow-1">Referencia</div>
        <div class="text-center" style="width: 150px;">Precio</div>
        <div style="width: 50px;"></div>
      </div>
      
      <div v-for="(val, key) in activeRates" :key="key" class="rate-item d-flex align-items-center p-3 border-bottom hover-bg" role="listitem">
        <div class="flex-grow-1 d-flex align-items-center gap-3">
          <div class="ref-icon rounded-circle bg-white shadow-sm d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;" aria-hidden="true">
            <span class="fw-bold text-primary">{{ references[key]?.charAt(0) }}</span>
          </div>
          <span class="fw-medium">{{ references[key] }}</span>
        </div>
        <div class="text-center fw-bold" style="width: 150px;" :aria-label="`Precio: ${formatToMoney(val)}`">
          {{ formatToMoney(val) }}
        </div>
        <div class="text-end" style="width: 50px;">
          <button 
            class="btn btn-sm btn-link text-primary p-0" 
            @click="copyToClipboard(val.toFixed(2))"
            :aria-label="`Copiar precio de ${references[key]}`"
            title="Copiar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.promedio-badge {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}
.promedio-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 97, 255, 0.25) !important;
}

.glass-effect {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.hover-bg {
  transition: background-color 0.2s ease;
}
.hover-bg:hover {
  background-color: rgba(0, 97, 255, 0.02);
}

.ref-icon {
  font-size: 0.9rem;
}
</style>
