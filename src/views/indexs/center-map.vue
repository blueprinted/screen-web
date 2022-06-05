<template>
  <div class="centermap">
    <!-- <div class="maptitle">
      <div class="zuo"></div>
      <span class="titletext">{{ maptitle }}</span>
      <div class="you"></div>
    </div> -->
    <div class="mapwrap">
      <!-- <dv-border-box-13> -->
        <!-- <div class="quanguo" @click="getData(-1)" v-if="code !== 'china' && userCode == -1">
        中国
        </div>-->
        <!-- <Echart id="CenterMap" :options="options" ref="CenterMap" /> -->
        <div class="map">
          <Citymap />
        </div>
      <!-- </dv-border-box-13> -->
    </div>
  </div>
</template>

<script>
import Citymap from "@/components/citymap";
// import xzqCode from "../../utils/map/xzqCode";
// import { currentGET } from 'api/modules'

// import { GETNOBASE } from 'api'
export default {
  components: { Citymap },
  data() {
    return {
      maptitle: "分布图"
    };
  },
  created() {},

  mounted() {},
  methods: {}
};
</script>
<style lang='scss' scoped>
.centermap {
  // margin-bottom: 30px;
  margin-bottom: 110px;
  .maptitle {
    height: 60px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;

    .titletext {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 6px;
      color: #fff;
      background: linear-gradient(
        92deg,
        #0072ff 0%,
        #00eaff 48.8525390625%,
        #01aaff 100%
      );
      background-clip: border-box;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }

    .zuo,
    .you {
      background-size: 100% 100%;
      width: 29px;
      height: 20px;
      margin-top: 8px;
    }

    .zuo {
      background: url("../../assets/img/xiezuo.png") no-repeat;
    }

    .you {
      background: url("../../assets/img/xieyou.png") no-repeat;
    }
  }

  .mapwrap {
    margin-left: 0px;
    height: 548px;
    width: 100%;
    padding: 0 0 10px 0;
    box-sizing: border-box;
    position: relative;
    .map {
      // margin-left: 100px;
      position: absolute;
      right: 90px;
      overflow: hidden;
      position: flex;
    }
    // .quanguo {
    //   position: absolute;
    //   right: 20px;
    //   top: -46px;
    //   width: 80px;
    //   height: 28px;
    //   border: 1px solid #00eded;
    //   border-radius: 10px;
    //   color: #00f7f6;
    //   text-align: center;
    //   line-height: 26px;
    //   letter-spacing: 6px;
    //   cursor: pointer;
    //   box-shadow: 0 2px 4px rgba(0, 237, 237, 0.5),
    //     0 0 6px rgba(0, 237, 237, 0.4);
    // }
  }
}
</style>