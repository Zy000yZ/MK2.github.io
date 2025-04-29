<template>
  <div class="ligin-user">
    <div class="ligin-user-left">
     <!-- <img style="width:500px;margin-right:100px;border:1px solid #ccc" src="../assets/data-2311261_1920.png" alt=""> -->
    </div>
    <div class="ligin-user-right">
      <h1 class="title">大同市煤炭资源信息管理系统</h1>
<br>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item label="" prop="username">
          <el-input v-model="ruleForm.username">
            <template slot="prepend"><i class="el-icon-user-solid"></i></template></el-input>
        </el-form-item>

        
        <el-form-item label="" prop="password">
          <el-input v-model="ruleForm.password" show-password>
            <template slot="prepend"><i class="el-icon-lock"></i></template></el-input>
        </el-form-item>
      </el-form>
      <br />

      <div class="submit" style="text-align:center">
        <el-button
          @click="submitForm('ruleForm')"
          type="primary"
          style="width: 45%; color: white; "
          >登入</el-button
        >
         <el-button
          @click="postuser"
          type="danger"
          style="width: 45%; color: white; "
          >注册账户</el-button
        >
      </div>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userList: [],
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  async created() {
    var res = await this.$axios.get(
      "/SCBUserDataGet/SCBUserDataGet"
    );
    this.userList = res.data.data;
    console.log(this.userList);
  },

  methods: {
        submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (
            this.userList.some(
              (ele) =>
                ele.username === this.ruleForm.username &&
                ele.password === this.ruleForm.password
            )
          ) {
            sessionStorage.setItem("username", this.ruleForm.username);
            this.$message({
              message: "系统登陆成功",
              type: "success",
            });
            this.$router.push("/BecauseMain1");
          } else {
            this.$message.error("用户名或密码错误");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    postuser(){
        this.$router.push("/PostUser");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.ligin-user {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../assets/17628650cfe99df7667b3d720920246.png");
  background-size: cover;
}
.ligin-user-right {
  width: 430px;
  padding: 20px 30px;
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.4);
}
.ligin-user-right .span {
  margin: 0;
  color: #9b9b9b;
}
.ligin-user-right .span a {
  color: #2e58ff;
  text-decoration: none;
}
.title {
  color: #fff;
  font-weight: 600;
  text-align: center;
  font-size: 32px;


}
.ligin-user-left {
  /* padding: 50px 0; */
}
.ligin-user-left h1 {
  font-size: 40px;
  margin: 0;
  text-align: center;
}
</style>