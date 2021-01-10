<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['xlabels', 'refDatasets'],
  mounted() {
    this.renderChart(
      {
        labels: this.xlabels,
        datasets: [...this.refDatasets],
      },

      {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          displayColors: false,
          backgroundColor: '#fff',
          borderColor: 'rgba(0, 0, 0, 0.5)',
          borderWidth: 1,
          titleFontColor: '#000',
          footerFontColor: '#000',
          bodyFontColor: '#000',
          callbacks: {
            title(TooltipItem, data) {
              const title = ''
              return title
            },
            label(tooltipItem, data) {
              let label = ''
              label += Math.round(tooltipItem.yLabel * 100) / 100
              return label + ' ₽'
            },
            labelTextColor(tooltipItem, chart) {
              return '#303136'
            },
            afterFooter(tooltipItems, data) {
              return tooltipItems[0].xLabel
            },
          },
        },
      }
    )
  },
  methods: {
    getRandomInt() {
      return Math.floor(Math.random() * (1000 - 23 + 1)) + 5
    },
  },
}
</script>
