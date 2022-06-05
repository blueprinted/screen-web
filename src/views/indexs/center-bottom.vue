<template>
  <div class="content bgBox">
    <div class="firstTitle">
      <p class="titleName" style="color: #fff; font-size: 16px; font-weight: 600">
        <!-- <span>
          <img src="@/assets/screen/iconshort.png" alt="" />
        </span>
        <span style="position: absolute; margin: 10px -120px">技术沙龙</span>-->
      </p>
    </div>
    <div id="buyTop" style="width: 100%; height: 200px"></div>
  </div>
</template>

<script>
import HTTP from "../../server/http";
import "echarts-gl";
import * as echarts from "echarts"; // 引入Echarts
import loginVue from "../login.vue";
export default {
  name: "sharon",
  data() {
    return {
      title: [],
      num: [],
      arr: [],
      data: []
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
    this.getsalon();
  },
  methods: {
    // timer() {
    //   return setTimeout(() => {
    //     this.getscreensharon();
    //   }, 1000 * 60 * 60 * 24);
    // },

    drawChart() {
      var buyTop = echarts.init(document.getElementById("buyTop"));
      var payPersonNum = this.num;
      //柱状图的值
      var areaData = this.title;
      // 柱子颜色
      const VALUE1 = [
        {
          //每个柱子的颜色（可自行改变颜色）
          value: payPersonNum[0],
          itemStyle: {
            color: "rgba(0,137,255,1.0)"
          }
        },
        {
          value: payPersonNum[1],
          itemStyle: {
            color: "rgba(0,25,255,1.0)"
          }
        },
        {
          value: payPersonNum[2],
          itemStyle: {
            color: "rgba(115,5,255,1.0)"
          }
        },
        {
          value: payPersonNum[3],
          itemStyle: {
            color: "rgba(215,1,255,1.0)"
          }
        },
        {
          value: payPersonNum[4],
          itemStyle: {
            color: "rgba(182,105,86,1.0)"
          }
        },
        {
          value: payPersonNum[5],
          itemStyle: {
            color: "#E87C25"
          }
        },
        {
          value: payPersonNum[6],
          itemStyle: {
            color: "red"
          }
        },
            {
          //每个柱子的颜色（可自行改变颜色）
          value: payPersonNum[7],
          itemStyle: {
            color: "rgba(0,137,255,1.0)"
          }
        },
        //     {
        //   //每个柱子的颜色（可自行改变颜色）
        //   value: payPersonNum[8],
        //   itemStyle: {
        //     color:"rgba(0,25,255,1.0)"
        //   }
        // },
      ];
      //最高值的柱子颜色  就是你所看到的透明那部分
      const VALUE2 = [
        {
          value: Math.max.apply(null, payPersonNum) + 10, //这个value是柱状图的值里的最大值
          itemStyle: {
            color: "rgba(0,137,255,.1)"
          }
        },
        {
          value: Math.max.apply(null, payPersonNum) + 10,
          itemStyle: {
            color: "rgba(0,25,255,.1)"
          }
        },
        {
          value: Math.max.apply(null, payPersonNum) + 10,
          itemStyle: {
            color: "rgba(115,5,255,.1)"
          }
        },
        {
          value: Math.max.apply(null, payPersonNum) + 10,
          itemStyle: {
            color: "rgba(215,1,255,.1)"
          }
        },
        {
          value: Math.max.apply(null, payPersonNum) + 10,
          itemStyle: {
            color: "rgba(182,105,86,.1)"
          }
        },
        {
          value: Math.max.apply(null, payPersonNum) + 10,
          itemStyle: {
            color: "#E87C25"
          }
        },
        {
          value: Math.max.apply(null, payPersonNum) + 10,
          itemStyle: {
            // color: "red"
          }
        },
           {
          value: Math.max.apply(null, payPersonNum) + 10, //这个value是柱状图的值里的最大值
          itemStyle: {
            color: "rgba(0,137,255,.1)"
          }
        },
        //    {
        //   value: Math.max.apply(null, payPersonNum) + 10, //这个value是柱状图的值里的最大值
        //   itemStyle: {
        //     color: "rgba(0,25,255,.1)"
        //   }
        // },
      ];
      // 绘制左侧面
      const CubeLeft = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0
        },
        buildPath: function(ctx, shape) {
          // 会canvas的应该都能看得懂，shape是从custom传入的
          const xAxisPoint = shape.xAxisPoint;
          const c0 = [shape.x, shape.y];
          const c1 = [shape.x - 13, shape.y - 13];
          const c2 = [xAxisPoint[0] - 13, xAxisPoint[1] - 13];
          const c3 = [xAxisPoint[0], xAxisPoint[1]];
          ctx
            .moveTo(c0[0], c0[1])
            .lineTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .closePath();
        }
      });
      // 绘制右侧面
      const CubeRight = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0
        },
        buildPath: function(ctx, shape) {
          const xAxisPoint = shape.xAxisPoint;
          const c1 = [shape.x, shape.y];
          const c2 = [xAxisPoint[0], xAxisPoint[1]];
          const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9];
          const c4 = [shape.x + 18, shape.y - 9];
          ctx
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath();
        }
      });
      // 绘制顶面
      const CubeTop = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0
        },
        buildPath: function(ctx, shape) {
          const c1 = [shape.x, shape.y];
          const c2 = [shape.x + 18, shape.y - 9];
          const c3 = [shape.x + 5, shape.y - 22];
          const c4 = [shape.x - 13, shape.y - 13];
          ctx
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath();
        }
      });
      // 注册三个面图形
      echarts.graphic.registerShape("CubeLeft", CubeLeft);
      echarts.graphic.registerShape("CubeRight", CubeRight);
      echarts.graphic.registerShape("CubeTop", CubeTop);

      const VALUE = payPersonNum;
      Option = {
        backgroundColor: "transparent",
        title: {   
          left: "left",
          top: "10",
          textStyle: {
            color: "#fff",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "18px"
          }
        },
        tooltip: {
          show: "true",
          trigger: "axis",
          axisPointer: {
            type: "line"
            // 默认为直线，可选为：'line' | 'shadow'
          },
          backgroundColor: "#235EAE", // 背景
          borderWidth: 1,
          borderColor: "#6C99FF",
          padding: [15, 15, 5, 5], //内边距
          extraCssText: "box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);", //添加阴影
          textStyle: {
            color: "#fefefe",
            fontSize: 16
          },
           formatter: "{b}: {e}",
          formatter: function (params) {
            return params[1].axisValueLabel + "<br> " + params[1].value;
          },
        },

        grid: {
          //图表的上下左右的距离
          left: "5%",
          right: "5%",
          bottom: "10",
          top: "20",
          padding: "0 0 0 0",
          containLabel: true
        },

        xAxis: {
          boundaryGap: true ,
          //x轴的样式设置
          type: "category",
          data: areaData,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#04BBFF)"
            }
          },
          offset: 10,
          axisTick: {
            alignWithLabel: true,
            show: true
          },
          axisLabel: {
            interval: 0,
            rotate: 20,
            margin: 0,
            textStyle: {
              color: "white",
              fontStyle: "normal",
              fontFamily: "",
              fontSize: 15
            }
          }
        },
        yAxis: {
          //y轴的样式设置
          type: "value",
          nameTextStyle: {
            color: "#04BBFF",
            fontSize: 15,
            offset: [2, -25]
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#04BBFF"
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 14
          },
          boundaryGap: false
        },
        series: [
          {
            //下面就是柱状图的每个柱的颜色设置
            type: "custom",
            barCategoryGap: 20,
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                barWidth: "20",
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0])
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: api.style().fill
                        },
                        {
                          offset: 1,
                          color: "rgba(210, 218, 226,1.0)"
                        }
                      ])
                    }
                  },
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0])
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: api.style().fill
                        },
                        {
                          offset: 1,
                          color: "rgba(210, 218, 226,1.0)"
                        }
                      ])
                    }
                  },
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0])
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: api.style().fill
                        },
                        {
                          offset: 1,
                          color: api.style().fill
                        }
                      ])
                    }
                  }
                ]
              };
            },
            data: VALUE2

          },
          {
            type: "custom",
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0])
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: api.style().fill
                        },
                        {
                          offset: 1,
                          color: "rgba(210, 218, 226,1.0)"
                        }
                      ])
                    }
                  },
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0])
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: api.style().fill
                        },
                        {
                          offset: 1,
                          color: "rgba(210, 218, 226,1.0)"
                        }
                      ])
                    }
                  },
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0])
                    },
                    style: {
                      fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: api.style().fill
                        },
                        {
                          offset: 1,
                          color: api.style().fill
                        }
                      ])
                    }
                  }
                ]
              };
            },
            data: VALUE1
          },
          {
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
                fontSize: 14,
                color: "#fff",
                offset: [2, -25]
              }
            },
            itemStyle: {
              color: "transparent"
            },
            tooltip: {},
            data: VALUE
     
          }
        ]
      };
      buyTop.setOption(Option);
      // window.onresize = myChart.resize
    },
    getsalon() {
      let url = "/portal/statistic/salonStatistic";
      let data = {
        title: this.title,
        num: this.count
      };
      HTTP.get(
        url,
        data,
        res => {
          if (Number(res.code) == 0) {
            this.arr = res.data;
         
            this.arr.forEach(item => {
              this.title.push(item.title);
              this.num.push(item.count);
              this.drawChart();
            });
          }
        
        },
        false
      );
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
