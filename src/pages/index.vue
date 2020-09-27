<template>
  <div class="mainPage">
    <div class="mainPage-title">
      <span>{{ teamName }}</span>
    </div>
    <div class="row">
      <div
        style="width:100%;height:50px;line-height:30px;margin-top:30px;border-bottom: 1px solid#e2e2e2;margin-bottom:20px;"
      >
        <span
          :class="{ colour: category === '' }"
          @click="colorSwitching('')"
          style="font-size: 18px;color: #999999;cursor: pointer"
        >全部</span>
        <span
          :class="{ colour: category === 1 }"
          @click="colorSwitching(1)"
          style="font-size: 18px;color: #999999;margin-left:45px;cursor: pointer"
        >接口服务</span>
        <span
          :class="{ colour: category === 2 }"
          @click="colorSwitching(2)"
          style="font-size: 18px;color: #999999;margin-left:45px;cursor: pointer"
        >场景服务</span>
        <span
          :class="{ colour: category === 3 }"
          @click="colorSwitching(3)"
          style="font-size: 18px;color: #999999;margin-left:45px;cursor: pointer"
        >数据服务</span>
      </div>
      <ServiceItem :category="category"></ServiceItem>
      <div class="configure">
        <p class="configure_p">
          <strong>配置</strong>
        </p>
        <div class="configure_box" @click="jumpPage">
          <span class="configure_box_icon">
            <img src="../assets/images/ip.png" alt/>
          </span>
          <strong
            style="font-size: 16px;color: #333333;text-align: center;display: block;height: 40px"
          >IP白名单</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ServiceItem from "./moudles/item";
  import { mapGetters } from "vuex";

  export default {
    components: { ServiceItem },
    data() {
      return {
        defaultMemberImg: "",
        defaultMemberNickname: "",
        defaultMemberType: "",
        tipsMember: "",
        startTime: "",
        isShow: false,
        changeKeyHint: false,
        serveType: null,
        type: "",

        balanceWarnNo: null,

        userId: "",
        show: false,
        code: "",
        MemberId: "",
        category: "",
        titleSubscript: "",
        selectedPersonnel: "",
        name: ""
      };
    },
    methods: {
      //跳转到白名单页面
      jumpPage() {
        this.$router.push({ path: "/white-list" });
      },
      //按月续费
      // monthlyPage(serviceId, teamServiceId) {
      //   this.$router.push({
      //     path: "/renew/monthly",
      //     query: { serviceId: serviceId, teamServiceId: teamServiceId }
      //   });
      // },

      //服务列表
      colorSwitching(category) {
        this.category = category;
      }
    },
    created() {
    },
    mounted() {
      document.title = "服务中心 - EasyAPI";
    },
    computed: {
      ...mapGetters(["photo", "team", "teamName", "teamImg", "teamList"])
    }

  };
</script>
<style>
  .row .ivu-tabs-bar {
    height: 100px;
    margin: 0px;
  }

  .row .ivu-tabs-mini .ivu-tabs-nav-container {
    padding-top: 60px;
    height: 100px;
  }

  .row .ivu-tabs-tab {
    width: 100px;
    font-size: 16px;
    text-align: center;
  }

  .row .ivu-tabs-ink-bar {
    background-color: #fff;
  }
</style>
<style scoped>
  .mainPage {
    width: 100%;
    height: auto;
  }

  .mainPage .mainPage-title {
    width: 100%;
    height: 80px;
    background-color: #ecf1f5;
  }

  .mainPage .mainPage-title span {
    width: 1200px;
    height: 80px;
    line-height: 80px;
    margin: 0 auto;
    font-size: 18px;
    display: block;
    color: #333333;
  }

  .row {
    width: 1200px;
    height: auto;
    margin: 0 auto;
  }

  .configure {
    width: 100%;
    height: auto;
    margin-bottom: 50px;
  }

  .configure .configure_p {
    width: 100%;
    height: 50px;
    font-size: 18px;
    line-height: 50px;
    color: #333333;
    margin-top: 40px;
    border-bottom: 1px solid #e2e2e2;
  }

  .configure .configure_box {
    width: 275px;
    height: 235px;
    background-color: #ffffff;
    border: solid 1px #e4e4e4;
    cursor: pointer;
    margin-top: 40px;
  }

  .configure .configure_box:hover {
    box-shadow: 0px 2px 7px 0px rgba(1, 1, 1, 0.1);
  }

  .configure .configure_box .configure_box_icon {
    display: block;
    width: 100%;
    padding-top: 60px;
    height: 175px;
    text-align: center;
  }

  .colour {
    color: #1ac1d6 !important;
  }
</style>
