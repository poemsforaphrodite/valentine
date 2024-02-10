<template>
    <nav class="navbar">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/star">Star</router-link>
      <router-link to="/game">Game</router-link>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar'
  }
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--primary-color);
    padding-bottom: 10px;
    font-size: 1.2rem;
  }
  
  .navbar a {
    margin-left: 10px;
    color: var(--text-color);
    text-decoration: none;
  }
  
  .navbar a:hover {
    color: var(--accent-color);
  }
  </style>