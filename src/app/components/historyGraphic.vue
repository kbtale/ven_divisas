<template>
  <div>
    <!--  <div v-for="(rate, i) in this.$parent.rates" class="form-check form-check-inline" :key="`rate${i}`">
      <input class="form-check-input" type="checkbox" :id="`${rate.name}Checkbox`" :value="`${rate.name}`" :name="`${rate.name}`" v-model="baseSelected">
      <label class="form-check-label" :for="`${rate.name}Checkbox`"> {{rate.name}} </label>
    </div>-->
    <div>

    </div>
    <div class="chart-container" style="position: relative;">
      <canvas id="RatesChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import moment from 'moment'

export default {
    data() {
    return {
    lapseOptions: [
      {
        dateLimit: moment(moment().subtract(1,"months"), 'YYYY-MM-DD'),
        lapse: "days",
        interval: 1
      },
      {
        dateLimit: moment(moment().subtract(3,"months"), 'YYYY-MM-DD'),
        lapse: "days",
        interval: 15
      },
      {
        dateLimit: moment(moment().subtract(6,"months"), 'YYYY-MM-DD'),
        lapse: "months",
        interval: 1
      },
      {
        dateLimit: moment(moment().subtract(1,"years"), 'YYYY-MM-DD'),
        lapse: "months",
        interval: 1
      }
    ],
    dateLimit: moment("2020-04-09", 'YYYY-MM-DD'),
    lapse: "months",
    rateHistory: [],
    chart: {},
    baseSelected: [this.$parent.rates[this.$parent.baseSelected].name] // Determines the active bases, and which dataset will be active
    }
  },
  methods: {
    // Retrieves the data for the graph
    // No parameters
    async setGraphInfo(){
      var labels = [];
      var graphData = [];
      var fetchesArr = []; // Array that contains all the fetches
      console.log(this.lapseOptions)
      this.rateHistory = [];

      // Create the fetches for each rate
      this.$parent.rates.forEach((rate, index) => {
        for (let d = moment(); d.diff(this.dateLimit) >= 0; d = this.subtractMoment(d, 1, this.lapse))
        fetchesArr.push(`https://api.exchangerate.host/${d.format("YYYY-MM-DD")}?base=${rate.name}&symbols=VES`);
      });

      // Fetching the data
      Promise.all(fetchesArr.map(url => fetch(url))) // Promise.all wait for sending all the fetches of the array
      .then(res => Promise.all(res.map(r => r.json()))) // This Promise.all wait for all the results
      .then((dataArr) => { // Block excecuted with the retrieved data, dataArr contains the whole data received
        dataArr.forEach( (data, i) => {
          let cell = { // Creates data cell
            rate: data.rates.VES,
            date: data.date
          }
          graphData.push(cell); // Pushing cell to the graph data
        });
        graphData = this.divideData(graphData, graphData.length/this.$parent.rates.length, this.$parent.rates.length); // divides data in fractions dependending of the quantity of rates
        // With the data already divided, proceeds to create the final datasets
        graphData.forEach((subArr, i) => {
          subArr = subArr.sort((d1,d2) => new Date(d1.date) - new Date(d2.date)); // Avoiding troubles, sort each dataset by date
          subArr = subArr.filter((o) => o.rate != undefined); // Delete the empty data
          subArr.forEach((o,j) => {
            if (i == 0 && labels.length < subArr.length)
              labels.push(moment(subArr[j].date,"YYYY MM DD").format("MMM YYYY")); // Set the labels of the graph 

            subArr[j] = o.rate; // Deletes de date and keeps the rate
          });
          let baseName = this.$parent.rates[i].name; // Getting the name of the dataset
          this.rateHistory[i] = this.createDataset(subArr, baseName, (this.baseSelected.includes(baseName)) ? false : true, this.$parent.rates[i].color); // Creates the final dataset, if the base is selected, the dataset is active, else is hidden
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
                duration: 1500,
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
      console.log(this.chart)
    },
    subtractMoment(d,q,s){
      try {
        return d.subtract(q, s);
      }
      catch {
        console.log("Error trying to subtract moment date, invalid string argument.");
      }
    },
    //Creates a dataset with the retrieved information
    //Parameters:
    //@data: array with the data of the dataset @name: name of the dataset @hidden: boolean that determines if the dataset will start active or not @color: Color of the dataset in rgba format
    createDataset(data, name, hidden, color) {
      var o;
      return o = {
          label: `Bolívares Soberanos en ${name}`,
          data: data,
          borderColor: color,
          backgroundColor: color.replace(/[^,]+(?=\))/g,"0.85"), //Set 0.5 alpha to color 
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          hidden: hidden
      };
    },
    //Divides an array in the given sections
    //Parameters:
    //@data: the array that will be divided @divider: the length of the divisions @nArray: the expected number of subarrays created
    divideData(data,divider,nArr){
      let arr = [];
      for (let i = 0; i < nArr; i++)
        arr[i] = data.slice(i*divider,(i+1)*divider);
      return arr;
    },
    updateChart(nd, labels){
      /*if (this.chart.data){
        this.chart.data.datasets = this.chart.data.datasets.filter((ds) => this.baseSelected.some(base => ds.label.includes(base)));
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
        this.drawGraph(nd, labels);*/
    if (this.chart.data) {
      nd.forEach((d) => {this.chart.data.datasets.push(d)});
      thisChart.update();
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