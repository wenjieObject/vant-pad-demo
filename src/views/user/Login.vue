<template>
  <div class="vanformdiv">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { apiLogin, apiVersion } from "../../request/api"; // 导入我们的api接口
import md5 from "js-md5";
import { Dialog, Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      website: "",
      versionFlag: false,
      currentVersion: "",
      versionExplain: "",
    };
  },

  methods: {
    onSubmit(values) {
      //this.$router.push({ path: "/home" });
      //返回用户名存入
      apiLogin({
        F_Account: values.username,
        F_Password: md5(values.password),
      }).then((res) => {
        // 获取数据成功后的其他操作
        if (res.StatusCode === 0) {
          Toast.success("登录成功");
          sessionStorage.setItem("token", res.Data.F_UserId);
          sessionStorage.setItem("usename", res.Data.F_RealName);
          this.$router.push({ path: "/home" });
        } else {
          Dialog.alert({
            title: "",
            message: res.Message,
          });
        }
      });

      //
    },

    getVersion() {
      apiVersion().then((res) => {
        debugger;
        // 获取数据成功后的其他操作
        if (res.StatusCode === 0) {
          var currentVersion = window.plus.runtime.version;
          console.log("当前版本" + currentVersion);
          console.log("返回值" + res);

          Dialog.confirm({
            title: "系统更新",
            message: "更新内容为",
          }).then(() => {
            this.Website = "http://10.12.100.208:9090/app/android_debug.apk";
            //window.plus.runtime.openURL(this.Website);
          });
        } else {
          Dialog.alert({
            title: "",
            message: res.Message,
          });
        }
      });
    },

    downWgt() {
      let that = this;

      const wgtUrl = "http://10.12.100.208:9090/app/android_debug.apk";
      //
      document.addEventListener("plusready", function () {
        window.plus.nativeUI.showWaiting("下载更新");
        var currentVersion = window.plus.runtime.version;
        console.log("当前版本" + currentVersion);
        window.plus.downloader
          .createDownload(
            wgtUrl,
            { filename: "_doc/update/" },
            function (d, status) {
              if (status == 200) {
                console.log("下载更新成功：" + d.filename);
                that.installWgt(d.filename); // 安装wgt资源包
              } else {
                console.log("下载更新失败！");
                window.plus.nativeUI.toast("下载更新失败！");
              }
              window.plus.nativeUI.closeWaiting();
            }
          )
          .start();
      });
    },

    installWgt(path) {
      window.plus.nativeUI.showWaiting("安装更新");
      window.plus.runtime.install(
        path,
        {},
        function () {
          window.plus.nativeUI.closeWaiting();
          console.log("安装更新成功！");
          window.plus.nativeUI.alert("更新完成！", function () {
            //  更新完成后重启应用
            window.plus.runtime.restart();
          });
        },
        function (e) {
          window.plus.nativeUI.closeWaiting();
          console.log("安装更新失败！[" + e.code + "]：" + e.message);
          window.plus.nativeUI.toast("安装更新失败！");
        }
      );
    },
  },
  mounted() {
    this.$store.commit("setBartitle", "登录");

    //自动更新apk
    this.downWgt();
  },
  // created() {
  //   if (window.plus) {
  //     this.plusReady();
  //   } else {
  //     document.addEventListener("plusready", this.plusReady, false);
  //   }
  // },
};
</script>

<style lang="scss" scoped>
.vanformdiv {
  margin-top: 50px;
}
</style>