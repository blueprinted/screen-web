<template>
  <div id="containers" style="width: 100%; height: 200px"></div>
</template>
<script>
</script>
<script>
import HTTP from "../../server/http";
import HighCharts from "highcharts";
export default {
  components: { HighCharts },
  data() {
    return {
      num: [],
      name: [],
      arr: [],
      tArr: []
    };
  },
  watch: {
    // arr3() {
    //   this.timer();
    // },
  },
  // destroyed() {
  //   clearTimeout(this.timer);
  // },

  mounted() {
    // this.$nextTick(() => {
    // this.init();
    this.vistor();
    // });
  },

  methods: {
    vistor() {
      let url = "/portal/statistic/visitorStatistic";
      let data = {
        name: this.name,
        y: this.count
      };
      HTTP.get(
        url,
        data,
        res => {
          if (Number(res.code) == 0) {
            this.arr = res.data;
            var arrs = [];
            this.arr.forEach(item => {
              arrs.push([item.name, item.count]);
            });
            this.tArr = arrs.splice(1, 2);
         
            this.init();
          }
        },
        false
      );
    },

    init() {
      var Highcharts = require("highcharts");
      Highcharts.chart("containers", {
        chart: {
          backgroundColor: "",

          type: "pie",
          slicedOffset: 30, //移出饼图中心
          options3d: {
            enabled: true,
            alpha: 30,
            beta: 0
          }
        },
        credits: { enabled: false },
        //去掉右下角的"https://highcharts.com"的所有权
        exporting: {
          enabled: false
        },
        colors: ["#00D7E9", "#004bbb"],
        title: {
          text: "",
          color: "white"
        },
        // slicedOffset: 20,
        //选中的时候有个滑动的效果
        plotOptions: {
          pie: {
            allowPointSelect: true,
            depth: 30,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.y} ",
              style: {
                color:
                  (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "white"
              },
              connectorColor: "silver"
            }
          }
        },
        // tooltip: {
        //   pointFormat: "{point.name}:{point.y}占比:{point.percentage:.1f}%",
        // },

        series: [
          {
            name: "",
            type: "pie",
            data: this.tArr,
            // data: [
            //   ["2323", 20],
            //   ["asdsasd", 200]
            // ],

            backgroundColor: {
              linearGradient: [100, 100, 500, 500],
              stops: [
                [0, "rgb(255, 255, 255)"],
                [1, "rgb(200, 200, 255)"]
              ]
            },
            label: {
              //展示文本设置
              normal: {
                show: true, //展示
                position: "outside" // outside表示文本显示位置为外部
              },
              emphasis: {
                //文本样式
                show: true, //展示
                textStyle: {
                  //文本样式
                  fontSize: "16",
                  fontWeight: "600"
                }
              }
            },
            labelLine: {
              //引导线设置
              normal: {
                show: true //引导线显示
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>