<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="文章标题"
                  required
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="文章描述"
                  required
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  required
                  class="form-control"
                  rows="8"
                  placeholder="编写你的文章！ (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  required
                  type="text"
                  class="form-control"
                  placeholder="标签 请使用/分割标签"
                  v-model="article.tagList"
                />
                <div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary">
                点击发送
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addArticle } from "@/api/article.js";
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: "authenticated",
  name: "EditorIndex",
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: "",
      },
    };
  },
  methods: {
    onSubmit() {
      const article = this.article;
      if (article.tagList) {
        article.tagList = article.tagList.split("/");
        article.tagList = [...new Set(article.tagList)];
      }
      addArticle(article)
        .then((res) => {
          this.$router.push({
            name: "article",
            params: {
              slug: res.data.article.slug,
            },
          });
        })
        .catch((err) => {
          alert(JSON.stringify(err.response.data.errors));
        });
    },
  },
};
</script>

<style></style>
