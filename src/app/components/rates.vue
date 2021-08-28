<template>
  
</template>
<script>
export default {
  data(){
    return {
      USD_rates_list: this.$parent.USD_rates_list,
      EUR_rates_list: this.$parent.EUR_rates_list,
      baseSelected: 0
    }
  },
  mounted() {
    this.$parent.setExRate();
  }
}
</script>
