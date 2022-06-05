<template>
  <div :xl="6" :lg="7" class="bg-login">
    <!--logo-->
    <el-image  class="logo"/>
    <!--标题-->
    <el-row type="flex" class="row-bg row-two" justify="center" align="middle">
      <el-col :span="6"></el-col>
      <el-col :span="6">
        <!--标题-->
        <h1 class="title">洛宁县电子商务公共服务平台大数据中心</h1>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
    <!--form表单-->
    <el-row type="flex" class="row-bg card" justify="center" align="bottom">
      <el-col :span="7" class="login-card">
        <!--loginForm-->
        <el-form :model="loginForm" :rules="loginForm" 
				ref="loginForm"
				 label-width="21%" class="loginForm">
          <el-form-item label="账户" prop="uname"  style="width: 380px">
            <el-input v-model="loginForm.uname" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码" style="width: 380px">
            <el-input type="password" 
						placeholder="请输入密码"
						v-model="loginForm.password"></el-input>
          </el-form-item>
          <!-- <el-form-item label="验证码" prop="code" style="width: 380px">
            <el-input class="code-input" style="width: 70%;float: left"></el-input>
          </el-form-item> --> 
          <!-- <el-form-item label="记住密码" prop="remember">
            <el-switch></el-switch>
          </el-form-item> -->
          <el-form-item class="btn-ground">
            <el-button type="primary" @click="dosubmit()">立即登陆</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import axios from 'axios'
export default {
	name: 'Login',

	data() {
		return {
			loginForm:{
				uname:'',
				password:''
			},
			rules:{
  username: [
          {required: true, message: '请输入账户', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符的账户', trigger: 'blur'}
        ],
        // 设置密码效验规则
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 6 到 15 个字符的密码', trigger: 'blur'}
        ],

			}
		};
	},

	mounted() {
		this.gologin()
	},

	methods: {
gologin(){
   this.$apiFun
        .screenfree()
        .then((item) => {
          console.log(item);
 
        })
        .catch((err) => {
          // console.log(222);
        });
},
 dosubmit: function() {
        let params = {
          uname: this.uname,
          password: this.password
        };
        var url = "http://testserver.hkkj.net/portal/apiLogin/loginApi";
        axios.get(url, { //注意数据是保存到json对象的params属性
				
          params: params
        }).then(function(response) {
           console.log(response);
         }).catch(function(error) {
          console.log(error);
        });
				console.log(item);
        var str=qs.stringify(params);
        axios.post(url,str//注意数据是直接保存到json对象
        ).then(function(response) {
          console.log(response);
        }).catch(function(error) {
          console.log(error);
        });

},

		  resetForm(formName) {
      this.$refs[formName].resetFields();
    }}
	}

</script>

<style lang="scss" scoped>
// .codeImg {
//   /*让验证码图片飘在右边*/
//   float: right;
//   /*设置一些圆角边框*/
//   border-radius: 3px;
//   /*设置宽度*/
//   width: 26%;
// }

.bg-login {
  height: 100%;
  // background-image: url("");
  background-size: 200%;

}

.btn-ground {
  text-align: center;
}

// .logo {
//   margin: 30px;
//   height: 70px;
//   width: 70px;
//   position: fixed;
// }

.title {
  // text-shadow: -3px 3px 1px #5f565e;
  // text-align: left;
  margin-top: 60%;
  color: #41b9a6;
  font-size: 30px;
	width: 900px;
	margin-left: 20px;
	margin-bottom: 30px;
}

.login-card {
  background-color: #ffffff;
  opacity: 0.9;
  box-shadow: 0 0 20px #ffffff;
  border-radius: 10px;
  padding: 40px 40px 30px 15px;
  width: auto;
}

</style>