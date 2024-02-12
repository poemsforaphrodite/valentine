<template>
    <div class="blog">
      <h1>{{ title }}</h1>
      <p>{{ content }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const title = ref('My Blog Post')
  const content = ref('This is the content of my blog post.')
  </script>
  
  <style scoped>
  .blog {
    padding: 20px;
    background-color: #f5f5f5;
  }
  
  h1 {
    color: #333;
  }
  
  p {
    color: #666;
  }
  </style>  