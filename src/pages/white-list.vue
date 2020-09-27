<template>
  <div class="white-list">
    <div class="title">
      <span>IP白名单</span>
    </div>
    <div class="center">
      <div class="choice">
        <p class="choice_title">
          <span class="choicen_one">选择服务</span>
          <span class="choicen_two">
            [
            <span :value="checkAll" @click="handleCheckAll">全选</span> |
            <span :value="checkAll" @click="handleCheckAll1">全不选</span>]
          </span>
        </p>
        <div class="white-list-all">
          <div class="white-list-item" v-for="(item, index) in CheckboxData" :key="index"
               :class="{'is-choosed':checkAllGroup.indexOf(item.service.serviceId)!=-1}"
               @click="chooseWhiteListItem(item.service.serviceId)">
            <img :src="item.service.img" alt/>
            <p>{{ item.service.name }}</p>
          </div>
        </div>
      </div>
      <div class="white-list_ip">
        <Input v-model="IpWhiteListData" type="textarea" placeholder="请输入白名单IP..." class="white-list_ip_input"/>
        <ul>
          <li>格式说说明；</li>
          <li>一行写一个IP，如：</li>
          <li>192.168.1.124</li>
          <li>192.168.1.126</li>
          <li>(充值类业务如话费、油卡等，强烈建议绑定服务IP白名单)</li>
        </ul>
      </div>
      <Button type="info" @click="updateWhiteList">保存设置</Button>
    </div>
  </div>
</template>
<script>
  import { getUserServiceList } from "../api/user-service";
  import { getWhiteList, updateWhiteList } from "../api/white-list";

  export default {
    data() {
      return {
        serverIds: "", //服务的ID逗号隔开字符串
        value: "",
        IpWhiteListData: "",
        indeterminate: false,
        checkAll: false,
        checkAllGroup: [],
        CheckboxData: []
      };
    },
    methods: {
      handleCheckAll() {
        this.checkAll = true;
        this.checkAllGroup = this.CheckboxData.map(item => {
          return Number(item.service.serviceId);
        });
      },
      handleCheckAll1() {
        this.checkAll = false;
        this.checkAllGroup = [];
      },
      //获取我的服务
      getMyService() {
        let params = {
          size: 100
        };
        getUserServiceList(params).then(res => {
          this.CheckboxData = res.data.content;
        }).catch(error => {
          this.$Message.error(error.body.message);
        });
      },
      //获取白名单
      getWhiteList() {
        getWhiteList().then(res => {
          this.IpWhiteListData = res.data.content.ips;
          this.serverIds = res.data.content.whiteListId;
          let serviceIdsData = res.data.content.serviceIds.split(",");
          this.checkAllGroup = serviceIdsData.map(item => {
            return Number(item);
          });
        }).catch(error => {
        });
      },
      //修改白名单
      updateWhiteList() {
        let data = {};
        data.id = this.serverIds;
        data.serviceIds = this.checkAllGroup.join(",");
        data.ips = this.IpWhiteListData;
        updateWhiteList(data).then(res => {
          this.$Message.success(res.data.message);
          this.getMyServe();
          this.getWhiteList();
        }).catch(error => {
          this.$Message.error(error.data.message);
        });
      },
      chooseWhiteListItem(id) {
        let index = this.checkAllGroup.findIndex(item => {
          return item === id;
        });
        if (index != -1) {
          this.checkAllGroup.splice(index, 1);
        } else {
          this.checkAllGroup.push(id);
        }
      }
    },
    created() {
    },
    mounted() {
      document.title = "IP白名单 - EasyAPI";
      this.getMyService();
      this.getWhiteList();
    }
  };
</script>
<style>
  .inpuit .ivu-input {
    width: 600px;
    height: 200px;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #dddddd;
  }

  .Checkbox .ivu-checkbox {
    padding-right: 10px;
  }
</style>

<style scoped>
  .white-list {
    width: 100%;
    height: auto;
  }

  .white-list .title {
    width: 100%;
    height: 80px;
    background-color: #ecf1f5;
  }

  .white-list .title span {
    width: 1200px;
    height: 80px;
    line-height: 80px;
    margin: 0 auto;
    font-size: 18px;
    display: block;
    color: #000000;
  }

  .center {
    width: 1200px;
    height: auto;
    margin: 0 auto;
  }

  .choice {
    width: 100%;
    height: auto;
    margin-top: 20px;
  }

  .choice .choice_title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }

  .choice .choice_title .choicen_one {
    color: #323232;
    font-size: 16px;
  }

  .choice .choice_title .choicen_two {
    margin-left: 10px;
    color: #999999;
    letter-spacing: 1px;
    font-size: 14px;
  }

  .white-list_ip {
    width: 100%;
    height: auto;
    display: flex;
  }

  .white-list_ip ul {
    width: 50%;
    height: auto;
    padding-left: 10px;
  }

  .white-list_ip ul li {
    height: 20px;
    color: #999999;
    font-size: 12px;
    list-style: none;
  }

  .white-list_ip_input {
    width: 600px;
    height: 200px;
    background-color: #ffffff;
    border-radius: 2px;
  }

  .white-list-all {
    display: flex;
    flex-wrap: wrap;
    width: 1200px;
  }

  .white-list-item {
    width: 80px;
    height: 110px;
    margin-right: 32px;
    margin-top: 10px;
    margin-bottom: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
  }

  .white-list-item:nth-child(11n) {
    margin-right: 0;
  }

  .white-list-item img {
    width: 80px;
    height: 80px;
  }

  .white-list-item p {
    width: 80px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #dddddd;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-top: 0;
  }

  .white-list-item.is-choosed p {
    border-color: #18c1d6;
    color: #18c1d6;
  }
</style>
