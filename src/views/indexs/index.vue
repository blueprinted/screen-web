
<template>
  <div class="contents">
    <div class="contetn_left">
      <div class="pagetab"></div>
      <ItemWrap class="contetn_left-top  cprx" title="洛宁县电子商务热销产品排行榜">
        <LeftTop />
      </ItemWrap>
      <ItemWrap class="contetn_left-center district_kd_num" title="全区快递月寄递数量">
        <LeftCenter />
      </ItemWrap>
       <ItemWrap class="contetn_left-center trade" title="农村电商交易概况">
        <LeftCenter />
      </ItemWrap>
    </div>
    <div class="contetn_center">
      <CenterMap class="contetn_center_top" />
      <ItemWrap class="contetn_center-bottom rxdp_rank" title="电子商务热销店铺排行榜">
        <CenterBottom />
      </ItemWrap>
      <ItemWrap class="contetn_center-bottom sales" title="电子商务销售额、订单数">
        <CenterBottom />
      </ItemWrap>
    </div>
    <div class="contetn_right">
      <ItemWrap class="contetn_left-bottom contetn_lr-item month_send" title="全区快递企业月寄递量">
        <RightTop/>
      </ItemWrap>
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item settled"
        title="电商企业入驻情况"
        style="padding: 0 10px 16px 10px"
      >
        <RightCenter/>
      </ItemWrap>
      <ItemWrap class="contetn_left-bottom contetn_lr-item active_cases" title="平台活动案例 ">
        <RightBottom />
      </ItemWrap>
    </div>
  </div>
</template>

<script>
import LeftTop from "./left-top.vue";
import LeftCenter from "./left-center.vue";
import CenterMap from "./center-map.vue";
import CenterBottom from "./center-bottom.vue";
import RightTop from "./right-top.vue";
import RightCenter from "./right-center.vue";
import RightBottom from "./right-bottom.vue";

export default {
  components: {
    LeftTop,
    LeftCenter,
    CenterMap,
    RightTop,
    RightCenter,
    RightBottom,
    CenterBottom
  },
  data() {
    return {};
  },
  filters: {
    // numsFilter(msg) {
    //   return msg || 0;
    // }
  },
  created() {},

  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
// 内容
.contents {
  .contetn_left,
  .contetn_right {
    width: 480px;
    box-sizing: border-box;
  }

  .contetn_center {
    width: 846px;
  }

  //左右两侧 三个块
  // .contetn_lr-item {
  //   height: 310px;
  // }

  // 热销产品排行
  .cprx{
    width: 480px;
    height: 350px;
    position: relative;
    margin-bottom: 17px;
  }

  // 全区月快递数
  .district_kd_num{
    width: 480px;
    height: 320px;
  }

  //交易概
  .trade{
    width:480px;
    height: 261px;
    position: relative;
    margin-top: 26px;
  }
  .contetn_center_top {
    width: 100%;
  }
// 店铺排行榜
  .rxdp_rank{
    width: 386px;
    height: 384px;
    margin-right: 23px;
    position: relative;
    float: left;
  }

  //销售订单 
  .sales{
    width: 386px;
    height: 324px;
    position: relative;
    float:left;
  }
  // 月寄递量
  .month_send{
    position: relative;
    width: 480px;
    height: 469px;
  }
// 电商入驻
  .settled{
    position: relative;
    width: 480px;
    height: 268px;
    margin-top: 15px;
  }

// 平台活动案例
  .active_cases{
    position: relative;
    width: 480px;
    height: 202px;
    margin-top: 20px;
  }
  // 中间
  .contetn_center {
    position: relative;
  }

  .contetn_center-bottom {
    height: 315px;
  }

  //左边 右边 结构一样
  .contetn_left{
    display:block;
    position: relative;
  }
  .contetn_right {
    display: flex;
    flex-direction: column;
    position: relative;
  }
}

@keyframes rotating {
  0% {
    -webkit-transform: rotate(0) scale(1);
    transform: rotate(0) scale(1);
  }
  50% {
    -webkit-transform: rotate(180deg) scale(1.1);
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    -webkit-transform: rotate(360deg) scale(1);
    transform: rotate(360deg) scale(1);
  }
}
</style>
