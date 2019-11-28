<template>
  <div>
    <div class="secret_balance">
      <div class="balance_remind">
        <p v-if="judgmentUnit === 2">
          <span>当前剩余次数：&nbsp;&nbsp;&nbsp;&nbsp;{{ balance }}次</span>
        </p>
        <p v-if="judgmentUnit === 3">
          <span>当前剩余时间：&nbsp;&nbsp;&nbsp;&nbsp;{{ remainDay }}天</span>
        </p>
        <p style="padding-left:48px">
          <span>是否提醒：</span>
          <i-switch size="large" v-model="switch1" @on-change="change" style="margin-left:14px;">
            <span slot="open" style="color: #fff">开启</span>
            <span slot="close" style="color: #fff">关闭</span>
          </i-switch>
        </p>
        <p v-if="this.type == 2 && this.type == 1 && this.type == 4">
          <span>剩余提醒次数：&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <InputNumber v-model="balanceWarnNo" :disabled="!switch1" :min="1"></InputNumber>
          <span>&nbsp;&nbsp;次</span>
        </p>
        <p v-if="this.type == 3">
          <span>剩余提醒时间：&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <InputNumber v-model="balanceWarnNo" :disabled="!switch1" :min="1"></InputNumber>
          <span>&nbsp;&nbsp;天</span>
        </p>
        <div style="padding-left:48px;display:flex">
          <span style="line-height:60px;color:#000;font-size: 14px">通知人员：</span>
          <span style="margin-left:20px;height:auto;width:80%;">
            <CheckboxGroup
              v-model="checkbox"
              style="width:100%;height:auto;line-height:60px;;float: left"
            >
              <Checkbox
                :label="User.user.id"
                v-for="(User, userIndex) in tipsMember"
                :key="userIndex"
                style="width:150px;height:60px;margin-right:20px;position:relative"
              >
                <img
                  :src="User.user.photo"
                  alt
                  style="width:40px;height:40px;border-radius:25px;margin-left:5px;position:absolute;bottom:10px"
                />
                <span
                  style="margin-left:53px;color: #333333;font-size: 14px;"
                >{{ User.user.nickname }}</span>
              </Checkbox>
            </CheckboxGroup>
          </span>
        </div>
      </div>
      <div class="balance_btn">
        <Button
          @click="renew"
          style="	width:100px;height:40px;font-size:14px;background-color: #18c1d6;color: #fff;margin-top:40px"
        >续费</Button>
      </div>
    </div>
    <div class="btn">
      <Button
        @click="reviseTheBalance"
        style="	width:100px;height:40px;font-size:14px;background-color: #18c1d6;color: #fff;margin-left:120px;margin-top:10px"
      >保存设置</Button>
    </div>
    <div class="ea-warnBox">
      <p>备注：</p>
      <p>1、单击"开启"或"关闭" 控件改变提醒状态</p>
      <p>2、单机 进入编辑模式，更改余额提醒上限</p>
      <p>3、单机 添加提醒列表</p>
      <p>4、单机提醒列表中 按钮删除该联系人</p>
      <p>5、请注意： 提醒方式和提醒列表是账户共享设置</p>
    </div>
  </div>
</template>

<script>
import {
  // getUserService,
  // Surplus,
  Reminding,
  memberList,
  modifyBalance
} from '../../api/api'
export default {
  name: 'myBalance',
  props: ['judgmentUnit', 'balance', 'remainDay', 'type', 'serviceId'],
  data() {
    return {
      switch1: '', //提醒开关
      balanceWarnNo: 0,
      checkbox: [],
      tipsMember: []
    }
  },
  methods: {
    change(status) {
      if (status) {
        this.$Message.info('开启提醒')
      } else {
        this.$Message.info('取消提醒')
      }
    },
    //余额提醒上限
    remindingOfTheBalance() {
      this.$ajax({
        method: 'GET',
        url: Reminding + '/' + this.serviceId,
        headers: {
          authorization: this.authenticationToken,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          if (res.data.code === 0) {
            // this.$Message.error("余额提醒上限暂无数据");
            this.switch1 = false
          } else {
            this.switch1 = true
            this.balanceWarnNo = res.data.content.count
          }
        })
        .catch(error => {
          console.log(error)
          if (error.data.code === -1) {
            this.$Message.warning(error.data.message)
          } else {
            this.$Message.error('数据错误')
          }
        })
    },
    //修改余额提醒设置
    reviseTheBalance() {
      let remindUserIds = this.checkbox.join(',')
      this.$ajax({
        method: 'PUT',
        url: modifyBalance,
        headers: {
          authorization: this.authenticationToken
        },
        params: {
          remindUserIds: remindUserIds,
          ifRemind: this.switch1,
          serviceId: this.serviceId,
          count: this.balanceWarnNo
        }
      })
        .then(res => {
          this.$Message.success(res.data.message)
        })
        .catch(error => {
          console.log(error)
          this.$Message.error(error.response.data.message)
        })
    },
    //提示人员
    promptingStaff() {
      this.$ajax({
        method: 'get',
        url: modifyBalance,
        headers: {
          authorization: this.authenticationToken
        },
        params: {
          serviceId: this.serviceId
        }
      })
        .then(res => {
          this.selectedPersonnel = res.data.content
          let code = res.data.code
          if (code !== 0) {
            for (let i = 0; i < this.selectedPersonnel.length; i++) {
              this.checkbox[i] = this.selectedPersonnel[i].remindUser.id
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    //余额提醒成员列表
    getNmaeList() {
      this.$ajax({
        method: 'GET',
        url: memberList + this.serviceId + '/users',
        headers: {
          authorization: this.authenticationToken
        },
        params: {
          size: 100,
          types: '创建人,管理员'
        }
      })
        .then(res => {
          this.tipsMember = res.data.content
        })
        .catch(error => {
          console.log(error)
        })
    },
    //续费跳转页面
    renew() {
      if (this.type == 3) {
        this.$router.push({
          path: '/renew/monthly',
          query: { serviceId: this.serviceId, teamServiceId: this.tsID }
        })
      }
      if (this.type == 2 || this.type == 1 || this.type == 4) {
        this.$router.push({
          path: '/renew/count',
          query: { serviceId: this.serviceId, teamServiceId: this.tsID }
        })
      }
    }
  },
  created() {
    this.remindingOfTheBalance()
    this.promptingStaff()
    this.getNmaeList()
  }
}
</script>
<style lang="stylus">
.secret_balance {
  width: 100%;
  height: auto;
  display: flex;
}

.secret_balance .balance_remind {
  width: 80%;
  height: auto;
}

.secret_balance .balance_remind p {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
}

.secret_balance .balance_remind p span {
  color: #000000;
  font-size: 14px;
}

.balance_btn {
  width: 20%;
  height: auto;
}

.btn {
  width: 100%;
  height: 60px;
}

.ea-warnBox {
  width: 100%;
  height: auto;
  padding-left: 130px;
}

.ea-warnBox p {
  color: #999999;
  font-size: 14px;
}
</style>