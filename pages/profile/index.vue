<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img
              :src="
                profile.image ||
                'https://static.productionready.io/images/smiley-cyrus.jpg'
              "
              class="user-img"
            />

            <h4>{{ profile.username }}</h4>
            <p>
              {{ profile.bio }}
            </p>
            <button
              class="btn btn-sm btn-outline-secondary action-btn"
              v-if="$store.state.user.username !== profile.username"
            >
              <i class="ion-plus-round"></i>
              &nbsp; {{ profile.following ? "取关" : "关注" }}
            </button>
            <section v-else>
              <button class="btn btn-sm btn-outline-secondary action-btn">
                <i class="ion-plus-round"></i>
                &nbsp;
                <nuxt-link to="/settings">编辑用户信息</nuxt-link></button
              >&nbsp; &nbsp;
              <button
                class="btn btn-sm btn-outline-secondary action-btn"
                style="margin-right: 8px"
                @click="loginout"
              >
                &nbsp; 退出登录
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <span class="nav-link active">发布的文章</span>
              </li>
              <li class="nav-item">
                <span class="nav-link">喜欢的文章</span>
              </li>
            </ul>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
              <div class="info">
                <a href="" class="author">Eric Simons</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 29
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>How to build webapps that scale</h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
            </a>
          </div>

          <div class="article-preview">
            <div class="article-meta">
              <a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg" /></a>
              <div class="info">
                <a href="" class="author">Albert Pai</a>
                <span class="date">January 20th</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> 32
              </button>
            </div>
            <a href="" class="preview-link">
              <h1>
                The song you won't ever stop singing. No matter how hard you
                try.
              </h1>
              <p>This is the description for the post.</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li class="tag-default tag-pill tag-outline">Music</li>
                <li class="tag-default tag-pill tag-outline">Song</li>
              </ul>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProfile } from "@/api/user";
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "authenticated",
  name: "UserProfile",
  data() {
    return {
      profile: {},
    };
  },
  async mounted() {
    const res = await getProfile(this.$route.params.username);
    this.profile = res.data.profile;
  },
  methods: {
    loginout() {
      this.$store.commit("setUser", null);
      // 存储到cookie,本地存储不行服务端拿不到
      Cookie.set("user", null);
      this.$router.push("/login");
    },
  },
};
</script>

<style></style>
