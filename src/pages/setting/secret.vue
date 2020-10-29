<template>
  <div class="secret_key">
    <Form
      ref="formValidate"
      :model="formValidate"
      :rules="ruleValidate"
      :label-width="100"
    >
      <FormItem
        label="appKey"
        prop="appKey"
        style="margin-top: 20px"
        class="fk"
      >
        <Input
          placeholder="appKey"
          v-model="formValidate.appKey"
          disabled
          style="width: 300px"
          id="copyAppKey"
        />
        <button
          type="button"
          class="copy"
          :data-clipboard-text="this.formValidate.appKey"
          @click="copyAppKey"
        >
          复制
        </button>
      </FormItem>
      <FormItem label="appSecret" prop="appSecret" class="fk">
        <Input
          :type="inputType"
          v-model="formValidate.appSecret"
          disabled
          placeholder="appSecret"
          style="width: 300px"
          class="copyContent"
        />
        <button
          type="button"
          class="copy"
          :data-clipboard-text="this.formValidate.appSecret"
          @click="copyAppSecret"
        >
          复制
        </button>
        <span class="display" @click="showInputData">{{ btnContent }}</span>
      </FormItem>
      <FormItem>
        <Button type="info" @click="showResetKey()">更换秘钥 </Button>
        <span
          style="
            display: block;
            margin-top: 10px;
            color: #999999;
            font-size: 12px;
          "
          >此秘钥仅限于短信服务使用</span
        >
        <span style="line-height: 0px; color: #999999; font-size: 12px"
          >出于安全考虑，建议您周期性的更换密钥</span
        >
      </FormItem>
    </Form>

    <Modal
      v-model="resetKeyModal"
      title="温馨提示"
      @on-ok="ok"
      @on-cancel="cancel"
      :styles="{ top: '230px' }"
      width="350"
    >
      <div>
        <p>
          重置之后，以前的appKey和appSecret将不能正常使用，并且会导致以前的API调用失效。重置appKey和appSecret后，请及时将以前的接口调用中的参数进行更新。
        </p>
        <p>确认重置appKey和appSecret吗？</p>
      </div>
    </Modal>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import { resetKey, getTeamService } from "../../api/team-service";

export default {
  name: "SettingSecret",
  props: ["teamServiceId"],
  data() {
    return {
      ruleValidate: {
        appKey: [
          {
            required: true,
            message: "请输入appKey，且不能为空",
            trigger: "blur",
          },
        ],
        appSecret: [
          {
            required: true,
            message: "请输入appSecret，且不能为空",
            trigger: "blur",
          },
        ],
      },
      formValidate: {
        appKey: "",
        appSecret: "",
      },
      inputType: "password",
      btnContent: "显示",
      resetKeyModal: false,
    };
  },
  methods: {
    copyAppKey() {
      let clipboard = new Clipboard(".copy");
      clipboard.on("success", () => {
        this.$Message.success("复制appKey成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        // 不支持复制
        this.$Message.error("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    copyAppSecret() {
      let clipboard = new Clipboard(".copy");
      clipboard.on("success", () => {
        this.$Message.success("复制appSecret成功");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", () => {
        // 不支持复制
        this.$Message.error("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    showInputData() {
      if (this.inputType === "password") {
        this.inputType = "text";
        this.btnContent = "隐藏";
      } else {
        this.inputType = "password";
        this.btnContent = "显示";
      }
    },
    //获取秘钥信息
    secretKey() {
      getTeamService(this.teamServiceId)
        .then((res) => {
          this.formValidate.appKey = res.data.appKey;
          this.formValidate.appSecret = res.data.appSecret;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ok() {
      resetKey(this.teamServiceId)
        .then((res) => {
          this.formValidate.appKey = res.data.content.appKey;
          this.formValidate.appSecret = res.data.content.appSecret;
          this.$Message.success(res.data.message);
        })
        .catch((error) => {
          console.log(error);
          this.$Message.error(error.data.message);
        });
    },
    cancel() {
      this.resetKeyModal = false;
    },
    //修改秘钥
    showResetKey() {
      this.resetKeyModal = true;
    },
  },
  mounted() {
   this.secretKey();
  },
};
</script>
<style lang="stylus">
.fk .ivu-form-item-content {
  display: flex;
}

.copy {
  display: block;
  width: 50px;
  height: 32px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #dcdee2;
  background-color: #f5f5f5;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
  cursor: pointer;
}

.display {
  width: 32px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  background-color: #4a91f8;
  border-radius: 3px;
  border: solid 1px #427fd8;
  color: #ffffff;
  font-size: 12px;
  cursor: pointer;
  position: absolute;
  left: 250px;
  top: 8px;
}
</style>
