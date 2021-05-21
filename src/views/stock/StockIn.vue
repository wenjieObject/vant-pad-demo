<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="rkcode"
        name="rkcode"
        label="入库单号"
        placeholder="入库单号"
        ref="rkcodeRef"
        v-on:input="rkcodeChange"
        required
        :rules="[{ required: true, message: '请扫描入库单号' }]"
      />
      <van-field
        v-model="storageSeat"
        name="storageSeat"
        label="库位号"
        placeholder="库位号"
        :rules="[{ required: true, message: '请填写库位号' }]"
      />

      <van-cell
        title="销售单号"
        class="valueclz"
        :value="inputData.f_gksaleid"
      />
      <van-cell
        title="生产订单"
        class="valueclz"
        :value="inputData.f_mainorderid"
      />
      <van-cell
        title="流转批次"
        class="valueclz"
        :value="inputData.f_allnumber"
      />
      <van-cell title="性能" class="valueclz" :value="inputData.f_name" />
      <van-cell title="缺角数量" class="valueclz" :value="inputData.f_qjnum" />
      <van-cell
        title="缺角重量"
        class="valueclz"
        :value="inputData.f_qjweight"
      />
      <van-cell
        title="报工数量"
        class="valueclz"
        :value="inputData.f_reportworknumber"
      />
      <van-cell
        title="入库日期"
        class="valueclz"
        :value="inputData.f_storagedate"
      />

      <van-cell
        title="库名"
        class="valueclz"
        :value="inputData.f_storagename"
      />
      <van-cell title="委托单" class="valueclz" :value="inputData.f_wtorder" />
      <van-cell title="正常数量" class="valueclz" :value="inputData.f_zcnum" />
      <van-cell
        title="正常重量"
        class="valueclz"
        :value="inputData.f_zcweight"
      />
      <van-cell title="规格" class="valueclz" :value="inputData.size" />

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交入库</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { apiGetStoreIn, apiSetStorageIn } from "@/request/api";
import { Toast } from "vant";

export default {
  data() {
    return {
      storageSeat: "",
      rkcode: "",
      inputData: {
        f_name: "", //性能
        f_allnumber: "", //流转批次
        f_gksaleid: "", //销售单号
        f_mainorderid: "", //生产订单
        f_qjnum: 0, //缺角
        f_qjweight: 0, //缺角重
        f_reportworknumber: "", //报工
        f_storagedate: "", //入库日期
        f_storagename: "", //库名
        f_wtorder: "", //委托
        f_zcnum: 0, //正常数
        f_zcweight: 0, //正常重
        size: "",
      },
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

      apiSetStorageIn({
        rkcode: this.rkcode,
        storagearea: this.storageSeat,
        storageuserid: userId,
        storageusername: usename,
        storagedata: new Date(),
      }).then((res) => {
        if (res.code != 200) {
          Toast.fail(res.info);
          return;
        }
        Toast.success(res.info);
      }).catch(()=>{
        Toast.fail("请求出错,请联系系统维护人员");
      });
    },

    //扫描完成后
    rkcodeChange(val) {
      if (val.length < 13) return;

      if (val.substring(0, 2) !== "PR") {
        if (val.length !== 14) {
          return;
        }
      }

      apiGetStoreIn({ "": val }).then((res) => {
        console.log(res);
        if (res.code !== 200) {
          Toast.fail(res.info);
          return;
        }
        var rows = res.data.rows;
        if (rows.length == 0) {
          return;
        }
        this.inputData = rows[0];
      });
    },
  },
  mounted() {
    this.$store.commit("setBartitle", "扫码入库");
    this.$refs.rkcodeRef.focus();
  },
};
</script>

<style lang="scss" scoped>
.valueclz {
  padding-top: 1px;
  padding-bottom: 1px;
}
</style>