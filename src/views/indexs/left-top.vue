<template>
  <div id="freepro" style="width: 100%; height: 300px"></div>
</template>
<script>
import HTTP from "../../server/http";
import * as echarts from "echarts";
import HighCharts from "highcharts";
import highcharts3d from "highcharts/highcharts-3d";
export default {
  components: { HighCharts, highcharts3d },
  // name: "Freepro",
  data() {
    return {
      applyNAme: [],
      pageView: [],
      arr: [],
      data: [],
    };
  },
  watch: {},
  mounted() {
    this.getfree();
  },

  methods: {
    // freepro() {
    //   var myChart = echarts.init(document.getElementById("freepro"));
    //   var option = {
    //     title: {
    //       text: "",
    //       subtext: "Fake Data",
    //       left: "center",
    //     },
    //     tooltip: {
    //       trigger: "item",
    //     },
    //     legend: {
    //       orient: "vertical",
    //       left: "left",
    //     },
      //   series: [
      //     {
      //       name: "",
      //       type: "pie",
      //       radius: "50%",
      //       data: [
      //         { value: 1048, name: "Search Engine" },
      //         { value: 735, name: "Direct" },
      //         { value: 580, name: "Email" },
      //         { value: 484, name: "Union Ads" },
      //         { value: 300, name: "Video Ads" },
      //       ],
      //       emphasis: {
      //         itemStyle: {
      //           shadowBlur: 10,
      //           shadowOffsetX: 0,
      //           shadowColor: "rgba(0, 0, 0, 0.5)",
      //         },
      //       },
      //     },
      //   ],
      // };
    //   myChart.setOption(option);
    // },
    freepro() {
      var chart = require("highcharts");
      chart.chart("freepro", {
        chart: {
          backgroundColor: "",
          type: "pie",
          options3d: {
            enabled: true,
            alpha: 45,
            beta: 0,
          },
        },
        dataLabels:{
          distance: 30
        },
        credits: { enabled: false },
        //去掉右下角的"https://highcharts.com"的所有权
        title: {
          text: "",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            depth: 35,
            dataLabels: {
              enabled: true,
              format: "{point.name}",
            },
          },
        },
        series: [
          {
            type: "pie",
            name: "",
            data: [
              ["Firefox", 45.0],
              ["IE", 26.8],
              // { y: 1048, name: "Search Engine" },
              ["Safari", 8.5],
              ["Opera", 6.2],
              ["Others", 0.7],
            ],
          },
        ],
      });
    },

    getfree() {
      let url = "/portal/api/index/getDPApplylist";
      let data = {
        applyNAme: this.applyNAme,
        pageView: this.pageView,
      };
      HTTP.get(
        url,
        data,
        (res) => {
          if (Number(res.code) == 0) {
            this.arr = res.data;
            this.arr.forEach((item) => {
              this.applyNAme.push(item.applyName);
              this.pageView.push(item.pageView);
              this.freepro();
            });
          }
        },
        false
      );
    },
  },
};
</script>
<style lang="scss" scoped>
</style>