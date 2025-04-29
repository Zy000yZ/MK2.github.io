<template>
  <!--  -->
  <div class="HeritageAdd">
    <div class="HeritageAdd-bottom padding15">
      <br />
      <el-button @click="getCoordinateP" v-show="newCoordinate.length === 0"
        >请先拾取煤炭资源位置坐标</el-button
      >

      <div class="main-box" v-show="newCoordinate.length !== 0">
        <el-form
          size="mini"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="企业名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="采矿许可证" prop="ckid">
            <el-input v-model="ruleForm.ckid"></el-input>
          </el-form-item>
          <el-form-item label="档案编号" prop="daid">
            <el-input v-model="ruleForm.daid"></el-input>
          </el-form-item>
          <el-form-item label="隶属企业" prop="company">
            <el-input v-model="ruleForm.company"></el-input>
          </el-form-item>
          <el-form-item label="生成能力（万吨/年）" prop="num">
             <el-input-number v-model="ruleForm.num"  :min="1" :max="999999" ></el-input-number>
          </el-form-item>
          <el-form-item label="开拓方式">
            <el-select v-model="ruleForm.type" placeholder="请选择">
              <el-option label="平硐开拓" value="平硐开拓"> </el-option>
              <el-option label="斜井开拓" value="斜井开拓"> </el-option>
              <el-option label="主立副斜" value="主立副斜"> </el-option>
              <el-option label="主平副斜" value="主平副斜"> </el-option>
              <el-option label="主斜副立" value="主斜副立"> </el-option>
              <el-option label="主斜副斜" value="主斜副斜"> </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="坐标经度" prop="jing">
            <el-input style="width: 200px" v-model="ruleForm.jing"></el-input>
          </el-form-item>
          <el-form-item label="坐标纬度" prop="wei">
            <el-input style="width: 200px" v-model="ruleForm.wei"></el-input>
            <el-button @click="getCoordinateP" style="margin-left: 10px"
              >重新拾取</el-button
            >
          </el-form-item>

          <el-form-item label="井筒数量" prop="jtnum">
             <el-input-number v-model="ruleForm.jtnum"  :min="1" :max="999999" ></el-input-number>
          </el-form-item>
          <el-form-item label="采煤工艺">
            <el-select v-model="ruleForm.sctype" placeholder="请选择">
              <el-option label="综采放顶煤" value="综采放顶煤"> </el-option>
              <el-option label="综采一次采全高" value="综采一次采全高">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="瓦斯等级">
            <el-select v-model="ruleForm.lev" placeholder="请选择">
              <el-option label="低瓦斯" value="低瓦斯"> </el-option>
              <el-option label="高瓦斯" value="高瓦斯"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自燃倾向性" prop="dangerlev">
            <el-input v-model="ruleForm.dangerlev"></el-input>
          </el-form-item>
          <el-form-item label="开采状态">
            <el-select v-model="ruleForm.now" placeholder="请选择">
              <el-option label="正在开采" value="正在开采"> </el-option>
              <el-option label="正在建设" value="正在建设"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="subBtn">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">清空提示</el-button>
        </div>
      </div>
    </div>

    <div class="HeritageAdd-images"></div>
  </div>
</template>

<script
  type="text/javascript"
  src="https://webapi.amap.com/maps?v=1.4.15&key=2eccb47b400c8ab58f2dc596dbfe9d53&plugin=AMap.MouseTool,AMap.DistrictSearch"
