<template>
  <div class="portfolio">
    <header>
      <h1>Welcome to My Portfolio</h1>
      <Navbar />
    </header>

    <section id="about" class="section">
      <h2>About Me</h2>
      <p>
        B.TECH(Computer Engineering) 2021-2025<br>
        Delhi Technological University, New Delhi<br>
      </p>
    </section>

    <section id="internships" class="section">
      <h2>Internships and Work Experience</h2>
      <div class="internship">
        <h3>Full Stack Web Developer Intern</h3>
        <p>June 2023 - August 2023</p>
        <p>
          Developed an innovative and responsive fitness and wellness web application using the MERN stack, integrating
          Zoom and OpenAI APIs while ensuring HIPAA compliance.
        </p>
        <p>
          Seamlessly integrated the OpenAI API to generate personalized workout plans for users based on their fitness
          goals, preferences, and available equipment, improving user engagement and satisfaction.
        </p>
        <p>
          Implemented a reliable, secure platform for HD video consultations using the Zoom API, ensuring user privacy and
          HIPAA compliance.
        </p>
      </div>
    </section>

    <section id="projects" class="section">
      <h2>My Projects</h2>
      <div class="project">
        <h3>Multiple Deep Reinforcement Learning Projects</h3>
        <p>
          Developed and implemented the Twin Delayed Deep Deterministic Policy Gradient (TD3) algorithm, an actor-critic
          method for reinforcement learning, to solve complex control tasks in Python.
        </p>
        <p>
          Utilized PyTorch for developing the actor and critic neural networks, ensuring optimal function approximation.
        </p>
        <p>
          Leveraged CUDA for GPU-accelerated training, achieving faster model training times.
        </p>
        <p>
          Managed the training process, including batch sampling from the replay buffer and updating parameters of the
          networks.
        </p>
        <a href="#">View Project</a>
      </div>
    </section>

    <section id="contact" class="section">
      <h2>Contact Me</h2>
      <p>
        <a href="mailto:pushpendersolanki895@gmail.com">Email: pushpendersolanki895@gmail.com</a><br>
        <a href="https://www.linkedin.com/in/pushpender-solanki/" target="_blank"
          rel="noopener noreferrer">LinkedIn</a><br>
        <a href="https://github.com/poemsforaphrodite" target="_blank" rel="noopener noreferrer">GitHub</a><br>
        <a href="https://www.instagram.com/poemsforaphrodite/" target="_blank" rel="noopener noreferrer">Instagram</a>
      </p>
    </section>

    <footer>
      <p>&copy; 2022 Pushpender Solanki. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
</script>

<style scoped>
/* Your existing styles */
</style>
  
<style scoped>
:root {
  --primary-color: #2c3e50;
  /* Dark Blue */
  --secondary-color: #ecf0f1;
  /* Light Grey */
  --accent-color: #3498db;
  /* Blue */
  --text-color: #333;
  /* Dark Grey */
  --light-text-color: #7f8c8d;
  /* Light Grey */
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
}</style>