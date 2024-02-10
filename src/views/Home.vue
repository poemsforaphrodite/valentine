<template>
    <div class="portfolio">
      <header>
        <h1>Welcome to My Portfolio</h1>
        <Navbar/>
      </header>
  
      <section id="about" class="section">
        <h2>About Me</h2>
        <p>Write a brief introduction about yourself here.</p>
      </section>
  
      <section id="projects" class="section">
        <h2>My Projects</h2>
        <div class="project">
          <h3>Project Title</h3>
          <p>Description of the project.</p>
          <a href="#">View Project</a>
        </div>
        <!-- Repeat the project div for each project you have -->
      </section>
  
      <section id="contact" class="section">
        <h2>Contact Me</h2>
        <p>Your contact information goes here.</p>
      </section>
  
      <footer>
        <p>&copy; 2022 Your Name. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script setup>
    import Navbar from '../components/Navbar.vue';
  </script>
  
  <style scoped>
  :root {
    --primary-color: #2c3e50; /* Dark Blue */
    --secondary-color: #ecf0f1; /* Light Grey */
    --accent-color: #3498db; /* Blue */
    --text-color: #333; /* Dark Grey */
    --light-text-color: #7f8c8d; /* Light Grey */
  }
  
  .portfolio {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    color: var(--text-color);
    background-color: var(--secondary-color);
  }
  
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--primary-color);
    padding-bottom: 10px;
  }
  
  nav a {
    margin-left: 10px;
    color: var(--text-color);
    text-decoration: none;
  }
  
  nav a:hover {
    color: var(--accent-color);
  }
  
  .section {
    margin-bottom: 40px;
  }
  
  .project {
    border: 1px solid var(--primary-color);
    padding: 10px;
    margin-bottom: 20px;
    background-color: var(--secondary-color);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .project h3 {
    color: var(--accent-color);
  }
  
  .project a {
    color: var(--accent-color);
    text-decoration: none;
  }
  
  .project a:hover {
    text-decoration: underline;
  }
  
  footer {
    text-align: center;
    margin-top: 40px;
    color: var(--light-text-color);
  }
  </style>