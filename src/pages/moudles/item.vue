<template>
  <div class="region">
    <div class="region_block" v-for="(item, index) of serviceList" :key="index">
      <div class="service_box">
            <span
              @click="
                jumpPage(
                  item.service.url,
                  item.service.hasConsole,
                  item.service.serviceId
                )
              "
              class="information_img"
            >
              <img style="width:80px;height: 80px" :src="item.service.img" alt/>
              <span class="information_fase">
                <strong style="font-size:16px;color:#333333;">{{ item.service.name }}</strong>
                <span
                  class="block"
                  v-if="item.service.type == '1'"
                  style="color: #24ac38;font-size:12px"
                >免费</span>
                <span
                  class="block"
                  v-if="item.service.type == '2' && item.teamService !== null"
                  style="font-size:12px"
                >
                  剩余
                  <span
                    v-if="item.teamService.balance < 100"
                    style="color:#ff4a53;"
                  >{{ item.teamService.balance }}</span>
                  <span v-else>{{ item.teamService.balance }}</span> 次
                   <span style="color: #ff4a53;" v-if="item.teamService.balance === 0">已到期</span>
                  <span
                    v-if="item.teamService.balance < 100"
                    @click.stop="pay(item)"
                    style="display: block;width:50px;height: 22px;background-color: #ff4a53;border-radius: 2px;color: #ffffff;line-height:22px;text-align: center;margin-top:5px;font-size: 12px"
                  >续费</span>
                </span>
                <span class="block" v-if="item.service.type == '3'" style="font-size:12px">
                  <span v-if="item.teamService.endTime <= currentTime">
                    <span style="color: #ff4a53;">已到期</span>
                    <span
                      @click.stop="pay(item)"
                      style="display: block;width:50px;height: 22px;background-color: #ff4a53;border-radius: 2px;color: #ffffff;line-height:22px;text-align: center;margin-top:5px;font-size: 12px"
                    >续费</span>
                  </span>
                  <span v-if="item.teamService.endTime > currentTime">
                    <span style="color:#999;" v-if="item.teamService.remainDay !==0">
                      剩余
                      <span
                        v-if="item.teamService.remainDay<100"
                        style="color:#ff4a53;"
                      >{{ item.teamService.remainDay }}</span>
                      <span v-else>{{ item.teamService.remainDay }}</span> 天
                    </span>

                    <span style="color: #ff4a53;" v-if="item.teamService.remainDay === 0">已到期</span>
                    <span
                      v-if="item.teamService.remainDay <= 30"
                      @click.stop="pay(item)"
                      style="display: block;width:50px;height: 22px;background-color: #ff4a53;border-radius: 2px;color: #ffffff;line-height:22px;text-align: center;margin-top:5px;font-size: 12px"
                    >续费</span>
                  </span>
                </span>
                <span
                  class="block"
                  v-if="item.service.type == '4'"
                  style="color: #999999;font-size: 12px"
                >按需</span>
              </span>
            </span>
        <span class="none">
              <span class="none_j">...</span>
              <ul class="ul_none">
                <li
                  @click="
                    openDialog(
                      item.teamService.teamServiceId,
                      item.service.serviceId,
                      item.service.type,
                      '秘钥管理',
                      0,
                      item.team.teamId,
                      item.teamService.remainDay,
                      item.service.name
                    )
                  "
                >秘钥管理</li>
                <li
                  @click="
                    openDialog(
                      item.teamService.teamServiceId,
                      item.service.serviceId,
                      item.service.type,
                      '成员管理',
                      1,
                      item.team.teamId,
                      item.teamService.remainDay,
                      item.service.name
                    )
                  "
                >成员管理</li>
                <li
                  v-if="
                    item.service.type !== 1 &&
                      item.service.type !== 4
                  "
                  @click="
                    openDialog(
                      item.teamService.teamServiceId,
                      item.service.serviceId,
                      item.service.type,
                      '余额提醒',
                      2,
                      item.team.teamId,
                      item.teamService.remainDay,
                      item.service.name
                    )
                  "
                >余额提醒</li>
              </ul>
            </span>
      </div>
    </div>
    <div class="region_block">
      <div class="market_box">
        <a href="https://market.easyapi.com">
              <span class="icon">
                <Icon type="md-add"/>
              </span>
          <span class="information_word">服务市场</span>
        </a>
      </div>
    </div>
    <Modal :title="dialogTitle" v-model="dialog" :mask-closable="false" width="1081px" class="flk">
      <div class="modal_dialog">
        <div class="modal_right">
          <p :class="{ state: dialogTitle === '秘钥管理' }" @click="stand('秘钥管理', 0)">
            <span class="fl" :class="{ f1: dialogTitle === '秘钥管理' }" @click="stand('秘钥管理')"></span>
            <i class="iconfont" style="padding-left:20px">&#xe600;</i>&nbsp;&nbsp; 秘钥管理
          </p>
          <p :class="{ state: dialogTitle === '成员管理' }" @click="stand('成员管理', 1)">
            <span class="fl" :class="{ f1: dialogTitle === '成员管理' }" @click="stand('成员管理')"></span>
            <i class="iconfont" style="padding-left:20px">&#xe61c;</i>&nbsp;&nbsp; 成员管理
          </p>
          <p
            :class="{ state: dialogTitle === '余额提醒' }"
            @click="stand('余额提醒', 2)"
            v-if="this.type !== 1 && this.type !== 4"
          >
            <span class="fl" :class="{ f1: dialogTitle === '余额提醒' }" @click="stand('余额提醒')"></span>
            <i class="iconfont" style="padding-left:20px">&#xe69e;</i>&nbsp;&nbsp; 余额提醒
          </p>
        </div>
        <!--秘钥管理-->
        <div class="modal_left" v-if="nowIndex === 0">
          <mySecret :formValidate="formValidate" :teamServiceId="teamServiceId"></mySecret>
        </div>
        <!--成员管理-->
        <div class="modal_left" v-if="nowIndex === 1">
          <myMember :serviceId="serviceId" :teamServiceId="teamServiceId"></myMember>
        </div>
        <!--余额提醒-->
        <div class="modal_left" v-if="nowIndex === 2&this.type !== 1 && this.type !== 4">
          <myBalance
            :judgmentUnit="judgmentUnit"
            :balance="balance"
            :remainDay="remainDay"
            :type="type"
            :serviceId="serviceId"
            :name="name"
          ></myBalance>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
  import myMember from "../setting/member";
  import myBalance from "../setting/balance";
  import mySecret from "../setting/secret";
  import {
    Surplus
  } from "../../api/api";
  import {
    getUserServiceList
  } from "../../api/user-service";
  import {
    getTeamService
  } from "../../api/team-service";

  export default {
    props: ["category"],
    components: { myMember, myBalance, mySecret },
    data() {
      return {
        dialogTitle: "秘钥管理",
        nowIndex: 0,
        dialog: false,
        serviceList: [],
        currentTime: "",
        teamServiceId: "",
        balance: "",
        serviceId: "",
        type: "",
        judgmentUnit: "",
        teamId: "",
        remainDay: "",
        name: "",
        formValidate: {
          appKey: "",
          appSecret: ""
        }
      };
    },
    methods: {
      stand(pay, index) {
        this.dialogTitle = pay;
        this.nowIndex = index;
      },
      openDialog(teamServiceId, serviceId, type, name, index, teamId, remainDay, serviceName) {
        this.dialog = true;
        this.teamServiceId = teamServiceId;
        this.serviceId = serviceId;
        this.type = type;
        this.dialogTitle = name;
        this.nowIndex = index;
        this.teamId = teamId;
        this.remainDay = remainDay;
        this.name = serviceName;
        this.secretKey();
      },
      jumpPage(URL, hasConsole, serviceId) {
        if (hasConsole === true) {
          window.location.href = "https://" + URL + ".easyapi.com/console/";
        } else {
          this.$router.push({ path: "/stat", query: { serviceId: serviceId } });
        }
      },
      pay(info) {
        let { service, teamService } = info;
        const { type, name, serviceId } = service;
        let num;
        if (type == 2) {
          num = teamService.balance;
        } else if (type == 3) {
          num = teamService.remainDay;
        }
        let url = `https:///team.easyapi.com/service/pay?type=${type}&serviceId=${serviceId}&serviceName=${name}&num=${num}`;
        let a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.click();
      },
      getUserServiceList(newValue) {
        let newCategory = newValue;
        let params = {
          serviceCategory: newCategory,
          size: 50
        };
        getUserServiceList(params).then(res => {
          res.data.content.map(item => {
            let timestampLogin = new Date(item.teamService.endTime).getTime();
            item.teamService.endTime = timestampLogin;
            if (item.teamService.endTime > this.currentTime) {
              item.teamService.remainDay = Math.floor((item.teamService.endTime - this.currentTime) / (1000 * 3600 * 24)) + 1;
            } else if (item.teamService.endTime <= this.currentTime) {
              item.teamService.remainDay = 0;
            }
          });
          this.serviceList = res.data.content;
          this.name = this.serviceList[0].team.name;
        }).catch(error => {
          console.log(error);
        });
      },
      //获取秘钥信息
      secretKey() {
        getTeamService(this.teamServiceId).then(res => {
          this.formValidate.appKey = res.data.appKey;
          this.formValidate.appSecret = res.data.appSecret;
          this.balance = res.data.balance;
          this.judgmentUnit = res.data.service.type;
        }).catch(error => {
          console.log(error);
        });
      },
      getCurrentTime() {
        this.currentTime = new Date().getTime();
      }
    },
    created() {
      this.getCurrentTime();
    },
    mounted() {
      this.getUserServiceList();
    },
    watch: {
      category(newValue) {
        this.getUserServiceList(newValue);
      }
    }
  };
