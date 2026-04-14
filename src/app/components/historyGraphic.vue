<script setup>
import { onMounted, onUnmounted, ref, watch, computed } from 'vue'
import Chart from 'chart.js/auto'
import dayjs from 'dayjs'
import { useRatesStore } from '@/app/stores/rates'

const store = useRatesStore()
const chartCanvas = ref(null)
let chartInstance = null

const labels = ref([])
const datasets = ref([])
const loading = ref(false)

const activeBaseName = computed(() => store.currentBase.name)

const fetchData = async () => {
  loading.value = true
  try {
    const res = await fetch('https://ve.dolarapi.com/v1/historicos/dolares/oficial')
    const historyData = await res.json()

    if (Array.isArray(historyData)) {
      const sortedData = historyData
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        .slice(-30)

      labels.value = sortedData.map(d => dayjs(d.fecha).format('DD MMM'))
      
      const dataPoints = sortedData.map(d => d.promedio)

      datasets.value = [{
        label: `Precio BCV (Official)`,
        data: dataPoints,
        borderColor: store.currentBase.color || '#0061ff',
        backgroundColor: (store.currentBase.color || '#0061ff') + '15',
        fill: true,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 2,
        pointHoverRadius: 5
      }]
      
      updateChart()
    }
  } catch (err) {
    console.error("Error fetching historical data:", err)
  } finally {
    loading.value = false
  }
}

const initChart = () => {
  if (!chartCanvas.value) return
  
  const ctx = chartCanvas.value.getContext('2d')
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels.value,
      datasets: datasets.value
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            usePointStyle: true,
            boxWidth: 10
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(0,0,0,0.05)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    }
  })
}

const updateChart = () => {
  if (chartInstance) {
    chartInstance.data.labels = labels.value
    chartInstance.data.datasets = datasets.value
    chartInstance.update()
  } else {
    initChart()
  }
}

watch(() => store.baseSelected, () => {
  fetchData()
})

onMounted(() => {
  fetchData()
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<template>
  <div class="history-container p-2">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-2 text-muted">Consultando registro histórico...</p>
    </div>
    
    <div class="row justify-content-center">
      <div class="col-12 col-md-10">
        <div class="chart-container glass-effect p-3 p-md-4 rounded-4 border shadow-sm position-relative" style="height: 400px;">
          <canvas 
            ref="chartCanvas" 
            role="img" 
            aria-label="Gráfico de tendencia de precios de los últimos 30 días"
          >
            Tu navegador no soporta el elemento de gráfico. La tendencia muestra la variación del precio del Bolívar en el último mes.
          </canvas>
        </div>
      </div>
    </div>
    
    <div class="alert alert-info mt-4 rounded-3 border-0 shadow-sm" style="background: rgba(0, 97, 255, 0.05); color: #004dc9;">
      <div class="d-flex align-items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
        </svg>
        <span class="small fw-medium">Gráfico basado en los últimos 30 registros oficiales del BCV.</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-wrapper {
  position: relative;
  width: 100%;
}
.opacity-50 {
  opacity: 0.5;
  pointer-events: none;
}
</style>
>