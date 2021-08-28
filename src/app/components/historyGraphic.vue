<template>
  <div>
      <div v-for="(rate, i) in this.$parent.rates" class="form-check form-check-inline" :key="`rate${i}`">
      <input class="form-check-input" type="checkbox" :id="`${rate.name}Checkbox`" :value="`${rate.name}`" :name="`${rate.name}`" v-model="baseSelected">
      <label class="form-check-label" :for="`${rate.name}Checkbox`"> {{rate.name}} </label>
    </div>
    <div class="chart-container" style="position: relative;">
      <canvas id="RatesChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import moment from 'moment'
import 'core-js/stable'; 
import 'regenerator-runtime/runtime';

export default {
    data() {
    return {
    dateLimit: moment("2020-04-09", 'YYYY-MM-DD'),
    lapse: "months",
    rateHistory: [],
    chart: {},
    baseSelected: [this.$parent.rates[this.$parent.baseSelected].name]
    }
  },
  methods: {
    async setGraphInfo(){
      var labels = [];
      var graphData = [];
      var fetchesArr = [];

      this.rateHistory = [];

      this.baseSelected.forEach((name, index) => {
        for (let d = moment(); d.diff(this.dateLimit) >= 0; d = this.subtractMoment(d, 1, this.lapse))
        fetchesArr.push(`https://api.exchangerate.host/${d.format("YYYY-MM-DD")}?base=${name}&symbols=VES`);
      });

      Promise.all(fetchesArr.map(url => fetch(url)))
      .then(res => Promise.all(res.map(r => r.json())))
      .then((dataArr) => {
        dataArr.forEach( (data, i) => {
          let cell = {
            rate: data.rates.VES,
            date: data.date
          }
          graphData.push(cell);
        });
        graphData = this.divideData(graphData, graphData.length/this.baseSelected.length, this.baseSelected.length);
        graphData.forEach((subArr, i) => {
          subArr = subArr.sort((d1,d2) => new Date(d1.date) - new Date(d2.date));
          subArr = subArr.filter((o) => o.rate != undefined);
          subArr.forEach((o,j) => {
            if (i == 0)
              labels.push(moment(subArr[j].date,"YYYY MM DD").format("MMM YYYY"));

            subArr[j] = o.rate;
          });
          let baseName = this.baseSelected[i];
          this.rateHistory[i] = this.createDataset(subArr, baseName);
        });
        this.updateChart(this.rateHistory, labels);
      });
    },
    drawGraph(d, labels){
      var ctx = document.getElementById('RatesChart').getContext('2d');
      this.chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: labels,
              datasets: d
          },
          options: {
            spanGaps: true,
            animation: {
              tension: {
                duration: 1000,
                easing: 'linear',
                from: 0.6,
                to: 0.3,
                loop: true
              }
            },
            plugins: {
              filler: {
                propagate: true,
              },
              legend: {
                labels: {
                  usePointStyle: true
                }
              }
            },
            pointBackgroundColor: '#fff',
            radius: 6,
            interaction: {
              intersect: false,
            }
          }
      });
    },
    subtractMoment(d,q,s){
      try {
        return d.subtract(q, s);
      }
      catch {
        console.log("Error trying to subtract moment date, invalid string argument.");
      }
    },
    createDataset(data,name) {
      var o;
      return o = {
          label: `Bolívares Soberanos en ${name}`,
          data: data,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          fill: true,
          tension: 0.4,
          borderWidth: 3
      };
    },
    divideData(data,divider,nArr){
      let arr = [];
      for (let i = 0; i < nArr; i++)
        arr[i] = data.slice(i*divider,(i+1)*divider);
      return arr;
    },
    updateChart(nd, labels){
      if (this.chart.data){
        this.chart.data.datasets = this.chart.data.datasets.filter((ds) => this.baseSelected.some(base => ds.label.includes(base)));
        console.log("filtered datasets");
        console.log(this.chart.data.datasets);
        nd.forEach(dataset => {
          if
            (this.chart.data.datasets.some(ds => ds.label === dataset.label)){
              this.chart.data.datasets[this.chart.data.datasets.findIndex(ds => ds.label === dataset.label)] = dataset;
              console.log("Dataset updated");
            } else {
              this.chart.data.datasets.push(dataset);
              console.log("Dataset added")
            }
        });
        if (this.chart.data.labels != labels)
          this.chart.data.labels = labels;
        this.chart.update();
      }
      else
        this.drawGraph(nd, labels);
    }
  },
  watch: {
    baseSelected: function(nb,ob){
      this.setGraphInfo();
    }
  },
  mounted(){
    this.setGraphInfo();
  }
}
</script>