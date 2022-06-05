<template>
  <div id="myEchart" ref="myEchart" style="height: 55vh; width: 30vw" />
</template>

<script>
import * as echarts from "echarts";
import "@/utils/map/ly.json";
const ly = require("@/utils/map/ly.json");
export default {
  name: "Citymap",
  data() {
    return {};
  },

  mounted() {
    this.chinaConfigure();
  },

  methods: {
    chinaConfigure() {
      let that = this;
      const myChart = echarts.init(document.getElementById("myEchart")); // 这里是为了获得容器所在位置
      echarts.registerMap("ly", ly);
      myChart.setOption({
        // 进行相关配置
        backgroundColor: "", //设置背景色
        tooltip: {
          // 鼠标移到图里面的浮动提示框
          show: true,
          transitionDuration: 0,
        },

        visualMap: {
          // 地图标注位置设置和内容设置（图中左下角）
          show: false,
          left: 60,
          bottom: 60,
          showLabel: false, // 显示下面属性pieces中的label
          textStyle: {
            color: "#000",
          },
          icon: "", // 标志框形状设置
          itemWidth: "",
          itemHeight: "",
        },
        geo: {
          show: false,
          // 这个是重点 —— 这里设置为地图的阴影
          map: "ly", // 表示中国地图
          roam: false, // 禁止拖拽
          emphasis: {
            show: false,
          },
          label: {
            show: false,
            // 标志信息
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: "#CFF6FF",
              },
            },
          },
          silent: true, // 禁止hover效果
          zoom: 1, // 地图比例
          // center: [112.45,34.62],
          // 地图中心位置， 此处的纬度与下面的center相差1度是形成阴影的距离，可自己随意调整
          itemStyle: {
            normal: {
              borderColor: "#000",
            },
            emphasis: {
              show: false,
            },
          },
        },
        geo: [
          {
            map: "ly",
            zlevel: 5,
            label: {
              show: true,
              color: "#eee",
            },
            itemStyle: {
              color: "#2075b8",
              borderWidth: "1",
              borderColor: "#fff",
            },
          },
          {
            map: "ly",
            top: "11%",
            zlevel: 4,

            itemStyle: {
              color: "#3c5fa1",
              borderWidth: "1",
              borderColor: "#3c5fa1",
            },
          },
          {
            map: "ly",
            top: "12%",
            zlevel: 3,

            itemStyle: {
              color: "#163f6c",
              borderWidth: "1",
              borderColor: "#163f6c",
            },
          },
          {
            map: "ly",
            top: "13%%",
            zlevel: 2,

            itemStyle: {
              color: "#31a0e6",
              borderWidth: "1",
              borderColor: "#31a0e6",
              shadowColor: "#fff",
              shadowBlur: "10",
            },
          },
        ],
        series: [
          // 此处为真正的地图
          {
            name: "", // 浮动框的标题
            type: "map",
            map: "ly",
            geoIndex: 1,
            aspectScale: 0.75, //长宽比
            showLendSymbol: false,
            textFixed: {
              Alaska: [20, -20],
            },
            zoom: 1.1,
            roam: false,
            emphasis: {
              // 鼠标hover是否显示内容，可自己调节
              label: {
                show: true,
              },
              textStyle: {
                color: "#00114F",
              },
            },
            label: {
              // 地图标注
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: "#000",
                },
              },
            },
            // center: [113,35],
            // 设置地图中心
            itemStyle: {
              // 地图的样式
              normal: {
                borderColor: "#000", // 边框颜色
                borderWidth: 0.5, // 边框宽度
                shadowColor: "rgba(100,255,238,0.5)", // 边框阴影
                shadowBlur: 6, // 边框聚焦
              },
              emphasis: {
                // 鼠标hover显示
                show: true,
                areaColor: "#fff",
                color: "#000",
                textStyle: {
                  color: "#000",
                },
              },
            },
            data: this.mapData, // 最后数据，下面是假数据
            // [
            //     { name: '广东', value: '150' },
            //     { name: '江苏', value: '30' },
            //     { name: '浙江', value: '20' },
            //     { name: '山东', value: '60' },
            //     { name: '安徽', value: '5' },
            //     { name: '湖北', value: '16' },
            //     { name: '重庆', value: '10' },
            //     { name: '湖南', value: '55' },
            //     { name: '河南', value: '11' },
            //     { name: '北京', value: '22' },
            //     { name: '天津', value: '22' },
            //     { name: '上海', value: '71' },
            //     { name: '河北', value: '4' },
            //     { name: '云南', value: '115' },
            //     { name: '辽宁', value: '7' },
            //     { name: '黑龙江', value: '42' },
            //     { name: '新疆', value: '22' },
            //     { name: '江西', value: '11' },
            //     { name: '广西', value: '33' },
            //     { name: '甘肃', value: '155' },
            //     { name: '山西', value: '170' },
            //     { name: '内蒙古', value: '33' },
            //     { name: '陕西', value: '85' },
            //     { name: '吉林', value: '12' },
            //     { name: '福建', value: '31' },
            //     { name: '贵州', value: '25' },
            //     { name: '青海', value: '22' },
            //     { name: '西藏', value: '61' },
            //     { name: '四川', value: '2' },
            //     { name: '宁夏', value: '95' },
            //     { name: '海南', value: '32' },
            //     { name: '台湾', value: '42' },
            //     { name: '香港', value: '36' },
            //     { name: '澳门', value: '29' },
            //     { name: '南海诸岛', value: '1' }
            // ]
          },
        ],
      });
      myChart.on("click", function (params) {
        // 点击每个省份的事件，可用于拓展
      });
      window.onresize = myChart.resize
      window.addEventListener("resize", () => {
        // 地图自适应缩放
        myChart.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>