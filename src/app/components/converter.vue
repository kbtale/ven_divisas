<template>
  <form v-if="rates != undefined" class="card-body pt-3 justify-content-center" id="InputForms">
  <div class="row justify-content-center">
  <div class="col-7">
  <label for="base" class="form-label label-text">Ingrese la cantidad de divisas:</label>
    <div class="input-group mb-5 pb-5">
      <input type="number" name="base" v-model="currValue" class="form-control">
      <div class="btn-group dropend col-md-3 col-lg-2">
        <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><div class="fflag ff-md" :class="[`fflag-${rates[this.$parent.baseSelected].country_code}`]"></div> {{ rates[this.$parent.baseSelected].name }}</button>
        <ul class="dropdown-menu">
          <li v-for="(rate, i) in rates" :key="i"><a class="dropdown-item" href="#HeaderTitle" @click="changeBase(i)"><div class="fflag ff-md" :class="[`fflag-${rate.country_code}`]"></div> {{ rate.name }}</a></li>
        </ul>
      </div>
    </div>
  </div>
  </div>
  <div class="row justify-content-center">
  <div class="col-7">
    <label for="base" class="form-label label-text">Cantidad en Bolívares Soberanos:</label>
      <div class="input-group mb-5 pb-5">
        <input name="symbol" ref="symbol" v-model="base_in_VES" class="form-control form-control-lg col-4" disabled>
        <button class="btn btn-primary col-md-3 col-lg-2" type="button" @click="copyToClipboard()">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
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
import regeneratorRuntime from "regenerator-runtime";

export default ({
  data(){
    return{
      rates: this.$parent.rates,
      currValue: 1
    }
  },
  computed: {
    base_in_VES(){
      return ((parseFloat(this.rates[this.$parent.baseSelected].VES_per_unity * this.currValue).toFixed(2)).toString()).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  methods: {
    changeBase(index){
      this.$parent.baseSelected = index;
    },
    copyToClipboard(){
      this.$parent.$parent.copyToClipboard();
      /*const textArea = document.createElement('textarea');
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '2em';
      textArea.style.height = '2em';
      textArea.style.padding = 0;
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      textArea.value = e.value;

      document.body.appendChild(textArea);
      try {
        textArea.focus();
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        document.execCommand("copy");
      } catch (err) {
        console.log('Error: Unable to copy the text. ' + err);
      }
      document.body.removeChild(textArea);*/
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
