<template>
  <div class="content bgBox">
    <div class="firstTitle">
      <p
        class="titleName"
        style="color: #fff; font-size: 16px; font-weight: 600"
      >
        <!-- <span>
          <img src="@/assets/screen/iconshort.png" alt="" />
        </span>
        <span style="position: absolute; margin-top: 12px; margin-left: -120px"
          >资源下载</span
        > -->
      </p>
    </div>
    <div class="warning-pie" id="pieChart"></div>
  </div>
  <!-- <div>
    <div class="warning-pie" id="pieChart"></div>
  </div> -->
</template>

<script>
import HTTP from '@/server/http.js'
import * as echarts from "echarts";
import "echarts-gl";
export default {
  name: "WebPie3d",
  components: { echarts },
  data() {
    return {
      tArr:[],
      dArr: [{name:'wqwer',value:2},
      {name:'sad',value:3}
      ],
    };
  },
  watch: {
    // dArr() {
    //   this.timer();
    // },
  },
  // destroyed() {
  //   clearTimeout(this.timer);
  // },
  mounted() {
    // this.$nextTick(() => {
      this.source();
      this.handlePieChart();
    // });
  },

  methods: {
    // timer() {
    //   return setTimeout(() => {
        // this.source();
    //   }, 1000 * 60 * 60 * 24);
    // },

    handlePieChart() {
      var myChart = echarts.init(document.getElementById("pieChart"));
      function getParametricEquation(
        startRatio,
        endRatio,
        isSelected,
        isHovered,
        k,
        height
      ) {
        // 计算
        // console.log("getParametricEquation")
        let midRatio = (startRatio + endRatio) / 2;
        let startRadian = startRatio * Math.PI * 2;
        let endRadian = endRatio * Math.PI * 2;
        let midRadian = midRatio * Math.PI * 2;

        if (startRatio === 0 && endRatio === 1) {
          isSelected = false;
        }

        // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
        k = typeof k !== "undefined" ? k : 1 / 3;

        // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
        let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
        let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;

        // 计算高亮效果的放大比例（未高亮，则比例为 1）
        let hoverRate = isHovered ? 1.05 : 1;

        // 返回曲面参数方程
        return {
          u: {
            min: -Math.PI,
            max: Math.PI * 3,
            step: Math.PI / 32,
          },

          v: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
          },

          x: function (u, v) {
            if (u < startRadian) {
              return (
                offsetX +
                Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            if (u > endRadian) {
              return (
                offsetX +
                Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
          },

          y: function (u, v) {
            if (u < startRadian) {
              return (
                offsetY +
                Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            if (u > endRadian) {
              return (
                offsetY +
                Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
              );
            }
            return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
          },

          z: function (u, v) {
            if (u < -Math.PI * 0.5) {
              return Math.sin(u);
            }
            if (u > Math.PI * 2.5) {
              return Math.sin(u);
            }
            return Math.sin(v) > 0 ? 1 * height : -1;
          },
        };
      }
      // 3D饼图的配置项，同echarjs的series
      function getPie3D(pieData, internalDiameterRatio) {
        let series = [];
        let sumValue = 0;
        let startValue = 0;
        let endValue = 0;
        let legendData = [];
        let k =
          typeof internalDiameterRatio !== "undefined"
            ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
            : 1 / 3;

        // 3个饼图参数
        for (let i = 0; i < pieData.length; i++) {
          sumValue += pieData[i].value;

          let seriesItem = {
            name:
              typeof pieData[i].name === "undefined"
                ? `series${i}`
                : pieData[i].name,
            type: "surface",
            parametric: true,
            wireframe: {
              show: false,
            },
            label: {
              normal: {
                position: "inner",
                show: true,
              },
            },
            labelLine: {
              normal: {
                length: 15,
                lineStyle: {
                  color: "#595959",
                },
                smooth: 0.2,
                length: 50,
                length2: 100,
              },
            },
            pieData: pieData[i],
            pieStatus: {
              selected: false,
              hovered: false,
              k: k,
            },
          };
          if (typeof pieData[i].itemStyle != "undefined") {
            let itemStyle = {};
            typeof pieData[i].itemStyle.color != "undefined"
              ? (itemStyle.color = pieData[i].itemStyle.color)
              : null;
            typeof pieData[i].itemStyle.opacity != "undefined"
              ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
              : null;
            seriesItem.itemStyle = itemStyle;
          }
          series.push(seriesItem);
        }

        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
        // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series.length; i++) {
          endValue = startValue + series[i].pieData.value;
          // console.log(series[i]);
          series[i].pieData.startRatio = startValue / sumValue;
          series[i].pieData.endRatio = endValue / sumValue;
          series[i].parametricEquation = getParametricEquation(
            series[i].pieData.startRatio,
            series[i].pieData.endRatio,
            false,
            false,
            k,
            series[i].pieData.value
          );
          startValue = endValue;
          legendData.push(series[i].name);
        }
        // 准备待返回的配置项，把准备好的 legendData、series 传入。

        let option = {
          tooltip: {
            formatter: (params) => {
              if (params.seriesName !== "mouseoutSeries") {
                return `${
                  params.seriesName
                }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                  params.color
                };"></span>${option.series[params.seriesIndex].pieData.value}`;
              }
            },
          },
          title: {
            // text:'资源下载',
            left: "left",
            textStyle: {
              color: "#fff",
            },
          },
          legend: {
            data: legendData,
            itemWidth: 20, //色标图宽
            itemHeight: 20, //色标图高
            orient: "vertical", //垂直显示
            top: 5,
            right: 20,
            itemGap: 10, //色标间隔
            textStyle: {
              color: "#fff",
              fontSize: 16,
            },
          },
          xAxis3D: {
            min: -1,
            max: 1,
          },
          yAxis3D: {
            min: -1,
            max: 1,
          },
          zAxis3D: {
            min: -1,
            max: 1,
          },
          grid3D: {
            show: false,
            boxHeight: 15,
            top: "10",
            right:'0',
            left: "-100",
            bottom: "-2",
            environment: "auto",
            viewControl: {
              distance: 350, //远近
              alpha: 40, //饼图X轴旋转
              beta: 0, //饼图Y轴旋转
              autoRotate: false, //自旋
              panSensitivity: 0,
            },
          },

          series: series,

        };
        return option;
      }
      let option = getPie3D(this.tArr);
      //  let option = getPie3D(this.dArr);

      myChart.setOption(option);

      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
   source() {
      let url = "/portal/statistic/sourceStatistic";
      let data = {};
      HTTP.get(
        url,
        data,
        res => {
          if (Number(res.code) == 0) {
          // console.log(res.data,'资源下载');
          this.arr = res.data;
          let arrs = [];
          this.arr.forEach((item) => {
            let data = {
              name: item.title,
              value: item.count,
            };
            arrs.push(data);
          });
          this.tArr = arrs;
          this.handlePieChart()
          }
        },
        false
      );
    },

  },
};
</script>

<style scoped>
.warning-pie {
  width: 100%;
  height: 300px;
}
</style>