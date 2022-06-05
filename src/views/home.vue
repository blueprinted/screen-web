
<template>
  <div id="index" ref="appRef" class="index_home" :class="{ pageisScale: isScale }">
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <!-- 头部 s -->
        <div class="d-flex jc-center title_wrap">
          <div class="zuojuxing"></div>
          <div class="youjuxing"></div>
          <div class="guang"></div>
          <div class="d-flex jc-center">
            <div class="title">
              <span class="title-text">洛宁县电子商务公共服务平台大数据中心</span>
            </div>
          </div>
          <div class="timers">
            {{ dateYear }} {{ dateWeek }} {{ dateDay }}
            <i
              class="blq-icon-shezhi02"
              style="margin-left:10px"
              @click="showSetting"
            ></i>
          </div>
          <!-- 天气预报 -->
          <!-- <div class="weather">
            <p>   {{ city }} {{ dayWeather }} 最低温度:{{ nightTemp }} 最高温度:{{
              dayTemp
            }}</p>
          </div> -->
        </div>
        <router-view></router-view>
      </div>
    </div>
    <Setting ref="setting" />
  </div>
</template>

<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=162d38acc33923afcc04109020196d88"></script>
<script>

window._AMapSecurityConfig = {
  securityJsCode: "f537859176d68e1d0addc7d4155c38af"
};
import AMapLoader from "@amap/amap-jsapi-loader";
import drawMixin from "../utils/drawMixin";
import { formatTime } from "../utils/index.js";
import Setting from "./setting.vue";
export default {
  mixins: [drawMixin],
  components: { Setting },
  data() {
    return {
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      arrs: [],
      city:'',
      weather: "",
      dayTemp: "",
      dayWindDir: "",
      nightTemp: "",
      dayWeather: "",
      dayWindPower: "",
      // citymap:'',
    };
  },
  filters: {
    numsFilter(msg) {
      return msg || 0;
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.showCityInfo();
    this.timeFn();
    this.cancelLoading();
  },
  beforeDestroy() {
    clearInterval(this.timing);
  },
  methods: {
    // 定位城市/天气
    showCityInfo() {
      let vm = this;
      AMapLoader.load({
        key: "162d38acc33923afcc04109020196d88",
        // 申请好的Web端开发者Key首次调用 load 时必填
        version: "2.0", //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ["AMap.CitySearch", "AMap.Weather"], // 需要使用的的插件列表，如比例尺'AMap.Scale'
        Loca: {
          // 是否加载 Loca， 缺省不加载
          version: "2.0" // Loca 版本
        }
      })
        .then(AMap => {
          AMap.plugin("AMap.CitySearch", function() {
            var citySearch = new AMap.CitySearch();
            citySearch.getLocalCity(function(status, result) {
              if (status === "complete" && result.info === "OK") {
                var citymap = result;
                vm.city = result.city;
                // 查询成功，result即为当前所在城市信息
              }
              AMap.plugin("AMap.Weather", function() {
                //创建天气查询实例
                var weather = new AMap.Weather();
                //执行天气信息查询
                weather.getForecast(vm.city, function(err, data) {
                  vm.arrs = (err, data);
                  // console.log(vm.arrs);
                  vm.dayTemp = vm.arrs.forecasts[0].dayTemp;
                  vm.nightTemp = vm.arrs.forecasts[0].nightTemp;
                  vm.dayWeather = vm.arrs.forecasts[0].dayWeather;
                  vm.dayWindDir = vm.arrs.forecasts[0].dayWindDir;
                  vm.dayWindPower = vm.arrs.forecasts[0].dayWindPower;
                  // console.log(arrs);
                });
              });
            });
          });
        })
        .catch(e => {
          console.error(e); //加载错误提示
        });
    },
    showSetting() {
      this.$refs.setting.init();
    },
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), "HH: mm: ss");
        this.dateYear = formatTime(new Date(), "yyyy-MM-dd");
        this.dateWeek = this.weekday[new Date().getDay()];
      }, 1000);
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    }
  }
};
</script>

<style lang="scss">
@import "./home.scss";
</style>
