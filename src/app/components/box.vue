<template>
  <div class="row justify-content-center row-rows-cols-1">
    <div class="card rounded-3 p-0 col-11 col-md-9">
      <div class="card-header text-center p-0">
        <ul class="nav nav-tabs pt-1">
          <li class="nav-item">
          <router-link class="nav-link p-3" to="/converter">Converter</router-link>
          </li>
          <li class="nav-item">
          <router-link class="nav-link p-3" to="/graphic">Graphic</router-link>
          </li>
        </ul>
      </div>
      <transition name="slide">
      <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
  export default {
  data(){
    return {
      rates: [
          {
            name: 'USD',
            VES_per_unity: 0,
            country_code: 'US'
          },
          {
            name: 'EUR',
            VES_per_unity: 0,
            country_code: 'EU'
          },
          {
            name: 'COP',
            VES_per_unity: 0,
            country_code: 'CO'
          }
      ],
      EUR_rates_list: {
        local_bitcoins: 0,
        dolar_today: 0,
        exchange_rate: 0,
        bcv: 0
      },
      USD_rates_list: {
        local_bitcoins: 0,
        dolar_today: 0,
        exchange_rate: 0,
        bcv: 0 
      },
      baseSelected: 0
    }
  },
  methods: {
    setExRate(){
      const ex_rates = "https://api.exchangerate.host/latest?base=USD&symbols=VES,EUR,COP"

      const dt_rates = "https://s3.amazonaws.com/dolartoday/data.json"

      Promise.all([fetch(ex_rates), fetch(dt_rates)])
        .then(res => Promise.all(res.map(r => r.json())))
        .then(([ex_data, dt_data]) => {
        console.log(dt_data)
        this.USD_rates_list.exchange_rate = ex_data.rates.VES;
        this.EUR_rates_list.exchange_rate = ex_data.rates.VES / ex_data.rates.EUR;
        this.rates.find(rate => rate.name === 'COP').VES_per_unity = ex_data.rates.VES / ex_data.rates.COP;

        this.USD_rates_list.local_bitcoins = dt_data.USD.localbitcoin_ref;
        this.USD_rates_list.dolar_today = dt_data.USD.dolartoday;
        this.USD_rates_list.bcv = dt_data.USD.promedio_real;
        
        this.EUR_rates_list.local_bitcoins = dt_data.EUR.sicad1;
        this.EUR_rates_list.dolar_today = dt_data.EUR.dolartoday;
        this.EUR_rates_list.bcv = dt_data.EUR.promedio_real;

        console.log("EUR: " + JSON.stringify(this.EUR_rates_list))
        this.rates.find(rate => rate.name === 'USD').VES_per_unity = this.meanObjectVaules(this.USD_rates_list)
        this.rates.find(rate => rate.name === 'EUR').VES_per_unity = this.meanObjectVaules(this.EUR_rates_list)
        })
    },
    meanObjectVaules(obj){
      return Object.values(obj).reduce((a, b) => a + b) / Object.keys(obj).length;
    }
  }
  };
</script>