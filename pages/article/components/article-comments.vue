<template>
  <div>
    <form class="card comment-form" @submit.prevent="onAddComment">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          required
          v-model="inputComment"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="article.author.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">发表评论</button>
      </div>
    </form>

    <div class="card" v-for="(comment, index) in comments" :key="index">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{
          comment.createdAt | date("MMM DD, YYYY")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComments } from "@/api/article";

export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [], // 文章列表
      inputComment: "",
    };
  },
  mounted() {
    this.getComments();
  },
  methods: {
    async getComments() {
      const { data } = await getComments(this.article.slug);
      this.comments = data.comments;
    },
    async onAddComment() {
      const user = this.$store.state.user;
      if (!user) {
        alert("请先登录");
        this.$router.push("/login");
        return;
      }
      const res = await addComments(this.article.slug, this.inputComment);
      this.comments.unshift(res.data.comment);
    },
  },
};
</script>

<style></style>