></script>
<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "HeritageAdd",

  computed: {
    ...mapState(["newCoordinate", "instryType"]),
  },
  async created() {
    // 将坐标拾取状态改为add
    console.log(this.newCoordinate);
    this.changeCoordinateType("add");
    console.log(this.$route);
    if (this.$route.params.editid !== "add") {
      var res = "";

      if (this.instryType === "one") {
        res = await this.$axios.post("/LandJianKongGetOne/LandJianKongGetOne", {
          _id: this.$route.params.editid,
        });
      }

      console.log(res.data.data);

      this.ruleForm = res.data.data[0];
      this.ruleForm.coordinate = this.ruleForm.coon.split(",");
      this.ruleForm.jing = this.ruleForm.coordinate[0];
      this.ruleForm.wei = this.ruleForm.coordinate[1];
      console.log("编辑数据", this.ruleForm);
      this.getCoordinate(this.ruleForm.coordinate);
    } else {
      this.ruleForm.jing = this.newCoordinate[0];
      this.ruleForm.wei = this.newCoordinate[1];
    }
  },
  data() {
    return {
      ruleForm: {
        name: "", //
        ckid: "", //
        jing: 0,
        wei: 0,
        daid: "", //
        company: "", //
        num: 1, //
        type: "斜井开拓",
        jtnum: 1, //
        sctype: "综采放顶煤", //
        lev: "低瓦斯", //
        dangerlev: "自然", //
        now: "正在开采", //
        coon: "",
        coordinate: [],
      },
      rules: {
        name: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
          { min: 3, message: "长度在不少于3个字符", trigger: "blur" },
        ],

        ckid: [
          {
            required: true,
            message: "请输入采矿许可证",
            trigger: "change",
          },
        ],
        daid: [
          {
            required: true,
            message: "请输入档案编号",
            trigger: "change",
          },
        ],

        jing: [
          {
            required: true,
            message: "请输入企业地理坐标",
            trigger: "change",
          },
        ],
        wei: [
          {
            required: true,
            message: "请输入企业地理坐标",
            trigger: "change",
          },
        ],
         company: [
          {
            required: true,
            message: "请输入隶属企业",
            trigger: "change",
          },
        ],
         dangerlev: [
          {
            required: true,
            message: "请输入自燃倾向性",
            trigger: "change",
          },
        ],
      },
    };
  },

  methods: {
    ...mapMutations([
      "getCoordinate",
      "changeCoordinateType",
      "getapplyCoordinate",
    ]),

    //跳转页面拾取坐标位置
    getCoordinateP() {
      this.getapplyCoordinate([]);
      this.$router.push("/get/coordinate");
    },

    submitForm(formName) {
      console.log(formName);
      console.log(this.ruleForm);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 格式化数据
          this.ruleForm.coordinate = [this.ruleForm.jing, this.ruleForm.wei];
          this.ruleForm.coon = this.ruleForm.jing + `,` + this.ruleForm.wei;
          // 格式已经处理完毕，下面发送请求
          console.log(this.ruleForm);
          // 发送请求;
          if (this.$route.params.editid !== "add") {
            // 编辑部分
            var res = await this.$axios.post(
              "/editHeritageMainData/editHeritageMainData",
              {
                _id: this.ruleForm._id,
                addType: this.ruleForm.addType,
                name: this.ruleForm.name,
                company: this.ruleForm.company,
                start: this.ruleForm.start,
                prolevel: this.ruleForm.prolevel,
                coon: this.ruleForm.coon,
                brief: this.ruleForm.brief,
              }
            );
            console.log("res====", res);
            if (res.status === 200) {
              this.$message({
                message: "信息编辑成功",
                type: "success",
              });
              this.getCoordinate([]); //将拾取到的坐标清空
              this.$router.push("/data/manage");
            }
          } else {
            console.log(this.ruleForm);
              var res2 = await this.$axios.post(
                "/DaTongMeiTanMarkerAdd/DaTongMeiTanMarkerAdd",
                this.ruleForm
              );
              if (res2.status === 200) {
                this.$notify({
                  title: "企业信息添加成功",
                });
                this.getCoordinate([]); //将拾取到的坐标清空
                this.$router.push("/DataList");
              }
          }
        } else {
          this.$message.error("请检查完善相关信息");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.HeritageAdd-bottom {
  background-color: white;
  margin: 20px;
}
/* .HeritageAdd {
  overflow: auto;
} */
</style>
