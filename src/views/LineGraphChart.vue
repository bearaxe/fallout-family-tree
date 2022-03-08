<template>
  <canvas ref="lineGraphChart"></canvas>
</template>

<script>
import { mapState } from 'vuex';

const labels = [...'SPECIAL'];

const options = {
  responsive: true,
  lineTension: 0,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          padding: 25
        }
      }
    ]
  },
  plugins: {
    legend: {
      display: false
    },
  },
};

function getRandomColor(seed) {
  const seededRng = new Math.seedrandom(seed);
  return Math.floor(seededRng() * 255);
}

export default {
  mounted() {
    const config = {
      options,
      type: 'line',
      data: {
        labels,
        datasets: this.datasets
      },
    }

    const myChart = new Chart(
      this.$refs.lineGraphChart.getContext('2d'),
      config
    );
  },
  computed: {
    ...mapState(['dwellers']),
    datasets() {
      return this.dwellers.map(dweller => {
        const dwellerColor = 'rgb(' + getRandomColor(dweller.firstName)
                            + ', ' + getRandomColor(dweller.lastName)
                            + ', ' + getRandomColor(`${dweller.firstName} ${dweller.lastName}`)
                            + ')';
        return {
          label: `${dweller.firstName} ${dweller.lastName}`,
          backgroundColor: dwellerColor,
          borderColor: dwellerColor,
          data: [...dweller.special]
        }
      })
    }
  }
}
</script>