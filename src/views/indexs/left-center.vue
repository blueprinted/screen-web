<template>
  <!-- <div class="content bgBox">
    <div class="firstTitle"> -->
  <!-- <p
        class="titleName"
        style="color: #fff; font-size: 16px; font-weight: 600"
      > -->
  <!-- <span>
          <img src="@/assets/screen/iconshort.png" alt="" />
        </span> -->
  <!-- <span style="position: absolute; margin-top: 12px; margin-left: -120px"
          >外包项目</span -->
  <!-- > -->
  <!-- </p> -->
  <!-- </div> -->
  <div style="width: 100%; height: 200px" id="indexLeftbottom"></div>
  <!-- </div> -->
  <!-- <div>
    <div style="width: 25vw;height: 25vh" id="indexLeftbottom"></div>
  </div> -->
</template>

<script>
import HTTP from "../../server/http";
import * as echarts from "echarts";
export default {
  name: "Outpro",
  data() {
    return {
      arr: [],
      title: [],
      epibolyAmt: [],
    };
  },
  watch: {
    // arr() {
    //   this.timer();
    // },
  },
  // destroyed() {
  //   clearTimeout(this.timer);
  // },
  mounted() {
    // this.$nextTick(() => {
    // this.getout();
    // });
    this.drawLine();
    this.getlist()
    this.WidthAdaptive();
  },

  methods: {
    // timer() {
    //   return setTimeout(() => {
    //     this.getout();
    //   }, 1000 * 60 * 60 * 24);
    // },

    WidthAdaptive(res) {
      var windth = window.innerWidth;
      let fontSize = windth / 1920;
      return fontSize * res;
    },
    drawLine() {
      let myChart = echarts.init(document.getElementById("indexLeftbottom"));
      let xValue = this.title;
      let Amt = this.epibolyAmt;
      let option = {
        title: {
          // text: "外包项目",
          left: "25",
          top: "0%",
          textStyle: {
            color: "#fff",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "18px",
          },
        },
        backgroundColor: "transparent",
        tooltip: {
          show: true,
          trigger: "axis",
          backgroundColor: "#235EAE", // 背景
          borderWidth: 1,
          borderColor: "#6C99FF",
          padding: [5, 5, 5, 5], //内边距
          extraCssText: "box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);", //添加阴影
          textStyle: {
            color: "#fefefe",
            fontSize: 16,
          },
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
          formatter: "{b0}: {c0}",
        },

        grid: {
          top: "5%",
          left: "5%",
          right: "5%",
          bottom: "0",
          containLabel: true,
        },
        xAxis: [
          {
            show: true,
            type: "category",
            boundaryGap: true,

            axisLabel: {
              interval:0,
                  formatter: function (value) {
                return value.split("").join("\n");
              },
              textStyle: {
                fontSize: "15px",
                color: "#fff",
              },
              interval: 0,
              // formatter: function (value) {
              //   return value.split("").join("\n");
              // },
            },
            data: xValue,
         
          },
        ],
        yAxis: [
          {
            name: "(金额)",
            type: "value",
            splitLine: { show: false },
            nameTextStyle: {
              color: "rgba(255,255,255,1)",
              fontSize: this.WidthAdaptive(10),
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "rgba(255, 255, 255, 0.8)",
                padding: this.WidthAdaptive(1),
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            smooth: false,
            type: "line",
            symbol: "circle",
            showAllSymbol: true,
            symbolSize: 5,
            lineStyle: {
              normal: {
                width: this.WidthAdaptive(3),
                color: "rgba(24,187,157,1)", // 线条颜色
              },
              borderColor: "#F8D25E",
            },
            itemStyle: {
              color: "rgba(24,187,157,1)",
              borderColor: "#F8D25E",
              borderWidth: this.WidthAdaptive(2),
            },

            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(24,187,157,.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(24,187,157, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(10,219,250, 0.5)", //阴影颜色
                shadowBlur: this.WidthAdaptive(20), //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: Amt,
        
          },
        ],
      };
      myChart.setOption(option);
      window.onresize = myChart.resize;
    },
    getlist() {
      let url = "/portal/api/index/getListData";
      let data = {
        epibolyAmt: this.epibolyAmt,
        title: this.title
      };
      HTTP.get(
        url,
        data,
        res => {
          if (Number(res.code) == 0) {
            this.arr = res.data;
            this.arr.forEach(item => {
              this.title.push(item.title);
              this.epibolyAmt.push(item.epibolyAmt);
              this.drawLine();
            });
          }
          // console.log(this.arr,'arr');
          // console.log(this.title,'name');
          // console.log(this.epibolyAmt,'pageview');
        },
        false
      );
    }
  },
};
</script>

<style lang="scss" scoped></style>
