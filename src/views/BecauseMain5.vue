<template>
  <div class="user-data-manage">
    <div class="mani">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="password" label="密码"> </el-table-column>

        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-button type="text" @click="editMain(scope.row)" size="small"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="delMain(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],

      dialogFormVisible: false,
      form: {
        username: "",
        password: "",
      },
      formLabelWidth: "120px",
    };
  },

  async created() {
    this.getData();
  },

  methods: {
    async getData() {
      var res = await this.$axios.get(
        "https://fc-mp-d37f04a3-2423-4d57-8af6-c83080a34e31.next.bspapp.com/mainFun/SCBUserDataGet/SCBUserDataGet"
      );
      this.tableData = res.data.data;
      console.log(this.userList);
    },

    editMain(e) {
      console.log(e);
      if (e.username === "admin") {
        this.$message.error("管理员信息不可以编辑");
      } else {
        this.dialogFormVisible = true;
        this.form = e;
      }
    },

    async editUser() {
      if (this.form.username !== "" && this.form.password !== "") {
        console.log(this.form);
        this.form.checkPass = this.form.username;

        var res = null;
        res = await this.$axios.post(
          "https://fc-mp-d37f04a3-2423-4d57-8af6-c83080a34e31.next.bspapp.com/mainFun/SCBUserDataEdit/SCBUserDataEdit",
          this.form
        );
        if (res.status === 200) {
          this.getData();
          this.dialogFormVisible = false;
        }
      } else {
        this.$message.error("用户名或密码不可以为空");
      }
    },

    async delMain(e) {
      console.log(e);
      if (e.username === "admin") {
        this.$message.error("管理员信息不可以删除");
      } else {
        var res = null;
        res = await this.$axios.post(
          "https://fc-mp-d37f04a3-2423-4d57-8af6-c83080a34e31.next.bspapp.com/mainFun/SCBUserDataRemove/SCBUserDataRemove",
          {
            _id: e._id,
          }
        );
        if (res.status === 200) {
          this.getData();
        }
      }
    },
  },
};
</script>

<style>
.user-data-manage .mani {
  padding: 15px;
}
</style>