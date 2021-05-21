

<template>
  <div class="maindiv">
    <van-nav-bar
      :title="nav_bar_title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);//返回上一层
    },
  },

  computed: {
    ...mapState({
      nav_bar_title: (state) => state.nav.nav_bar_title,
    }),
  },
};
</script>

<style scoped>
.maindiv {
  height: 100%;
  background-color: #f2f3f5;
}
</style>