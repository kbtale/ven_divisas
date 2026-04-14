import { defineStore } from 'pinia'

export const useRatesStore = defineStore('rates', {
  state: () => ({
    rates: [
      { name: 'USD', VES_per_unity: 0, country_code: 'US', fullname: 'Dólar', color: '#85bb65', icon: 'usd-circle' },
      { name: 'EUR', VES_per_unity: 0, country_code: 'EU', fullname: 'Euro', color: '#084298', icon: 'euro-circle' },
      { name: 'COP', VES_per_unity: 0, country_code: 'CO', fullname: 'Peso Colombiano', color: '#ffcd39', icon: 'dollar-circle' }
    ],
    USD_rates_list: { local_bitcoins: 0, dolar_today: 0, exchange_rate: 0, bcv: 0 },
    EUR_rates_list: { local_bitcoins: 0, dolar_today: 0, exchange_rate: 0, bcv: 0 },
    baseSelected: 0,
    loading: false,
    lastUpdated: null
  }),

  getters: {
    currentBase: (state) => state.rates[state.baseSelected],
    activeRatesList: (state) => {
      const base = state.rates[state.baseSelected].name
      return base === 'USD' ? state.USD_rates_list : (base === 'EUR' ? state.EUR_rates_list : {})
    }
  },

  actions: {
    async fetchRates() {
      this.loading = true
      try {
        const ve_url = "https://ve.dolarapi.com/v1/dolares"
        const ve_eur_url = "https://ve.dolarapi.com/v1/euros"
        const co_url = "https://co.dolarapi.com/v1/trm"

        const [ve_res, ve_eur_res, co_res] = await Promise.all([
          fetch(ve_url).then(r => r.json()).catch(() => []),
          fetch(ve_eur_url).then(r => r.json()).catch(() => []),
          fetch(co_url).then(r => r.json()).catch(() => null)
        ])

        if (Array.isArray(ve_res)) {
          const bcv = ve_res.find(r => r.fuente === 'oficial')
          const paralelo = ve_res.find(r => r.fuente === 'paralelo')

          if (bcv) {
            this.USD_rates_list.bcv = bcv.promedio
            this.rates[0].VES_per_unity = bcv.promedio
          }
          if (paralelo) {
            this.USD_rates_list.exchange_rate = paralelo.promedio
            this.USD_rates_list.dolar_today = paralelo.promedio
          }
        }

        if (Array.isArray(ve_eur_res)) {
          const bcv = ve_eur_res.find(r => r.fuente === 'oficial')
          const paralelo = ve_eur_res.find(r => r.fuente === 'paralelo')

          if (bcv) {
            this.EUR_rates_list.bcv = bcv.promedio
            this.rates[1].VES_per_unity = bcv.promedio
          }
          if (paralelo) {
            this.EUR_rates_list.exchange_rate = paralelo.promedio
            this.EUR_rates_list.dolar_today = paralelo.promedio
          }
        }

        const v_usd = this.rates[0].VES_per_unity
        const c_usd = co_res?.valor

        if (v_usd > 0 && c_usd > 0) {
          const cop = this.rates.find(r => r.name === 'COP')
          if (cop) cop.VES_per_unity = v_usd / c_usd
        }

        this.lastUpdated = new Date().toLocaleTimeString()
      } catch (error) {
        console.error("Failed to fetch rates:", error)
      } finally {
        this.loading = false
      }
    },

    setBase(index) {
      this.baseSelected = index
    }
  }
})
