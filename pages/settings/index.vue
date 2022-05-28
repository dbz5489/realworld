<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">编辑用户信息</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="头像 ：URL of profile picture"
                  v-model="user.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="姓名(请使用英文/数字的格式)"
                  required
                  v-model="user.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="个人签名"
                  v-model="user.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="邮箱"
                  required
                  v-model="user.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="密码"
                  required
                  minlength="8"
                  v-model="user.password"
                />
              </fieldset>

              <button class="btn btn-lg btn-primary pull-xs-right">
                点击更新
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { UpdateUser } from "@/api/user";
export default {
  middleware: "authenticated",
  name: "SettingsIndex",
  data() {
    return {
      user: {
        email: "",
        username: "",
        bio: "",
        image: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      UpdateUser(this.user)
        .then((res) => {
          if (res.data.user) {
            // TODO: 保存用户的登录状态
            this.$store.commit("setUser", res.data.user);
            this.$router.push({
              name: "profile",
              params: { username: res.data.user.username },
            });
          }
        })
        .catch((err) => {
          alert(JSON.stringify(err.response.data.errors));
        });
    },
  },
};
</script>

<style></style>
