<template>
  <div class="ligin-user">
    <div class="ligin-user-left">
      <!-- <img
        style="width: 500px; margin-right: 100px; border: 1px solid #ccc"
        src="../assets/data-2311261_1920.png"
        alt=""
      /> -->
    </div>
    <div class="ligin-user-right">
      <h1 class="title">注册账户</h1>
      <h1 class="title">欢迎注册成为我们的新用户</h1>

      <br />
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item label="" prop="username">
          <el-input v-model="ruleForm.username">
            <template slot="prepend"
              ><i class="el-icon-user-solid"></i></template
          ></el-input>
        </el-form-item>

        <el-form-item label="" prop="password">
          <el-input v-model="ruleForm.password" show-password>
            <template slot="prepend"><i class="el-icon-lock"></i></template
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" show-password>
            <template slot="prepend"><i class="el-icon-lock"></i></template
          ></el-input>
        </el-form-item>
      </el-form>
      <br />

      <div class="submit" style="text-align: center">
        <el-button
          @click="submitForm('ruleForm')"
          type="primary"
          style="width: 45%; color: white"
          >注册</el-button
        >
        <el-button
          @click="postuser"
          type="danger"
          style="width: 45%; color: white"
          >返回登录</el-button
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userList: [],
      ruleForm: {
        username: "",
        password: "",
        checkPass: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },

  async created() {
    var res = await this.$axios.get(
      "https://fc-mp-d37f04a3-2423-4d57-8af6-c83080a34e31.next.bspapp.com/mainFun/SCBUserDataGet/SCBUserDataGet"
    );
    this.userList = res.data.data;
    console.log(this.userList);
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          var sameName = this.userList.some(
            (ele) => ele.username === this.ruleForm.username
          );
          if (sameName) {
            this.$message.error("该用户名已被注册，请换一个");
          } else {
            console.log(this.ruleForm);
            var res = await this.$axios.post(
              "https://fc-mp-d37f04a3-2423-4d57-8af6-c83080a34e31.next.bspapp.com/mainFun/SCBUserDataAdd/SCBUserDataAdd",
              {
                username: this.ruleForm.username,
                password: this.ruleForm.password,
              }
            );

            console.log(res);
            if (res.status === 200) {
              this.$message({
                message: "恭喜你，注册成功",
                type: "success",
              });

              this.$router.push("/heritage/login");
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    postuser() {
      this.$router.push("/heritage/login");
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
