<template>
  <div class="measure-map">
    <div class="echarts-box">
      <div id="Echarts1">
      </div>
      <div id="Echarts2"></div>
    </div>
    <div class="echarts-box">
      <div id="Echarts3">
      </div>
      <div id="Echarts4"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      echardata: [],
    };
  },

 async mounted() {

      var res = await this.$axios.get(
        "/DaTongMeiTanMarkerGet/DaTongMeiTanMarkerGet"
      );
var arr=res.data.data.filter(ele=>ele.num!=='-')
var xdata=arr.map(ele=>ele.name)
var ydata=arr.map(ele=>ele.num)

    this.drawEcharts1(xdata,ydata);

    this.drawEcharts2();
    this.drawEcharts3();
    this.drawEcharts4();
  },

  methods: {
    drawEcharts1(x,y) {
      
      var chartDom = document.getElementById("Echarts1");
      var myChart = echarts.init(chartDom);
      var option;

option = {
    title: {
          text: "煤炭资源产量柱状图（单位：万吨/年）",
        },
    tooltip: {
    trigger: 'item'
  },
    toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    data: x
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: y,
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
};
  
      option && myChart.setOption(option);
    },
      drawEcharts2() {
      var chartDom = document.getElementById("Echarts2");
      var myChart = echarts.init(chartDom);
      var option;

      // There should not be negative values in rawData
const rawData = [[4.5], [1.5]];
const totalData = [];
for (let i = 0; i < rawData[0].length; ++i) {
  let sum = 0;
  for (let j = 0; j < rawData.length; ++j) {
    sum += rawData[j][i];
  }
  totalData.push(sum);
}
const grid = {
  left: 100,
  right: 100,
  top: 50,
  bottom: 50
};
const series = ['正在开采', '正在建设'].map((name, sid) => {
  return {
    name,
    type: 'bar',
    stack: 'total',
    barWidth: '60%',
    label: {
      show: true,
      formatter: (params) => Math.round(params.value * 1000) / 10 + '%'
    },
    data: rawData[sid].map((d, did) =>
      totalData[did] <= 0 ? 0 : d / totalData[did]
    )
  };
});
option = {
   title: {
          text: "煤炭资源建设情况",
        },
  legend: {
    selectedMode: false
  },
  grid,
  yAxis: {
    type: 'value'
  },
  xAxis: {
    type: 'category',
    data: ['大同市']
  },
  series
};

option && myChart.setOption(option);
      },
    drawEcharts3() {
      var chartDom = document.getElementById("Echarts3");
      var myChart = echarts.init(chartDom);
      var option;

 option = {
    tooltip: {
    trigger: 'item'
  },
    toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
   title: {
          text: "主流生产工艺矩形图",
        },
  series: [
    {
      type: 'treemap',
      data: [
        {
          name: '平硐开拓',
          value: 2,
        },
              {
          name: '斜井开拓',
          value: 22,
        },
              {
          name: '主斜副立',
          value: 9,
        },
              {
          name: '主立副斜',
          value: 2,
        },
      ]
    }
  ]
};

      option && myChart.setOption(option);
    },

    drawEcharts4() {
      var chartDom = document.getElementById("Echarts4");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
  title: {
    text: '瓦斯等级占比对比图',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: '当前瓦斯等级煤矿资源数',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 29, name: '低瓦斯' },
        { value: 8, name: '高瓦斯' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

      option && myChart.setOption(option);
    },
  },
};
</script>

<style scoped>
.measure-map {
  height: calc(100vh - 61px);
  overflow: hidden;
}

.measure-map .echarts-box {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 15px;
}
#Echarts1,
#Echarts2,
#Echarts3,
#Echarts4 {
  width: 45%;
  /* height: calc(100vh - 100px); */
  height: calc(50vh - 50px);
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 14px;
  text-align: center;
}
</style>
