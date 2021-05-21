<template>
  <div>
    <van-collapse v-model="activeNames">

      <van-collapse-item title="仓储管理" name="1">
        <van-grid clickable :gutter="5" :column-num="4">
          <van-grid-item v-for="item in pages"   :to="item.url" :key="item.url">
            <van-icon :name="item.icon" size="2rem" color="#1989fa" />
            <span>{{item.text}}</span>
          </van-grid-item>
        </van-grid>
      </van-collapse-item>
    
    </van-collapse>

    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from "../component/Tabbar";
export default {
  data() {
    return {
      activeNames: ["1"],
      pages: [
        {
          url: "/stockin",
          text: "扫码入库",
          icon: "play",
          node: "stock",
        },
        {
          url: "/stockout",
          text: "扫码出库",
          icon: "sort",
          node: "stock",
        },
      ],
    };
  },
  computed: {
    
  },
  mounted() {
    this.$store.commit("setBartitle", "主页");
  },
  components: {
    tabbar,
  },
};
</script>

<style lang="scss" scoped>
 
</style>