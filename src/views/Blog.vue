<template>
    <div class="blog-post" v-for="post in posts" :key="post.title">
      <h1 class="blog-post-title">{{ post.title }}</h1>
      <p class="blog-post-meta">
        Posted by {{ post.author }} on {{ post.date }}
      </p>
      <div class="blog-post-content" v-html="post.content"></div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const posts = ref([
    {
      title: 'My First Blog Post',
      author: 'John Doe',
      date: 'January 1, 2022',
      content: '<p>This is the content of my first blog post.</p>'
    },
    {
      title: 'My Second Blog Post',
      author: 'Jane Smith',
      date: 'February 15, 2022',
      content: '<p>This is the content of my second blog post.</p>'
    }
  ]);
  </script>
  
  <style scoped>
  .blog-post {
    margin-bottom: 2rem;
  }
  
  .blog-post-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .blog-post-meta {
    color: #6c757d;
    margin-bottom: 1rem;
  }
  
  .blog-post-content {
    font-size: 1.2rem;
    line-height: 1.8;
  }
  </style>