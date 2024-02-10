<template>
    <div class="blog-post" v-for="post in posts" :key="post.title">
        
        <!-- <h1 class="blog-post-title">{{ post.title }}</h1>
        <h1 class="blog-post-title">{{ post.title }}</h1>
        <p class="blog-post-meta">
            Posted by {{ post.author }} on {{ post.date }}
        </p>
        <div class="blog-post-content" v-html="post.content"></div>
    -->
    </div>
    <canvas ref="backgroundCanvas" class="background-canvas"></canvas>
</template>
  
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

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

const backgroundCanvas = ref(null);
let animationFrameId;
let renderer;

onMounted(() => {
    // Set up Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: backgroundCanvas.value, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // Set initial size

    // Create a particle system for the star field
    const particleCount = 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const particlesPositions = [];

    for (let i = 0; i < particleCount; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);
        particlesPositions.push(x, y, z);
    }

    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlesPositions, 3));
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 5;

    function animate() {
        animationFrameId = requestAnimationFrame(animate);

        // Rotate the stars slowly
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;

        renderer.render(scene, camera);
    }

    animate();

    // Resize the canvas and camera aspect ratio when the window is resized
    window.addEventListener('resize', onWindowResize);
});

onMounted(() => {
    // Set up Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ canvas: backgroundCanvas.value, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // Set initial size

    // Create a particle system for the star field
    const particleCount = 10000;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPositions = [];
    const particleColors = [];

    // Custom shader material for the stars
    const vertexShader = `
    attribute float size;
    attribute vec3 color;
    varying vec3 vColor;
    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

    const fragmentShader = `
    varying vec3 vColor;
    void main() {
      gl_FragColor = vec4(vColor, 1.0);
    }
  `;

    const particlesMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false
    });

    const sizes = new Float32Array(particleCount);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);
        particlesPositions.push(x, y, z);

        // Randomize the size of each star
        sizes[i] = THREE.MathUtils.randFloat(1, 10);

        // Randomize the color of each star
        colors[i * 3] = THREE.MathUtils.randFloat(0, 1);
        colors[i * 3 + 1] = THREE.MathUtils.randFloat(0, 1);
        colors[i * 3 + 2] = THREE.MathUtils.randFloat(0, 1);
    }

    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlesPositions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 5;

    function animate() {
        animationFrameId = requestAnimationFrame(animate);

        // Rotate the stars slowly
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0005;

        // Animate the size and color of the stars to create a twinkling effect
        for (let i = 0; i < particleCount; i++) {
            sizes[i] = THREE.MathUtils.randFloat(0.1, 1);
            colors[i * 3] = THREE.MathUtils.randFloat(0, 1);
            colors[i * 3 + 1] = THREE.MathUtils.randFloat(0, 1);
            colors[i * 3 + 2] = THREE.MathUtils.randFloat(0, 1);
        }

        particlesGeometry.attributes.size.needsUpdate = true;
        particlesGeometry.attributes.color.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();

    // Resize the canvas and camera aspect ratio when the window is resized
    window.addEventListener('resize', onWindowResize);
});

function onWindowResize() {
    if (renderer) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}
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

.background-canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    /* Ensure the canvas is behind the blog posts */
}
</style>