</script>
<style scoped>
  .region {
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .region_block {
    width: 300px;
    height: 150px;
    float: left;
    margin-top: 10px;
  }

  .service_box {
    width: 275px;
    height: 120px;
    background-color: #ffffff;
    border: solid 1px #e4e4e4;
    display: flex;
    cursor: pointer;
    position: relative;
    margin-top: 10px;
  }

  .service_box:hover {
    box-shadow: 0px 2px 7px 0px rgba(1, 1, 1, 0.1);
  }

  .service_box .information_img {
    width: 90%;
    height: 100%;
    padding-top: 20px;
    padding-left: 20px;
    display: flex;
  }

  .service_box .information_fase {
    width: 65%;
    height: 100%;
    display: block;
    padding-left: 20px;
  }

  .block {
    display: block;
    color: #999999;
  }

  .none {
    width: 10%;
    height: 30px;
    font-size: 18px;
    display: none;
  }

  .service_box:hover .none {
    display: block;
  }

  .ul_none {
    width: 100px;
    height: auto;
    background-color: #ffffff;
    box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.15);
    display: none;
    position: absolute;
    left: 195px;
    top: 30px;
    padding: 0px;
  }

  .ul_none li {
    width: 100px;
    height: 34px;
    text-align: center;
    line-height: 34px;
    font-size: 14px;
    list-style-type: none;
  }

  .ul_none li:hover {
    background-color: #1bc1d6;
    color: #ffffff;
  }

  .none:hover .ul_none {
    display: block;
  }

  .modal_dialog {
    width: 100%;
    height: auto;
    display: flex;
  }

  .modal_dialog .modal_right {
    width: 17%;
    height: 500px;
    border-right: 1px solid #e5e5e5;
  }

  .modal_dialog .modal_right p {
    display: flex;
    width: 100%;
    height: 57px;
    line-height: 57px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 14px;
    color: #666666;
    cursor: pointer;
  }

  .modal_dialog .modal_right p:hover {
    color: #1bc1d6;
  }

  .state {
    color: #1bc1d6 !important;
  }

  .fl {
    display: block;
    width: 4px;
    height: 56px;
  }

  .f1 {
    width: 4px;
    height: 56px;
    background-color: #1bc1d6;
  }

  .modal_dialog .modal_right p:hover .fl {
    display: block;
    width: 4px;
    height: 56px;
    background-color: #1bc1d6;
  }

  .modal_dialog .modal_left {
    width: 83%;
    height: auto;
  }

  .secret_key {
    width: 100%;
    height: auto;
  }

  .staff_member ul {
    width: 42px;
    height: 100%;
    margin-left: 10px;
    list-style: none;
    font-size: 14px;
    color: #333;
  }

  .flk .ivu-modal-content {
    height: auto;
    background-color: #ffffff;
    box-shadow: 0px -2px 14px 0px rgba(0, 0, 0, 0.15);
  }

  .flk .ivu-modal-footer {
    display: none;
  }

  .flk .ivu-modal-header-inner {
    text-align: center;
    color: #333333;
    font-size: 18px;
    height: 50px !important;
    line-height: 50px !important;
  }

  .flk .ivu-modal-header {
    text-align: center;
    margin: 0px;
    padding: 0px;
  }

  .flk .ivu-modal-body {
    margin: 0px;
    padding: 0px;
  }

  .flk .ivu-input[disabled],
  fieldset[disabled] .ivu-input {
    background-color: #f5f5f5;
    color: #515a6e;
    border-right: none;
    border-bottom-right-radius: 0px;
    border-top-right-radius: 0px;
  }

  .ivu-btn.active,
  .ivu-btn:active {
    border-color: #18d1c6 !important;
  }

  .ivu-btn:hover {
    border-color: #18d1c6 !important;
  }

  .market_box {
    width: 275px;
    height: 120px;
    background-color: #ffffff;
    border: solid 1px #e4e4e4;
    cursor: pointer;
    margin-top: 10px;
  }

  .market_box:hover {
    box-shadow: 0px 2px 7px 0px rgba(1, 1, 1, 0.1);
  }

  .icon {
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size: 40px;
    color: #1cc0d6;
    display: block;
  }

  .information_word {
    width: 100%;
    height: 40px;
    display: block;
    text-align: center;
    font-size: 14px;
    color: #333333;
  }
</style>
