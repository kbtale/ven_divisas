<template>
  <div class="container">
  <div class="row justify-content-center m-3">
  <div class="btn-group btn-group-lg w-50 m-0 p-0 overflow-hidden rounded-pill shadow">
    <a v-for="(rate, i) in rates_lists" :key="i" class="btn btn-primary" :class="{'active': baseSelected == i}" aria-current="page" @click="changeBase(i)">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="transform-up" fill="currentColor" viewBox="0 0 16 16">
        <path :d="`${$parent.rates[i].svg}`"/>
      </svg>
      {{ $parent.rates[i].fullname }}
    </a>
  </div>
  </div>
  <div class="row justify-content-center p-0 ms-3 me-3">
    <h1 class="text-center p-3 h2 bg-primary bg-gradient text-white rounded-pill shadow user-select-none" role="button" @click="copyToClipboard($parent.rates[baseSelected].VES_per_unity, `Precio del ${$parent.rates[baseSelected].fullname} copiado correctamente`, `Hubo un problema al copiar el precio del ${$parent.rates[baseSelected].fullname}` )"> Promedio actual del {{$parent.rates[baseSelected].fullname}}: VES {{ $parent.formatToMoney($parent.rates[baseSelected].VES_per_unity) }} </h1>
  </div>
  <ul class="list-group overflow-hidden p-2 mb-5 ms-3 me-3 bg-light bg-gradient shadow-lg">
    <li class="row gx-0 p-4 m-3 bg-primary bg-gradient h5 text-white rounded-3">
      <div class="col-7 m-0 pl-3">Referencia</div>
      <div class="col-5 m-0  text-center">Precio</div>
    </li>
    <li v-for="(rate, i) in rates_lists[baseSelected]" class="row gx-0 p-4 m-3 align-items-center bg-light bg-gradient h5 border border-2 rounded" :key="i">
      <div class="col-6 pl-3"> <img class="transform-up" :src="`images/${$parent.references[i]}.svg`" width="32" :alt="`${$parent.references[i]} Logo`" /> {{ $parent.references[i] }} </div>
      <div class="col-5 text-center"> VES {{ $parent.formatToMoney(rate) }} </div>
      <button class="btn btn-primary col-1" type="button" @click="copyToClipboard(rate.toFixed(2), `Precio de ${$parent.references[i]} copiado al portapapeles.`, 'No se pudo copiar el precio.')">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="transform-up" viewBox="0 0 16 16">
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
          </svg>
      </button>
    </li>
  </ul>
  </div>
</template>
<script>
export default {
  data(){
    return {
      rates_lists: [
        this.$parent.USD_rates_list,
        this.$parent.EUR_rates_list
      ],
      baseSelected: 0
    }
  },
  methods: {
    changeBase(i) {
      this.baseSelected = i;
    },
    checkBase(i){
      if (this.baseSelected === i)
        return true;
      else
        return false;
    },
    copyToClipboard(toCopy,successText,failText){
      this.$parent.$parent.copyToClipboard(toCopy,successText,failText);
    }
  },
  mounted() {
    this.$parent.setExRate();
  }
}
</script>
