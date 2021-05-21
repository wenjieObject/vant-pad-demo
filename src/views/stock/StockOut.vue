<template>
  <div>
    <van-field
      v-model="wtOrder"
      name="wtOrder"
      ref="wtOrderRef"
      label="委托单号"
      placeholder="委托单号"
      v-on:input="wtOrderChange"
      :rules="[{ required: true, message: '请填写委托单号' }]"
    />

    <van-divider />

    <van-list>
      <van-cell-group v-for="(item, index) in listData" :key="index">
        <van-cell
          title="流转批次"
          value-class="valueclz"
          :value="item.f_allnumber"
        />
        <van-cell
          title="物料代码"
          value-class="valueclz"
          :value="item.f_materialid"
        />
        <van-cell
          title="缺角数量"
          value-class="valueclz"
          :value="item.f_pickingqjquantity"
        />
        <van-cell
          title="缺角重量"
          value-class="valueclz"
          :value="item.f_pickingqjweight"
        />
        <van-cell
          title="领用数量"
          value-class="valueclz"
          :value="item.f_pickingquantity"
        />
        <van-cell
          title="领用重量"
          value-class="valueclz"
          :value="item.f_pickingweight"
        />
        <van-cell
          title="入库单号"
          value-class="valueclz"
          :value="item.f_rkdh"
        />
        <van-cell
          title="规格"
          value-class="valueclz"
          :value="item.f_specifications"
        />
        <van-cell
          title="库区"
          value-class="valueclz"
          :value="item.f_storagearea"
        />
      </van-cell-group>
    </van-list>

    <div style="margin: 16px">
      <van-button round block type="info" native-type="submit" @click="onSubmit"
        >确认出库</van-button
      >
    </div>
  </div>
</template>

<script>
import {
  apiGetProductionPlanPickInfo,
  apiSetProductionPlanPick,
} from "@/request/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      wtOrder: "",
      listData: [],
      wtData: {
        f_allnumber: "",
        f_materialid: "",
        f_pickingqjquantity: "",
        f_pickingqjweight: "",
        f_pickingquantity: "",
        f_pickingweight: "",
        f_rkdh: "",
        f_specifications: "",
        f_storagearea: "",
      },
      errMsg: "请求失败，请联系系统维护人员",
    };
  },
  methods: {
    onSubmit() {
      var userId = sessionStorage.getItem("token");
      var usename = sessionStorage.getItem("usename");
      if (!userId) {
        Toast.fail("登录失效，请重新登录");
        return;
      }

      apiSetProductionPlanPick({
        wtorder: this.wtOrder,
        storageuserid: userId,
        storagedata: new Date(),
        storageusername: usename,
      })
        .then((res) => {
          //提交数据
          if (!res.code || res.code !== 200) {
            Toast.fail(res.info);
            return;
          }
          Toast.success(res.info);
        })
        .catch(() => {
          Toast.fail(this.errMsg);
        });
    },

    //
    wtOrderChange(val) {
      if (val.length !== 13) {
        return;
      }
      // 调用api接口，并且提供了两个参数
      apiGetProductionPlanPickInfo({ "": val }).then((res) => {
        // 获取数据成功后的其他操作

        if (res.code !== 200) {
          Toast.fail(res.info);
          return;
        }
        this.listData = res.data.rows;
      });
    },
  },
  mounted() {
    this.$store.commit("setBartitle", "领料出库");
    this.$refs.wtOrderRef.focus();
  },
};
</script>

<style lang="scss" scoped>
.van-cell-group .van-cell {
  padding: 1px 16px;
}
.valueclz {
  font-weight: bold;
  font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑,
    STHeiti, MingLiu;
}
.van-cell-group {
  margin-bottom: 5px;
}
.van-divider {
  margin: 5px 0;
}
</style>