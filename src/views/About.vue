 

<template>
  <div class="about">
    <van-cell-group>
      <van-cell title="在线用户" :value="username" />
      <van-cell title="登出系统" value=""  @click="logout" is-link to="/" />
    </van-cell-group>

    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "../component/Tabbar";
export default {
  data() {
    return {
      username: ''
    }
  },
  components: {
    tabbar,
  },
  methods: {
    logout() {
      sessionStorage.removeItem("token");
    }
  },
  mounted() {
    this.$store.commit("setBartitle", "个人信息");
    this.username = sessionStorage.getItem("usename");
  },
};
</script>

<style lang="scss" scoped>
</style>
