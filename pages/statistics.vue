<template>
  <div class="container">
    <h6 class="pageTitle">Статистика</h6>
    <div class="errorData">
      <span>Данные не доступны</span>
    </div>
    <div class="pageContent">
      <LineChart
        :key="rerender"
        :xlabels="labelsX"
        :ref-datasets="refDatasets"
      />
      <div class="chartBtns">
        <button class="chartBtn" @click="randomData">Случайные данные</button>
        <button class="chartBtn" @click="createData">Добавить данные</button>
        <button class="chartBtn" @click="removeChart">Удалить данные</button>
        <button class="chartBtn" @click="addData">
          Увеличить кол-во данных
        </button>
        <button class="chartBtn" @click="removeData">
          Уменьшит кол-во данных
        </button>
      </div>
      <div class="filtres">
        <button class="chartBtn btnMobile">Фильтры</button>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart.vue'

export default {
  middleware: ['auth'],
  name: 'App',
  components: { LineChart },
  data: () => ({
    refDatasets: [],
    rerender: 0,
    labelsX: [
      '1 час',
      '2 часа',
      '3 часа',
      '4 часа',
      '5 часов',
      '6 чаосв',
      '7 часов',
      '8 часов',
    ],
  }),
  mounted() {
    this.createData()
  },
  methods: {
    randomData() {
      const count = this.refDatasets.length
      this.refDatasets = []
      for (let i = 0; i < count; i++) {
        this.createData()
      }
    },
    addData() {
      this.labelsX.push(this.labelsX.length + 1 + ' часов')
      this.rerender++
    },
    removeData() {
      this.labelsX = this.labelsX.filter(
        (word) => word !== this.labelsX[this.labelsX.length - 1]
      )
      this.rerender++
    },
    getRandomInt() {
      return Math.floor(Math.random() * (1000 - 23 + 1)) + 5
    },
    createData() {
      const randomData = []
      for (let i = 0; i < this.labelsX.length + 16; i++) {
        randomData.push(this.getRandomInt())
      }

      this.refDatasets.push({
        label:
          Math.floor(1 + Math.random() * (31 + 1 - 1)) +
          '.' +
          '0' +
          Math.floor(1 + Math.random() * (9 + 1 - 1)) +
          '.' +
          new Date().getFullYear() +
          '',

        data: randomData,

        backgroundColor: 'transparent',
        borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
        pointBackgroundColor: '#fff',
      })
      this.rerender++
    },
    removeChart() {
      this.refDatasets = this.refDatasets.filter(
        (chart) => chart !== this.refDatasets[this.refDatasets.length - 1]
      )
      this.rerender++
    },
  },
  head: {
    title: `Статистика`,
  },
}
</script>

<style lang="scss" scoped>
.chartBtns {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
}
.chartBtn {
  border: 1px solid #cbcbcb;
  color: #cbcbcb;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 8px;
  background: transparent;
  transition: 0.3s ease all;
  -moz-transition: 0.3s ease all;
  -webkit-transition: 0.3s ease all;
  cursor: pointer;
}

.chartBtn:hover {
  border: 1px solid #bd0d22;
  color: red;
}

.filtres {
  position: relative;
  display: none;
  justify-content: center;
  width: 100%;
  padding: 50px 0;
}

.errorData {
  display: none;
  background: gray;
  font-weight: 500;
  color: white;
  text-align: center;
  z-index: 999;
  padding: 30px;
  position: absolute;
  top: 40%;
  left: 50%;
  margin: 0;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

@media screen and (max-width: 450px) {
  .chartBtns {
    display: none;
  }
  .pageContent {
    padding: 0;

    filter: blur(3px);
  }
  .chartjs-render-monitor {
    width: 100%;
  }
  .chartBtn {
    width: 90%;
  }
  .filtres {
    display: flex;
  }
  .errorData {
    display: block;
  }
  .chartBtn:hover {
    border: 1px solid #cbcbcb;
    color: #cbcbcb;
  }
}
</style>
