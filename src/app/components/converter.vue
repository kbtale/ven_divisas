<template>
  <form v-if="rates != undefined" class="card-body pt-3 justify-content-center" id="InputForms">
  <div class="row justify-content-center">
  <div class="col-7">
  <label for="base" class="form-label label-text">Ingrese la cantidad de divisas:</label>
    <div class="input-group mb-5 pb-5">
      <input type="text" name="base" v-model.number="currValue" @keypress="inputNumbers" class="form-control">
      <div class="btn-group dropend col-md-3 col-lg-2">
        <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><div class="fflag ff-md transform-up" :class="[`fflag-${rates[this.$parent.baseSelected].country_code}`]"></div> {{ rates[this.$parent.baseSelected].name }}</button>
        <ul class="dropdown-menu">
          <li v-for="(rate, i) in rates" :key="i"><a class="dropdown-item" href="#HeaderTitle" @click="changeBase(i)"><div class="fflag ff-md transform-up" :class="[`fflag-${rate.country_code}`]"></div> {{ rate.name }}</a></li>
        </ul>
      </div>
    </div>
  </div>
  </div>
  <div class="row justify-content-center">
  <div class="col-7">
    <label for="base" class="form-label label-text">Cantidad en Bolívares Soberanos:</label>
      <div class="input-group mb-5 pb-5">
        <input name="symbol" ref="symbol" v-model="base_in_VES_formatted" class="form-control form-control-lg col-4" disabled>
        <button class="btn btn-primary col-md-3 col-lg-2" type="button" @click="copyToClipboard(base_in_VES, 'Cantidad copiada correctamente.', 'La cantidad no se pudo copiar.')">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="transform-up" viewBox="0 0 16 16">
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

<script>
export default ({
  data(){
    return{
      rates: this.$parent.rates,
      currValue: 1
    }
  },
  computed: {
    base_in_VES(){
      return parseFloat(this.rates[this.$parent.baseSelected].VES_per_unity * this.currValue);
    },
    base_in_VES_formatted(){
      return this.$parent.formatToMoney(this.base_in_VES);
    }
  },
  methods: {
    changeBase(index){
      this.$parent.baseSelected = index;
    },
    copyToClipboard(toCopy, successText, failText){
      this.$parent.$parent.copyToClipboard(toCopy, successText, failText);
    },
    inputNumbers(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
  },
  mounted(){
    this.$emit('changeBase',this.baseSelected);
  },
  created(){
    this.$parent.setExRate();
  }
})
</script>
