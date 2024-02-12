<template>
  <nav class="navbar">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/star">Star</router-link>
    <router-link to="/game">Game</router-link>
    <router-link to="/chat">Chat</router-link>
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
}

.navbar a {
  margin-left: 10px;
  color: var(--text-color);
  text-decoration: none;
  font-size: 1.2em; /* Increase the font size */
}

.navbar a:hover {
  color: var(--accent-color);
}

/* Responsive styles */
@media screen and (max-width: 600px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .navbar a {
    margin-bottom: 5px;
  }
}
</style>