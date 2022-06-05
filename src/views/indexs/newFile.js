import HTTP from "../../server/http";
import * as echarts from "echarts";

export default (await import('vue')).defineComponent({
name: "Freepro",
data() {
return {
applyNAme: [],
pageView: [],
arr: [],
data: []
};
},
watch: {
// arr() {
//   this.timer();
// },
},
//   destryed() {
//     clearTimeout(this.timer);
//   },
mounted() {
// this.$nextTick(() => {
// this.freepro();
this.getfree();
// });
},

methods: {
freepro() {
let myChart = echarts.init(document.getElementById("freepro"));

var option = {
title: {
text: "",
left: "center",
top: "",
textStyle: {
color: "#fff",
fontStyle: "normal",
fontWeight: "bold",
fontSize: "18px"
}
},

grid: {
top: "0%",
left: "10%",
right: "6%",
bottom: "36%",
containLabel: true
},

tooltip: {
trigger: "axis",
axisPointer: {
// 坐标轴指示器，坐标轴触发有效
type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
},
backgroundColor: "#235EAE",
borderWidth: 1,
borderColor: "#6C99FF",
padding: [5, 5, 5, 5],
extraCssText: "box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);",
textStyle: {
color: "#fefefe",
fontSize: 16
},
formatter: "{b0}: {c0}次"
},
xAxis: {
type: "value",
show: false
},
yAxis: {
boundaryGap: true,
axisTick: {
alignWithLabel: true,
show: true
},
axisLabel: {
textStyle: {
fontSize: "14px",
color: "#fff"
}
},

show: true,
inverse: true,
animationDuration: 200,
animationDurationUpdate: 200,
type: "category",
alignWidthLabel: true,
data: this.applyNAme
},
color: [
"#FF3B27",
"#FD4E52",
"#FF696C",
"#FF9369",
"#FDB35C",
"#FBCC4E",
"#14D8DA",
"#04BAFE",
"#0480FF",
"#C6E579"
],

series: [
{
realtimeSort: true,
type: "bar",
colorBy: "data",
itemStyle: {
normal: {
barBorderRadius: [0, 10, 10, 0],
label: {
show: true,
position: "insideLeft",
textStyle: {
color: "#fff",
fontSize: 12
}
}
}
},

barWidth: 15,
data: this.pageView
}
],
animationDuration: 3000,
animationDurationUpdate: 3000,
animationEasing: "linear",
animationEasingUpdate: "linear"
};

myChart.setOption(option);
window.onresize = myChart.resize;
},
getfree() {
let url = "/portal/api/index/getDPApplylist";
let data = {
applyNAme: this.applyNAme,
pageView: this.pageView
};
HTTP.get(
url,
data,
res => {
if (Number(res.code) == 0) {
this.arr = res.data;
this.arr.forEach(item => {
this.applyNAme.push(item.applyName);
this.pageView.push(item.pageView);
this.freepro();
});
}
// console.log(this.arr,'arr');
// console.log(this.applyNAme,'name');
// console.log(this.pageView,'pageview');
},
false
);
}
}
});
