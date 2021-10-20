<template>
  <div class="row justify-content-center row-rows-cols-1">
    <div class="card min-vh-50 rounded-3 p-0 col-11 col-md-9">
      <div class="card-header text-center p-0">
        <ul class="nav nav-fill justify-content-center p-2">
          <li class="nav-item">
          <router-link class="nav-link p-3 fadeInLeft" to="/rates">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-coin transform-up" viewBox="0 0 16 16">
            <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
            <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path fill-rule="evenodd" d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
          </svg> Precios de Divisas
          </router-link>
          </li>
          <li class="nav-item">
          <router-link class="nav-link p-3 fadeInLeft" to="/converter">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-shuffle" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
            <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
          </svg>
          Convertidor de Divisas
          </router-link>
          </li>
          <li class="nav-item">
          <router-link class="nav-link p-3 fadeInLeft" to="/graphic">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bar-chart-fill transform-up" viewBox="0 0 16 16">
            <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>
          </svg>
          Gráfico Histórico
          </router-link>
          </li>
        </ul>
      </div>
      <transition name="slide-fade" mode="out-in">
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
            country_code: 'US',
            fullname: 'Dólar',
            svg: 'M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z',
            color: 'rgba(133,187,101,1)'
          },
          {
            name: 'EUR',
            VES_per_unity: 0,
            country_code: 'EU',
            fullname: 'Euro',
            svg: 'M4 9.42h1.063C5.4 12.323 7.317 14 10.34 14c.622 0 1.167-.068 1.659-.185v-1.3c-.484.119-1.045.17-1.659.17-2.1 0-3.455-1.198-3.775-3.264h4.017v-.928H6.497v-.936c0-.11 0-.219.008-.329h4.078v-.927H6.618c.388-1.898 1.719-2.985 3.723-2.985.614 0 1.175.05 1.659.177V2.194A6.617 6.617 0 0 0 10.341 2c-2.928 0-4.82 1.569-5.244 4.3H4v.928h1.01v1.265H4v.928z',
            color: 'rgba(8,66,152,1)'
          },
          {
            name: 'COP',
            VES_per_unity: 0,
            country_code: 'CO',
            fullname: 'Peso Colombiano',
            color: 'rgba(255,205,57,1)'
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
      references: {
        local_bitcoins: "Local Bitcoins",
        dolar_today: "Dolar Today",
        exchange_rate: "Exchange Rate",
        bcv: "Banco Central de Venezuela"
      },
      baseSelected: 0
    }
  },
  methods: {
    setExRate(){
      const ex_rates = "https://api.exchangerate.host/latest?base=USD&symbols=VES,EUR,COP&places=2"

      const dt_rates = "https://s3.amazonaws.com/dolartoday/data.json"

      Promise.all([fetch(ex_rates), fetch(dt_rates)])
        .then(res => Promise.all(res.map(r => r.json())))
        .then(([ex_data, dt_data]) => {
        this.USD_rates_list.exchange_rate = ex_data.rates.VES;
        this.EUR_rates_list.exchange_rate = ex_data.rates.VES / ex_data.rates.EUR;
        this.rates.find(rate => rate.name === 'COP').VES_per_unity = ex_data.rates.VES / ex_data.rates.COP;

        this.USD_rates_list.local_bitcoins = dt_data.USD.bitcoin_ref;
        this.USD_rates_list.dolar_today = dt_data.USD.dolartoday;
        this.USD_rates_list.bcv = dt_data.USD.promedio_real;
        
        this.EUR_rates_list.local_bitcoins = dt_data.EUR.sicad1;
        this.EUR_rates_list.dolar_today = dt_data.EUR.dolartoday;
        this.EUR_rates_list.bcv = dt_data.EUR.promedio_real;

        this.rates.find(rate => rate.name === 'USD').VES_per_unity = this.meanObjectVaules(this.USD_rates_list)
        this.rates.find(rate => rate.name === 'EUR').VES_per_unity = this.meanObjectVaules(this.EUR_rates_list)
        })
    },
    meanObjectVaules(obj){
      return Object.values(obj).reduce((a, b) => a + b) / Object.keys(obj).length;
    },
    formatToMoney(f){
      return ((parseFloat(f).toFixed(2)).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  };
</script>