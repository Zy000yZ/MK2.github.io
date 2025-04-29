<template>
  <div class="user-data-manage">
    <div class="mani">
      <el-button size="small" type="info" @click="downList"
        >下载导出煤炭资源数据表至本地</el-button
      >

      <el-button size="small" type="info" @click="addTrlData"
        >添加煤炭资源</el-button
      >

      <el-input
        style="width: 300px; margin-left: 15px"
        placeholder="请输入企业名称关键词进行属性查询"
        v-model="searchStr"
        size="small"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchClick"
        ></el-button>
      </el-input>
      <br />
      <br />
      <el-table :data="tableData" border style="width: 100%" height="470">
        <el-table-column fixed type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column fixed prop="name" label="企业名称" width="180">
        </el-table-column>
        <el-table-column prop="ckid" label="采矿许可证编号" width="120">
        </el-table-column>
        <el-table-column prop="jing" label="坐标经度" width="100">
        </el-table-column>
        <el-table-column prop="wei" label="坐标纬度" width="100">
        </el-table-column>
        <el-table-column prop="daid" label="档案编号"> </el-table-column>
        <el-table-column prop="company" label="隶属企业" width="180">
        </el-table-column>
        <el-table-column prop="num" label="生产能力（万吨/年）">
        </el-table-column>
        <el-table-column prop="type" label="开拓方式"> </el-table-column>
        <el-table-column prop="jtnum" label="井筒数量/个"> </el-table-column>
        <el-table-column prop="sctype" label="采煤工艺"> </el-table-column>
        <el-table-column prop="lev" label="瓦斯等级"> </el-table-column>
        <el-table-column prop="dangerlev" label="自燃倾向性" width="180">
        </el-table-column>
        <el-table-column prop="now" label="开采状态"> </el-table-column>

        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="getMain(scope.row)"
              >查看</el-button
            >
            <el-button
              style="color: red"
              type="text"
              size="small"
              @click="delMain(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="jqMain.name" :visible.sync="dialogFormVisible">
      <p style="padding-bottom: 6px">采矿许可证编号：{{ jqMain.ckid }}</p>
      <p style="padding-bottom: 6px">档案编号：{{ jqMain.daid }}</p>
      <p style="padding-bottom: 6px">隶属企业：{{ jqMain.company }}</p>
      <p style="padding-bottom: 6px">生产能力（万吨/年）：{{ jqMain.num }}</p>
      <p style="padding-bottom: 6px">开拓方式：{{ jqMain.type }}</p>
      <p style="padding-bottom: 6px">井筒数量：{{ jqMain.jtnum }}个</p>
      <p style="padding-bottom: 6px">采煤工艺：{{ jqMain.sctype }}</p>
      <p style="padding-bottom: 6px">瓦斯等级：{{ jqMain.lev }}</p>
      <p style="padding-bottom: 6px">自燃倾向性：{{ jqMain.dangerlev }}</p>
      <p style="padding-bottom: 6px">开采状态：{{ jqMain.now }}</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
export default {
  components: {},
  data() {
    return {
      tableData: [],
      mainData: [],

      dialogFormVisible: false,
      form: {
        username: "",
        password: "",
        phone: "",
        licensePlate: [],
      },
      formLabelWidth: "120px",

      jqMain: {
        name: "同煤大唐塔山煤矿有限公司塔山矿",
        ckid: "C1000002009041120014651",
        jing: 113.090685,
        wei: 39.936395,
        daid: "143201016-005",
        company: "晋能控股煤业集团有限公司",
        num: 2500,
        type: "平硐开拓",
        jtnum: 9,
        sctype: "综采放顶煤",
        lev: "高瓦斯",
        dangerlev: "自燃",
        now: "正在开采",
      },

      searchStr: "",
    };
  },

  async created() {
    this.getData();
  },

  methods: {
    async getData() {
      var res = await this.$axios.get(
        "/DaTongMeiTanMarkerGet/DaTongMeiTanMarkerGet"
      );
      this.tableData = res.data.data;
      this.mainData = res.data.data;
      console.log(this.userList);
    },

    // 20240304 添加信息
    addTrlData() {
      this.$router.push("/HeritageProPush/add");
    },

    // 模糊查询按钮
    searchClick() {
      this.tableData = this.mainData;
      if (this.searchStr) {
        this.tableData = this.mainData.filter((ele) =>
          ele.name.includes(this.searchStr)
        );
      }
    },

    getMain(e) {
      this.jqMain = e;
      this.dialogFormVisible = true;
    },

    async delMain(e) {
      var res = null;
      res = await this.$axios.post(
        "/DaTongMeiTanMarkerRemove/DaTongMeiTanMarkerRemove",
        {
          _id: e._id,
        }
      );
      if (res.status === 200) {
        this.getData();
      }
    },
    editPark(e) {
      console.log(e);
      this.$router.push("/MeasureList");
    },

    async downList() {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Sheet1");

      // 添加表头
      worksheet.columns = [
        { header: "企业名称", key: "name" },
        { header: "采矿许可证", key: "ckid" },
        { header: "档案编号", key: "daid" },
        { header: "隶属企业", key: "company" },
        { header: "生成能力（万吨/年）", key: "num" },
        { header: "开拓方式", key: "type" },
        { header: "坐标经度", key: "jing" },
        { header: "坐标纬度", key: "wei" },
        { header: "井筒数量", key: "jtnum" },
        { header: "采煤工艺", key: "sctype" },
        { header: "瓦斯等级", key: "lev" },
        { header: "自燃倾向性", key: "dangerlev" },
        { header: "开采状态", key: "now" },
      ];

      // 添加数据
      for (let i = 0; i < this.mainData.length; i++) {
        worksheet.addRow(this.mainData[i]);
      }

      // 生成文件
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const now = new Date();
      const year = now.getFullYear(); // 四位年份（如2025）
      const month = now.getMonth() + 1; // 月份（0~11 → 需+1）
      const day = now.getDate(); // 日期（1~31）
      const hours = now.getHours(); // 小时（0~23）
      const minutes = now.getMinutes(); // 分钟（0~59）
      const seconds = now.getSeconds(); // 秒（0~59）
      var time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      saveAs(blob, "大同市煤炭资源信息表" + time + ".xlsx");
    },
  },
};
</script>

<style>
.user-data-manage .mani {
  padding: 15px;
}
</style>
