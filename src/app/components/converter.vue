<script setup>
import { ref, computed } from 'vue'
import { useRatesStore } from '@/app/stores/rates'
import { showToast } from '@/app/utils/toast'

const store = useRatesStore()
const currValue = ref(1)

// Formatting helper
const formatToMoney = (value) => {
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'VES',
    minimumFractionDigits: 2
  }).format(value || 0)
}

const base_in_VES = computed(() => {
  const currentRate = store.rates[store.baseSelected]?.VES_per_unity || 0
  return parseFloat(currentRate * currValue.value)
})

const base_in_VES_formatted = computed(() => formatToMoney(base_in_VES.value))

const changeBase = (index) => {
  store.setBase(index)
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text.toString())
    showToast('Cantidad copiada correctamente.')
  } catch (err) {
    showToast('La cantidad no se pudo copiar.', 'error')
  }
}

const inputNumbers = (evt) => {
  const charCode = (evt.which) ? evt.which : evt.keyCode
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    evt.preventDefault()
  }
}
</script>

<template>
  <form v-if="store.rates.length > 0" class="card-body pt-3 justify-content-center" id="InputForms">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8">
        <label for="base" class="form-label label-text">Ingrese la cantidad de divisas:</label>
        <div class="input-group mb-4">
          <input 
            type="text" 
            name="base" 
            v-model.number="currValue" 
            @keypress="inputNumbers" 
            class="form-control form-control-lg"
            placeholder="0.00"
          >
          <div class="btn-group">
            <button 
              class="btn btn-primary dropdown-toggle d-flex align-items-center gap-2" 
              type="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              <div class="fflag ff-md" :class="[`fflag-${store.currentBase.country_code}`]"></div> 
              {{ store.currentBase.name }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li v-for="(rate, i) in store.rates" :key="i">
                <a class="dropdown-item d-flex align-items-center gap-2" href="#" @click.prevent="changeBase(i)">
                  <div class="fflag ff-md" :class="[`fflag-${rate.country_code}`]"></div> 
                  {{ rate.name }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-12 col-md-8">
        <label for="ves" class="form-label label-text">Cantidad en Bolívares Soberanos:</label>
        <div class="input-group mb-3">
          <input 
            name="ves" 
            v-model="base_in_VES_formatted" 
            class="form-control form-control-lg bg-light" 
            disabled
          >
          <button 
            class="btn btn-outline-primary d-flex align-items-center gap-2" 
            type="button" 
            @click="copyToClipboard(base_in_VES.toFixed(2))"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
            </svg>
            Copiar
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.label-text {
  font-weight: 600;
  color: #4a5568;
}
.btn-group .btn {
  min-width: 120px;
}
</style>
